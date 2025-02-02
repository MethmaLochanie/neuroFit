const Product = require("../models/Product");
const crypto = require("crypto");

// get product by articleId
exports.getProductByArticleIdService = async (articleId) => {
  try {
    const product = await Product.findOne({ articleId });
    if (!product) {
      throw Error("product not found");
    }
    return product;
  } catch (error) {
    return { message: error.message };
  }
};
