const { PAYMENT_METHODS } = require("../constants/paymentMethods.js");
const { ORDER_STATUS } = require("../constants/orderStatus.js");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  user_mapped_id: {
    type: Number,
    required: true,
  },
  orders: [
    {
      article_mapped_id: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  subtotal: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: PAYMENT_METHODS,
    required: true,
  },
  orderStatus: {
    type: String,
    enum: ORDER_STATUS,
    default: ORDER_STATUS.PENDING,
  },
  date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Order", orderSchema);
