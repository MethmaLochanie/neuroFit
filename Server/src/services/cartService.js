const Cart = require("../models/Cart");

exports.addToCartService = async ({
  userId,
  articleId,
  quantity,
  subtotal,
  shipping,
}) => {
  try {
    const newAddToCartItem = new Cart({
      userId,
      articleId,
      quantity,
      subtotal,
      shipping,
    });

    const saveAddToCartItem = await newAddToCartItem.save();

    return saveAddToCartItem;
  } catch (error) {
    return { message: error.message };
  }
};

//get cart items by userId
exports.getCartItemsByUserIdService = async (userId) => {
  try {
    const cartItems = await Cart.find({ userId });
    if (!cartItems) {
      throw Error("Cart items not found");
    }
    return cartItems;
  } catch (error) {
    return { message: error.message };
  }
};

//item remove from cart
exports.removeFromCartService = async ({ userId, articleId }) => {
  try {
    const removeCartItem = await Cart.findOneAndDelete({
      userId,
      articleId,
    });

    return removeCartItem;
  } catch (error) {
    return { message: error.message };
  }
};

//update cart items
exports.updateCartItemsByIdService = async (id, update) => {
  try {
    const item = await Cart.findOneAndUpdate({ id }, update, { new: true });
    if (!item) {
      throw Error("Item not found");
    }
    return user;
  } catch (error) {
    return { message: error.message };
  }
};
