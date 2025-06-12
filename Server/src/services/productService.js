const axios = require("axios");
const Product = require("../models/Product");

const AZURE_BLOB_STORAGE_URL = process.env.AZURE_BLOB_STORAGE_URL;
if (!AZURE_BLOB_STORAGE_URL) {
  throw new Error('AZURE_BLOB_STORAGE_URL environment variable is not defined');
}

exports.getProductsByArticleIdsService = async (articleIds) => {
  try {
    const stringIds = articleIds.map((id) => String(id));
    const products = await Product.find({
      article_id: { $in: stringIds },
    });
    return products;
  } catch (error) {
    throw new Error("Error fetching products: " + error.message);
  }
};

exports.getRecommendationsWithDetails = async (userId) => {
  try {
    const flaskRes = await axios.post("http://localhost:5000/recommend", {
      user_id: userId,
    });

    const productIds = flaskRes.data.recommended_products;

    const productDetails = await Promise.all(
      productIds.map((id) => Product.findOne({ article_mapped_id: id }))
    );

    return productDetails.filter(Boolean);
  } catch (error) {
    throw new Error("Failed to fetch recommended products: " + error.message);
  }
};

exports.getProductByArticleIdService = async (articleId) => {
  try {
    const product = await Product.findOne({ article_id: articleId });
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  } catch (error) {
    throw new Error("Error fetching product: " + error.message);
  }
};

exports.getImagesByProductCodeService = async (product_code) => {
  try {
    const products = await Product.find({ product_code }).lean();
    const cleanedProducts = products.map(
      ({ prodColors, prodSizes, media, ...productDetails }) => productDetails
    );
    return cleanedProducts;
  } catch (error) {
    throw new Error("Failed to fetch product images: " + error.message);
  }
};

exports.getSignedAzureUrlService = async (imageUrl) => {
  try {
    const sasToken = process.env.AZURE_SAS_TOKEN;
    if (!sasToken) {
      throw new Error("Azure SAS token not configured");
    }

    if (!imageUrl.startsWith(AZURE_BLOB_STORAGE_URL)) {
      throw new Error("Invalid Azure blob URL");
    }

    return `${imageUrl}${sasToken}`;
  } catch (error) {
    throw new Error("Error generating signed URL: " + error.message);
  }
};
