const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getProductByArticleId } = require("../controllers/productsController");

//protected routes
router.get("/getProduct/:articleId", authMiddleware, getProductByArticleId);
//post, put, delete
module.exports = router;
