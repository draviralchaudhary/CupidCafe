require("dotenv").config();
console.log("MONGO URI:", process.env.MONGODB_URI);
console.log("SERVER STARTING...");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());

// CONNECT DATABASE

// ORDER SCHEMA
const Order = mongoose.model("Order", {
  items: Array,
  total: Number,
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now }
});

// CREATE ORDER
app.post("/order", async (req, res) => {
  const order = new Order(req.body);
  await order.save();
  res.send({ success: true });
});



app.use(cors({
  origin: "*"
}));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port", PORT);
});