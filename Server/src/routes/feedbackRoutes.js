const express = require("express");
const router = express.Router();
const {
  feedback,
  getFeedbackByArticleId,
} = require("../controllers/feedbackController");

//public routes
router.post("/feedback", feedback);
router.get("/feedback/:articleId", getFeedbackByArticleId);
// todo : dlt n put
module.exports = router;
