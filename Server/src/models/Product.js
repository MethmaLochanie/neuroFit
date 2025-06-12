const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  article_mapped_id: {
    type: String,
    required: true,
  },
  article_id: {
    type: String,
    required: true,
  },
  product_code: {
    type: Number,
    required: true,
  },
  prod_name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  prodRatings: {
    type: Number,
    required: true,
  },
  detail_desc: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  department_name: {
    type: String,
    required: true,
  },
  department_no: {
    type: Number,
    required: true,
  },
  colour_group_name: {
    type: String,
    required: true,
  },
  colour_group_code: {
    type: String,
    required: true,
  },
  prodColors: [
    {
      type: String,
      required: true,
    },
  ],
  prodSizes: [
    {
      type: String,
      required: true,
    },
  ],
  prodStyle: {
    type: String,
    required: true,
  },
  inStock: {
    type: Number,
    required: true,
  },
  media: [
    {
      type: String,
    },
  ],
});
module.exports = mongoose.model("Product", productSchema);
