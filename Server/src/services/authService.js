const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

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

    // Find the highest customer_mapped_id
    const lastUser = await User.findOne({ customer_mapped_id: { $exists: true } })
      .sort({ customer_mapped_id: -1 })
      .lean();
    const nextCustomerMappedId = lastUser ? lastUser.customer_mapped_id + 1 : 1;

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
      password: hashedPassword,
      role,
      customer_mapped_id: nextCustomerMappedId,
      isNewUser: true
    });

    const savedUser = await newUser.save();

    return savedUser;
  } catch (error) {
    return { message: error.message };
  }
};

exports.loginUser = async ({ email, password }) => {
  const userExists = await User.findOne({ email });

  if (!userExists) {
    throw new Error("Invalid Email");
  }

  const isPasswordCorrect = await bcrypt.compare(password, userExists.password);

  if (!isPasswordCorrect) {
    throw new Error("Invalid Password");
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
      customer_mapped_id: userExists.customer_mapped_id,
      age: userExists.age,
      email: userExists.email,
      role: userExists.role,
      isNewUser: userExists.isNewUser
    },
  };
};
