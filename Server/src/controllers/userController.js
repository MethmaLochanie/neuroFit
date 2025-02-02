const {
  getUserByEmail,
  getUserByUserIdService,
  updateUserByUserIdService,
} = require("../services/userService");

// get user by Email
exports.getUserByEmail = async (req, res) => {
  try {
    const user = await getUserByEmail(req.params.email);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User Not Found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

//get user by userId
exports.getUserByUserId = async (req, res) => {
  try {
    const user = await getUserByUserIdService(req.params.userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User Not Found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

//update user by userId
exports.updateUserByUserId = async (req, res) => {
  try {
    const updatedUser = await updateUserByUserIdService(
      req.params.userId,
      req.body
    );
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: "User Not Found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
