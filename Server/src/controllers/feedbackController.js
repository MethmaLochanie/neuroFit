const {
  feedbackService,
  getFeedbacksByArticleIdService,
} = require("../services/feedbackService");

exports.feedback = async (req, res) => {
  try {
    const result = await feedbackService(req);
    if (result.success) {
      res
        .status(201)
        .json({ message: "Feedback saved successfully", data: result.data });
    } else {
      res.status(result.status || 400).json({ message: result.message });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to save feedback" });
  }
};

exports.getFeedbackByArticleId = async (req, res) => {
  try {
    const feedbacks = await getFeedbacksByArticleIdService(
      req.params.article_id
    );
    res.status(200).json(feedbacks);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch feedbacks", error: error.message });
  }
};
