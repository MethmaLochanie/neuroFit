const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  articleId: {
    type: String,
    required: true,
  },
  prodName: {
    type: String,
    required: true,
  },
  prodPrice: {
    type: Number,
    required: true,
  },
  prodRatings: {
    type: Number,
    required: true,
  },
  prodDesc: {
    type: String,
    required: true,
  },
  media: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model("Product", productSchema);
