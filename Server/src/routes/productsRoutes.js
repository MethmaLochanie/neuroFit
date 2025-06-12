const express = require("express");
const router = express.Router();

const {
  getRecommendedProducts,
  getProductsByArticleIds,
  getProductByArticleId,
  getImagesByProductCode,
  getSignedAzureUrl,
  toggleWishlist,
  getWishlist,
} = require("../controllers/productsController");

router.get("/recommendations/:userId", getRecommendedProducts);
router.post("/getProductsByIds", getProductsByArticleIds);
router.get("/getProduct/:articleId", getProductByArticleId);
router.get("/images/:product_code", getImagesByProductCode);
router.get("/signed-url", getSignedAzureUrl);
router.post("/wishlist", toggleWishlist);
router.get("/wishlist/:userId", getWishlist);

module.exports = router;

//post, put, delete
