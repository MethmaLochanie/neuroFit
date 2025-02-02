const {
  addToCartService,
  getCartByUserIdService,
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

//get cart items by userId
exports.getCartByUserId = async (req, res) => {
  try {
    const cartItems = await getCartByUserIdService(req.params.userId);
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
    const removeCartItem = await removeFromCart(req.body);
    if (removeCartItem) {
      res
        .status(201)
        .json({ message: "removeCartItem registered successfully" });
    } else {
      res.status(400).json({ message: "removeCartItem registration failed" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//remove an item from the cart by using userId
exports.removeFromCart = async (req, res) => {
  try {
    const removeCartItem = await removeFromCartService(
      req.params.userId,
      req.body.itemId
    );
    if (removeCartItem) {
      res.status(200).json({ message: "Item removed from cart successfully" });
    } else {
      res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

//update cart items by id
exports.updateCartItemsById = async (req, res) => {
  try {
    const updatedItem = await updateCartItemsByIdService(
      req.params.userId,
      req.body
    );
    if (updatedItem) {
      res.status(200).json(updatedItem);
    } else {
      res.status(404).json({ message: "Item Not Found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
