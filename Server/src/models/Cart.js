const {
  SHIPPING_PAYMENT_TYPE,
} = require("../constants/shippingPaymentTypes.js");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  articleId: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  subtotal: {
    type: Number,
    required: true,
  },
  shipping: {
    type: String,
    enum: SHIPPING_PAYMENT_TYPE,
    default: SHIPPING_PAYMENT_TYPE.FREE,
  },
});

module.exports = mongoose.model("Cart", CartSchema);
