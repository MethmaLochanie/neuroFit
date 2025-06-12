const express = require("express");
const router = express.Router();
const {
  addToCart,
  getCartByUserId,
  removeFromCart,
  updateCartItemsById,
} = require("../controllers/cartController");

router.post("/addToCart", addToCart);
router.delete("/remove/:_id", removeFromCart);
router.get("/items/:customer_mapped_id", getCartByUserId);
router.put("/update/:id", updateCartItemsById);

module.exports = router;
