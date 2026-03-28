const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 ROOT ROUTE (IMPORTANT FOR RAILWAY)
app.get("/", (req, res) => {
  res.send("Cupid Cafe Backend is Running 💘");
});

// 🔥 HEALTH ROUTE (FOR FRONTEND TEST)
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// 🔥 CONNECT MONGO (SAFE WAY)
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log("Mongo Error ❌", err));

// 🔥 PORT (VERY IMPORTANT FOR RAILWAY)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});