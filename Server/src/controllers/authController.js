const { registerUser, loginUser } = require("../services/authService");

exports.registerUser = async (req, res) => {
  try {
    const user = await registerUser(req.body);
    if (user) {
      res.status(201).json({ message: "User registered successfully", user });
    } else {
      res.status(400).json({ message: "User registration failed", error: true });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = await loginUser(req.body);
    res.status(200).json(user);
  } catch (error) {
    if (error.message === "Invalid Email") {
      return res.status(404).json({ error: true, message: error.message });
    } else if (error.message === "Invalid Password") {
      return res.status(401).json({ error: true, message: error.message });
    }

    res.status(500).json({ error: true, message: "Server Error" });
  }
};
