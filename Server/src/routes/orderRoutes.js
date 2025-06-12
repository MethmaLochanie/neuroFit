const express = require("express");
const router = express.Router();
const {
  order,
  getOrdersByUserId,
  deleteOrder,
} = require("../controllers/orderController");

router.post("/placedOrder", order);
router.get("/getOrders/:user_mapped_id", getOrdersByUserId);
router.delete("/deleteOrder/:orderId", deleteOrder);

module.exports = router;
