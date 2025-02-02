require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Routes
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const orderRoutes = require("./routes/orderRoutes");
const productsRoutes = require("./routes/productRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/feedbacks", feedbackRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productsRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send("Neurofit Backend Running");
});

//Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
