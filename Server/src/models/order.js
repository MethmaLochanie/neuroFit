const {
    PAYMENT_METHODS,
} = require("../constants/paymentMethods.js");
const {
    ORDER_STATUS,
} = require("../constants/orderStatus.js");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addToCartSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  orderId: {
    type: String,
    required: true,
    unique: true,
  },
  fName: {
    type: String,
    required: true,
  },
  lName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  postalCode: {
    type: Number,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  articles: [
    {
      articleId: {
        type: String,
        ref: "Article",
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
    required: true
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
});

module.exports = mongoose.model("addToCart", addToCartSchema);
