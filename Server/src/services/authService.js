const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

//register a new user
exports.registerUser = async ({
  fName,
  lName,
  email,
  country,
  city,
  postalCode,
  phoneNumber,
  age,
  password,
  role,
}) => {
  try {
    const userExists = await User.findOne({ email });

    if (userExists && userExists.isVerified) {
      throw new Error("User already exists");
    } else if (userExists && !userExists.isVerified) {
      throw new Error("User already exists but not verified");
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
        fName,
        lName,
        email,
        country,
        city,
        postalCode,
        phoneNumber,
        age,
        password : hashedPassword,
        role,
    });

    const savedUser = await newUser.save();

    return savedUser;
  } catch (error) {
    return { message: error.message };
  }
};

// login a user
exports.loginUser = async ({ email, password }) => {
  const userExists = await User.findOne({ email });

  if (!userExists) {
    throw new Error("Invalid Email"); // Throw error if the email is invalid
  }

  const isPasswordCorrect = await bcrypt.compare(password, userExists.password);

  if (!isPasswordCorrect) {
    throw new Error("Invalid Password"); // Throw error if the password is invalid
  }

  const token = jwt.sign(
    {
      userId: userExists._id,
      name: userExists.name,
      role: userExists.role,
      email: userExists.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return {
    token,
    user: {
      id: userExists._id,
      name: userExists.name,
      email: userExists.email,
      role: userExists.role,
    },
  };
};
