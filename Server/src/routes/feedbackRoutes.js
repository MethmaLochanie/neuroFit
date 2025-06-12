const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const {
  feedback,
  getFeedbackByArticleId,
} = require("../controllers/feedbackController");

router.post("/feedback", upload.array("media"), feedback);
router.get("/feedback/:article_id", getFeedbackByArticleId);
// todo : dlt n put
module.exports = router;
