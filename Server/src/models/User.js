const { ROLES } = require("../constants/roles.js");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  customer_id: {
    type: String,
  },
  customer_mapped_id: {
    type: Number,
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
    unique: true,
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
  age: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ROLES,
    default: ROLES.CUSTOMER,
  },
  isNewUser: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model("User", userSchema);
