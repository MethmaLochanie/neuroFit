const {
  addToCartService,
  getCartItemsByUserIdService,
  removeFromCartService,
  updateCartItemsByIdService,
} = require("../services/cartService");

exports.addToCart = async (req, res) => {
  try {
    const addToCartItem = await addToCartService(req.body);
    if (addToCartItem) {
      res.status(201).json({ message: "addToCart registered successfully" });
    } else {
      res.status(400).json({ message: "addToCart registration failed" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getCartByUserId = async (req, res) => {
  try {
    const cartItems = await getCartItemsByUserIdService(
      req.params.customer_mapped_id
    );
    if (cartItems) {
      res.status(200).json(cartItems);
    } else {
      res.status(404).json({ message: "Cart Items Not Found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const removedItem = await removeFromCartService(req.params._id);

    if (!removedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({
      message: "Item removed successfully",
      removedItem,
    });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({
      message: error.message || "Failed to remove item",
    });
  }
};

exports.updateCartItemsById = async (req, res) => {
  try {
    const updatedItem = await updateCartItemsByIdService(
      req.params.id,
      req.body
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({
      message: error.message || "Failed to update cart item",
    });
  }
};
