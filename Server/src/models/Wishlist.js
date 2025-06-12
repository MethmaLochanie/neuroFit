const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wishlistItemSchema = new Schema(
  {
    articleId: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
  },
  { _id: true }
);

const wishlistSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  items: [wishlistItemSchema],
});

module.exports = mongoose.model("Wishlist", wishlistSchema);
