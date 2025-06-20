const Order = require("../models/Order");

exports.orderService = async ({
  userId,
  orderId,
  fName,
  lName,
  email,
  country,
  city,
  postalCode,
  phoneNumber,
  articles,
  subtotal,
  paymentMethod,
  orderStatus,
  date,
}) => {
  try {
    const newOrder = new Order({
      userId,
      orderId,
      fName,
      lName,
      email,
      country,
      city,
      postalCode,
      phoneNumber,
      articles,
      subtotal,
      paymentMethod,
      orderStatus,
      date,
    });

    const saveOrder = await newOrder.save();

    return saveOrder;
  } catch (error) {
    return { message: error.message };
  }
};

exports.getOrdersByUserIdService = async (user_mapped_id) => {
  try {
    const orders = await Order.find({ user_mapped_id });
    if (!orders) {
      throw Error("Orders not found");
    }
    return orders;
  } catch (error) {
    return { message: error.message };
  }
};

exports.deleteOrderByOrderIdService = async ({ orderId }) => {
  try {
    const removeOrder = await Cart.findOneAndDelete({
      orderId,
    });

    return removeOrder;
  } catch (error) {
    return { message: error.message };
  }
};
