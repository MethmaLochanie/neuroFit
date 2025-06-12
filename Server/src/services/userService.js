const User = require("../models/User");
const crypto = require("crypto");

exports.getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email }).select("-password");
    if (!user) {
      throw Error("User not found");
    }
    return user;
  } catch (error) {
    throw error;
  }
};

exports.getUserByUserIdService = async (userId) => {
  try {
    const user = await User.findOne({ userId });
    if (!user) {
      throw Error("User not found");
    }
    return user;
  } catch (error) {
    throw error;
  }
};

exports.updateUserDetailsService = async (customer_mapped_id, updateData) => {
  try {
    const requiredFields = [
      "fName",
      "lName",
      "email",
      "country",
      "city",
      "postalCode",
      "phoneNumber",
    ];
    const missingFields = requiredFields.filter((field) => !updateData[field]);

    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(updateData.email)) {
      throw new Error("Invalid email format");
    }

    // // Validate phone number format (basic validation)
    // const phoneRegex = /^\+?[\d\s-]{10,}$/;
    // if (!phoneRegex.test(updateData.phoneNumber)) {
    //   throw new Error('Invalid phone number format');
    // }

    const user = await User.findOneAndUpdate(
      { customer_mapped_id },
      {
        $set: {
          fName: updateData.fName,
          lName: updateData.lName,
          email: updateData.email,
          country: updateData.country,
          city: updateData.city,
          postalCode: updateData.postalCode,
          phoneNumber: updateData.phoneNumber,
          age: updateData.age,
          updatedAt: new Date(),
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    throw error;
  }
};

exports.getUserByCustomerMappedIdService = async (customer_mapped_id) => {
  try {
    const user = await User.findOne({ customer_mapped_id });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw error;
  }
};
