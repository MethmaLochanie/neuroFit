const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { FEEDBACK_CATEGORY } = require("../constants/feedbackCategories");

const feedbackSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  articleId: {
    type: String,
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
  feedbackCategory: {
    type: String,
    enum: FEEDBACK_CATEGORY,
    default: FEEDBACK_CATEGORY.FEEDBACK,
  },
  ratings: {
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
