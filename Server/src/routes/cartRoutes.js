const express = require("express");
const router = express.Router();
const {
  addToCart,
  getCartByUserId,
  removeFromCart,
  updateCartItemsById,
} = require("../controllers/cartController");

//public routes
router.post("/addToCart", addToCart);
router.delete("/removeFromCart/:userId", removeFromCart);
router.get("/items/:userId", getCartByUserId);
router.put("/update/: id", updateCartItemsById);

module.exports = router;
