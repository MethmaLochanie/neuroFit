const Feedback = require("../models/Feedback");

exports.feedbackService = async ({
  userId,
  articleId,
  feedback,
  feedbackCategory,
  ratings,
  media,
}) => {
  try {
    const newFeedback = new Feedback({
      userId,
      articleId,
      feedback,
      feedbackCategory,
      ratings,
      media,
    });

    const saveFeedback = await newFeedback.save();

    return saveFeedback;
  } catch (error) {
    return { message: error.message };
  }
};

exports.getFeedbacksByArticleIdService = async (articleId) => {
  try {
    const feedback = await Feedback.find({ articleId });
    if (!feedback) {
      throw Error("feedback not found");
    }
    return feedback;
  } catch (error) {
    return { message: error.message };
  }
};
