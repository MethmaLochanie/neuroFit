require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const orderRoutes = require("./routes/orderRoutes");
const productsRoutes = require("./routes/productsRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/feedbacks", feedbackRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productsRoutes);

app.get("/", (req, res) => {
  res.send("Neurofit Backend Running");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
