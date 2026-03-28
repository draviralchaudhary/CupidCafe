const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// CONNECT DATABASE
mongoose.connect("mongodb://127.0.0.1:27017/cupidcafe");

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

// GET ORDERS (for kitchen)
app.get("/orders", async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.send(orders);
});

app.listen(5000, () => console.log("Backend running on port 5000"));