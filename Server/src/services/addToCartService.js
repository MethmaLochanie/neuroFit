const addToCart = require("../models/addToCart");

exports.addToCart = async ({
  userId,
  articleId,
  quantity,
  subtotal,
  shipping,
}) => {
  try {
    const newAddToCartItem = new addToCart({
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
