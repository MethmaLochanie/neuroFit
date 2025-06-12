const {
  getUserByEmail,
  getUserByUserIdService,
  updateUserDetailsService,
  getUserByCustomerMappedIdService,
} = require("../services/userService");

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

exports.updateUserByUserId = async (req, res) => {
  try {
    const { customer_mapped_id } = req.params;
    if (!customer_mapped_id) {
      return res
        .status(400)
        .json({ message: "Customer Mapped ID is required" });
    }

    const updatedUser = await updateUserDetailsService(
      customer_mapped_id,
      req.body
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    if (error.message === "User not found") {
      return res.status(404).json({ message: error.message });
    }
    if (
      error.message.includes("Missing required fields") ||
      error.message.includes("Invalid email format") ||
      error.message.includes("Invalid phone number format")
    ) {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getUserByCustomerMappedId = async (req, res) => {
  try {
    const { customer_mapped_id } = req.params;
    if (
      !customer_mapped_id ||
      (typeof customer_mapped_id !== "string" &&
        typeof customer_mapped_id !== "number")
    ) {
      return res
        .status(400)
        .json({ message: "Invalid or missing customer_mapped_id" });
    }
    const user = await getUserByCustomerMappedIdService(customer_mapped_id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User Not Found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
