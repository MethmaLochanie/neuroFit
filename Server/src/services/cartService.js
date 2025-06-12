const Cart = require("../models/Cart");

exports.addToCartService = async ({
  customer_mapped_id,
  article_id,
  quantity,
  subtotal,
  shipping,
  size,
}) => {
  try {
    const newAddToCartItem = new Cart({
      customer_mapped_id,
      article_id,
      quantity,
      subtotal,
      shipping,
      size,
    });

    const saveAddToCartItem = await newAddToCartItem.save();

    return saveAddToCartItem;
  } catch (error) {
    return { message: error.message };
  }
};

exports.getCartItemsByUserIdService = async (customer_mapped_id) => {
  try {
    const cartItems = await Cart.find({ customer_mapped_id });
    if (!cartItems) {
      throw Error("Cart items not found");
    }
    return cartItems;
  } catch (error) {
    return { message: error.message };
  }
};

exports.removeFromCartService = async (_id) => {
  try {
    const result = await Cart.findByIdAndDelete(_id);
    return result;
  } catch (error) {
    console.error("Delete service error:", error);
    throw error;
  }
};
exports.updateCartItemsByIdService = async (id, update) => {
  try {
    const item = await Cart.findOneAndUpdate(
      { _id: id },
      { $set: update },
      { new: true }
    );

    if (!item) {
      throw Error("Item not found");
    }
    return item;
  } catch (error) {
    throw error;
  }
};
