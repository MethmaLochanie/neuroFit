const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  getUserByEmail,
  getUserByUserId,
  updateUserByUserId,
} = require("../controllers/userController");

//protected routes
router.get("/user/:email", authMiddleware, getUserByEmail);
router.get("/user/:userId", getUserByUserId);
router.put("/user/update/: userId", updateUserByUserId);
//dlte

module.exports = router;
