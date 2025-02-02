const User = require("../models/User");
const crypto = require("crypto");

// get user by Email
exports.getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email }).select("-password");
    if (!user) {
      throw Error("User not found");
    }
    return user;
  } catch (error) {
    return { message: error.message };
  }
};

// get user by userId
exports.getUserByUserIdService = async (userId) => {
  try {
    const user = await User.findOne({ userId });
    if (!user) {
      throw Error("User not found");
    }
    return user;
  } catch (error) {
    return { message: error.message };
  }
};

//update user details
exports.updateUserDetailsService = async (userId, update) => {
  try {
    const user = await User.findOneAndUpdate({ userId }, update, { new: true });
    if (!user) {
      throw Error("User not found");
    }
    return user;
  } catch (error) {
    return { message: error.message };
  }
};
