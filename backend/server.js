const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
console.log("ENV CHECK:", process.env.MONGODB_URI);
const app = express();


app.use(cors({
  origin: "*"
}));
app.use(express.json());

// 🔥 ROOT ROUTE (IMPORTANT FOR RAILWAY)
const path = require("path");

// Serve frontend files
app.use(express.static(path.join(__dirname, "../public")));

app.get("/",(req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// 🔥 HEALTH ROUTE (FOR FRONTEND TEST)
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});
console.log("ENV CHECK:", process.env.MONGODB_URI);
// 🔥 CONNECT MONGO (SAFE WAY)
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log("Mongo Error ❌", err));

// 🔥 PORT (VERY IMPORTANT FOR RAILWAY)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});