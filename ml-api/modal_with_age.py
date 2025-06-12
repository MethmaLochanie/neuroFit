from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_cors import cross_origin
import torch
import torch.nn as nn
import torch.nn.functional as F
import pickle
import numpy as np

# For product feature processing
from torch_geometric.nn import HGTConv

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])
device = torch.device("cpu")

# --------------------------
# Configuration parameters
# --------------------------
class Config:
    config_dict = torch.load("./models/complete_multimodal_recommender/cold_start_modal/final_model_retrained.pth", map_location=device)['config']
    emb_dim = config_dict.get('emb_dim', 256)
    num_heads = config_dict.get('num_heads', 4)
    dropout = config_dict.get('dropout', 0.5)
    lr = config_dict.get('lr', 5e-5)

config = Config()

# --------------------------
# Model Definition
# --------------------------
class MultiModalGNN(nn.Module):
    def __init__(self, metadata, num_users, num_products):
        super(MultiModalGNN, self).__init__()
        self.user_emb = nn.Embedding(num_users, config.emb_dim)
        self.age_encoder = nn.Linear(1, config.emb_dim)
        self.img_fc = nn.Linear(1000, config.emb_dim)
        self.txt_fc = nn.Linear(768, config.emb_dim)
        self.price_encoder = nn.Sequential(
            nn.Linear(1, 64),
            nn.ReLU(),
            nn.Linear(64, config.emb_dim)
        )
        self.conv1 = HGTConv(config.emb_dim, config.emb_dim, metadata, heads=config.num_heads)
        self.conv2 = HGTConv(config.emb_dim, config.emb_dim, metadata, heads=config.num_heads)
        self.dropout = nn.Dropout(config.dropout)

    def forward(self, x_dict, edge_index_dict=None):
        x_dict['user'] = self.user_emb(x_dict['user'].to(device))
        x_dict = self.conv1(x_dict, edge_index_dict or {})
        x_dict = {k: F.gelu(v) for k, v in x_dict.items()}
        x_dict = {k: self.dropout(v) for k, v in x_dict.items()}
        x_dict = self.conv2(x_dict, edge_index_dict or {})
        return x_dict

    def forward_product(self, img_feat, txt_feat, price):
        img_emb = self.img_fc(img_feat)
        txt_emb = self.txt_fc(txt_feat)
        price_emb = self.price_encoder(price.unsqueeze(0).unsqueeze(0)).squeeze(0)
        return img_emb + txt_emb + price_emb

# --------------------------
# Helper: Compute All Product Embeddings
# --------------------------
def compute_all_product_embeddings(model, prod_metadata):
    prod_ids = list(prod_metadata.keys())
    embeddings = []
    model.eval()
    with torch.no_grad():
        for pid in prod_ids:
            feat = prod_metadata[pid]
            img_feat = torch.tensor(feat['img_feat'], dtype=torch.float32, device=device)
            txt_feat = torch.tensor(feat['txt_feat'], dtype=torch.float32, device=device)
            price = torch.tensor([feat['price']], dtype=torch.float32, device=device)

            img_emb = model.img_fc(img_feat)
            txt_emb = model.txt_fc(txt_feat)
            price_emb = model.price_encoder(price.unsqueeze(0)).squeeze(0)
            emb = img_emb + txt_emb + price_emb
            embeddings.append(emb.cpu().numpy())

    embeddings = np.vstack(embeddings)
    article_ids = [v['article_id'] for v in prod_metadata.values()]
    return article_ids, embeddings

with open("./models/age_to_avg_user_embedding/age_to_avg_user_embedding.pkl", "rb") as f:
    age_to_avg_emb = pickle.load(f)
    
with open("./models/age_to_popular/age_to_popular.pkl", "rb") as f:
    age_to_popular = pickle.load(f)
    
with open("./models/product_feature_dict/prod_feature_dict.pkl", "rb") as f:
    prod_metadata = pickle.load(f)

# --------------------------
# Load the Trained Model and Product Feature Dictionary
# --------------------------
checkpoint = torch.load("./models/complete_multimodal_recommender/cold_start_modal/final_model_retrained.pth", map_location=device)
NUM_USERS = 88647
NUM_PRODUCTS = 80654
model = MultiModalGNN(checkpoint['metadata'], NUM_USERS, NUM_PRODUCTS)
model.load_state_dict(checkpoint['state_dict'])
model.eval()

# Precompute product embeddings.
prod_ids, prod_embeddings = compute_all_product_embeddings(model, prod_metadata)
prod_embeddings_tensor = torch.tensor(prod_embeddings, dtype=torch.float32, device=device)

# build a fast lookup from article_id → index
id_to_idx = { pid:i for i, pid in enumerate(prod_ids) }

# convert your torch embeddings into a numpy matrix [n_products × emb_dim]
prod_embeddings_np = prod_embeddings_tensor.cpu().numpy()
POP_LIMIT = 500 
age_to_pop_scores = {}
for age, pop_list in age_to_popular.items():
    arr = np.zeros(len(prod_ids), dtype=np.float32)
    for rank, aid in enumerate(pop_list[:POP_LIMIT]):
        idx = id_to_idx.get(aid)
        if idx is not None:
            arr[idx] = POP_LIMIT - rank
    if arr.max() > 0:
        arr /= arr.max()
    age_to_pop_scores[age] = arr


# --------------------------
# Flask API Endpoint for Recommendations (Handles Both Scenarios)
# --------------------------
@app.route("/recommend", methods=["POST"])
@cross_origin(origins="http://localhost:3000")
def recommend():
    try:
        data = request.get_json(force=True)
        if not data:
            return jsonify({"error": "Missing JSON payload."}), 400
        k = int(data.get("k", 10))
        if "user_id" in data:
            user_id = int(data["user_id"])
            with torch.no_grad():
                user_tensor = torch.tensor([user_id], dtype=torch.long, device=device)
                user_emb = model.user_emb(user_tensor)
                scores = torch.matmul(user_emb, prod_embeddings_tensor.T).squeeze(0)
                topk = torch.topk(scores, k=k)
                rec_indices = topk.indices.cpu().numpy().tolist()
                rec_scores = topk.values.cpu().numpy().tolist()
                recommended_product_ids = [prod_ids[i] for i in rec_indices]

            return jsonify({
                "scenario": "existing_customer",
                "user_id": user_id,
                "recommended_products": recommended_product_ids,
                "scores": rec_scores
            })
        elif "age" in data:
            age = int(float(data["age"]))
            k   = int(data.get("k", 10))

            # 1) get avg embedding (numpy) for this age
            avg_emb = age_to_avg_emb.get(age)
            if avg_emb is None:
                return jsonify({"scenario":"cold_start","age":age,"recommended_products":[]}), 200

            # 2) compute embedding scores via a single matrix‐vector multiply
            emb_scores = prod_embeddings_np.dot(avg_emb)      
            emb_scores = (emb_scores - emb_scores.min()) / (np.ptp(emb_scores) + 1e-8)

            # 3) fetch the precomputed pop_scores (already normalized)
            pop_scores = age_to_pop_scores.get(age, np.zeros_like(emb_scores))

            # 4) blend signals (as before)
            alpha        = 0.2
            final_scores = alpha * pop_scores + (1 - alpha) * emb_scores
                # Add a smidge of noise so ties and near-ties break differently
            noise = np.random.normal(loc=0.0, scale=1e-3, size=final_scores.shape)
            final_scores = final_scores + noise

            # 5) Sample k items from a softmax over final_scores
            temperature = 0.5 
            logits      = final_scores / temperature
            exp_scores  = np.exp(logits - np.max(logits))
            probs       = exp_scores / exp_scores.sum()

            rec_idxs = np.random.choice(len(prod_ids), size=k, replace=False, p=probs.tolist())
            recs     = [prod_ids[i] for i in rec_idxs]

            return jsonify({
                "scenario": "cold_start",
                "age": age,
                "recommended_products": recs
            })

        else:
            return jsonify({"error": "Please provide either user_id or age."}), 400

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
