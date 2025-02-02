const {
  feedbackService,
  getFeedbacksByArticleIdService,
} = require("../services/feedbackService");

exports.feedback = async (req, res) => {
  try {
    const addFeedback = await feedbackService(req.body);
    if (addFeedback) {
      res.status(201).json({ message: "addFeedback registered successfully" });
    } else {
      res.status(400).json({ message: "addFeedback registration failed" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// get user by Email
exports.getFeedbackByArticleId = async (req, res) => {
  try {
    const feedbacks = await getFeedbacksByArticleIdService(
      req.params.articleId
    );
    if (feedbacks) {
      res.status(200).json(feedbacks);
    } else {
      res.status(404).json({ message: "feedbacks Not Found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
