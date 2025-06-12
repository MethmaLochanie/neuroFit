const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { FEEDBACK_CATEGORY } = require("../constants/feedbackCategories");

const feedbackSchema = new Schema({
  customer_mapped_id: {
    type: String,
    required: true,
  },
  article_id: {
    type: String,
    required: true,
  },
  feedback_description: {
    type: String,
    required: true,
  },
  feedbackCategory: {
    type: String,
    enum: FEEDBACK_CATEGORY,
    default: FEEDBACK_CATEGORY.FEEDBACK,
  },
  rating: {
    type: Number,
    required: true,
  },
  media: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model("Feedback", feedbackSchema);
