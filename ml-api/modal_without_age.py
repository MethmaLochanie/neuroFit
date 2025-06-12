from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_cors import cross_origin
import torch
import torch.nn as nn
import torch.nn.functional as F
import pickle
import numpy as np

# For product feature processing
from torchvision import models, transforms
from transformers import DistilBertTokenizer, DistilBertModel
from PIL import Image
from torch_geometric.data import HeteroData
from torch_geometric.nn import HGTConv

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])
device = torch.device("cpu")  # Running on CPU locally

# --------------------------
# Configuration parameters
# --------------------------
class Config:
    config_dict = torch.load("./models/complete_multimodal_recommender/final_model.pth", map_location=device)['config']
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
# def compute_all_product_embeddings(model, prod_metadata):
#     """
#     prod_metadata: dict mapping product_id (str or int) to a dict with keys:
#        'img_feat', 'txt_feat', and 'price'
#     The features (img_feat and txt_feat) are expected to be stored as lists or arrays.
#     """
#     prod_ids = list(prod_metadata.keys())
#     embeddings = []
#     model.eval()
#     with torch.no_grad():
#         for pid in prod_ids:
#             feat = prod_metadata[pid]
#             img_feat = torch.tensor(feat['img_feat'], dtype=torch.float32, device=device)  # shape: [1000]
#             txt_feat = torch.tensor(feat['txt_feat'], dtype=torch.float32, device=device)  # shape: [768]
#             price = torch.tensor([feat['price']], dtype=torch.float32, device=device)      # shape: [1]
#             emb = model.forward_product(img_feat, txt_feat, price)
#             embeddings.append(emb.detach().cpu().numpy())
#     embeddings = np.vstack(embeddings)  # shape: [num_products, emb_dim]
#     return prod_ids, embeddings

def compute_all_product_embeddings(model, prod_metadata):
    prod_ids = list(prod_metadata.keys())
    embeddings = []
    model.eval()
    with torch.no_grad():
        for pid in prod_ids:
            feat = prod_metadata[pid]
            img_feat = torch.tensor(feat['img_feat'], dtype=torch.float32, device=device)  # [1000]
            txt_feat = torch.tensor(feat['txt_feat'], dtype=torch.float32, device=device)  # [768]
            price = torch.tensor([feat['price']], dtype=torch.float32, device=device)      # [1]

            # ✅ Apply all feature encoders
            img_emb = model.img_fc(img_feat)  # [256]
            txt_emb = model.txt_fc(txt_feat)  # [256]
            price_emb = model.price_encoder(price.unsqueeze(0)).squeeze(0)  # [256]

            emb = img_emb + txt_emb + price_emb  # Final embedding: [256]
            embeddings.append(emb.cpu().numpy())

    embeddings = np.vstack(embeddings)  # [N_products, 256]
    return prod_ids, embeddings

# --------------------------
# Load the Trained Model and Product Feature Dictionary
# --------------------------
checkpoint = torch.load("./models/complete_multimodal_recommender/final_model.pth", map_location=device)
# Set NUM_USERS to the number used during training (e.g., 88647 sampled users)
NUM_USERS = 88647
NUM_PRODUCTS = 80654
model = MultiModalGNN(checkpoint['metadata'], NUM_USERS, NUM_PRODUCTS)
model.load_state_dict(checkpoint['state_dict'])
model.eval()

# Load the precomputed product feature dictionary from a pickle file.
with open("./models/product_metadata/prod_feature_dict/prod_feature_dict.pkl", "rb") as f:
    prod_metadata = pickle.load(f)

# Option 1: Precompute product embeddings now (if not already saved).
prod_ids, prod_embeddings = compute_all_product_embeddings(model, prod_metadata)
prod_embeddings_tensor = torch.tensor(prod_embeddings, dtype=torch.float32, device=device)

# --------------------------
# Flask API Endpoint for Recommendations (without age)
# --------------------------
@app.route("/recommend", methods=["POST"])
@cross_origin(origins="http://localhost:3000")
def recommend():
    try:
        data = request.get_json()
        # user_id = int(request.args.get("user_id"))
        if not data or 'user_id' not in data:
            return jsonify({"error": "Missing user_id in request body"}), 400

        user_id = int(data['user_id'])
        with torch.no_grad():
            user_tensor = torch.tensor([user_id], dtype=torch.long, device=device)
            user_emb = model.user_emb(user_tensor)  # shape: [1, emb_dim]
            scores = torch.matmul(user_emb, prod_embeddings_tensor.T).squeeze(0)  # shape: [N_products]

            topk = torch.topk(scores, k=10)
            rec_indices = topk.indices.cpu().numpy().tolist()
            rec_scores = topk.values.cpu().numpy().tolist()
            recommended_product_ids = [prod_ids[i] for i in rec_indices]

            return jsonify({
                "user_id": user_id,
                "recommended_products": recommended_product_ids,
                "scores": rec_scores
            })

    except Exception as e:
        return jsonify({"error": str(e)})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
