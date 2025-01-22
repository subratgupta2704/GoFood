const express = require("express");
const router = express.Router();
const Orders = require("../models/Orders");

router.post("/orderData", async (req, res) => {
  const data = req.body.order_data;

  try {
    const eId = await Orders.findOne({ email: req.body.email });
    console.log(eId);

    if (!eId) {
      await Orders.create({
        email: req.body.email,
        order_data: [{ order_data: req.body.order_data }],
      });
      res.json({ success: true });
    } else {
      await Orders.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: { Order_data: req.body.order_data } } }
      );
      res.json({ success: true });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

router.post("/myOrderData", async (req, res) => {
  try {
    let myData = await Order.findOne({ email: req.body.email });
    res.json({ orderData: myData });
  } catch (error) {
    res.send("Error", error.message);
  }
});

module.exports = router;
