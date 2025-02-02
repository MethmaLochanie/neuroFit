const express = require("express");
const router = express.Router();
const {
  order,
  getOrdersByUserId,
  deleteOrder,
} = require("../controllers/orderController");

//public routes
router.post("/placedOrder", order);
router.get("/getOrders/:userId", getOrdersByUserId);
router.delete("/deleteOrder/:orderId", deleteOrder);

module.exports = router;
