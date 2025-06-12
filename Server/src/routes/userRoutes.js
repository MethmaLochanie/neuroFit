const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  getUserByEmail,
  getUserByUserId,
  updateUserByUserId,
  getUserByCustomerMappedId,
} = require("../controllers/userController");

router.put("/user/update/:customer_mapped_id", updateUserByUserId);
router.get(
  "/user/by-customer-mapped-id/:customer_mapped_id",
  getUserByCustomerMappedId
);

router.get("/user/:email", authMiddleware, getUserByEmail);
router.get("/user/:userId", getUserByUserId);

//dlte

module.exports = router;
