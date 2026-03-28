console.log("SERVER STARTING...");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

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

// GET ORDERS (for kitchen)
app.get("/orders", async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.send(orders);
});
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log(err));

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});