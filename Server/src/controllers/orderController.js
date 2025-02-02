const {
  orderService,
  getOrdersByUserIdService,
  deleteOrderByOrderIdService,
} = require("../services/ordersService");

exports.order = async (req, res) => {
  try {
    const addOrder = await orderService(req.body);
    if (addOrder) {
      res.status(201).json({ message: "order registered successfully" });
    } else {
      res.status(400).json({ message: "order registration failed" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getOrdersByUserId = async (req, res) => {
  try {
    const orders = await getOrdersByUserIdService(req.params.userId);
    if (orders) {
      res.status(200).json(orders);
    } else {
      res.status(404).json({ message: "Orders Not Found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

//remove an item from the cart by using userId
exports.deleteOrder = async (req, res) => {
  try {
    const deleteOrder = await deleteOrderByOrderIdService(
      req.params.userId,
      req.body.itemId
    );
    if (deleteOrder) {
      res.status(200).json({ message: "Item removed from cart successfully" });
    } else {
      res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
