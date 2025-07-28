const express = require("express");
const router = express.Router();
const Order = require("../model/order");


router.post("/", async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        const savedOrder = await newOrder.save();

        res.status(201).json(savedOrder)
    }catch(err) {
        res.status(500).json({error: "Failed to save theorder", details:err})
    }
})

router.get("/",  async(req, res) => {
    try {
        const orders = await Order.find().sort({orderTime: -1});
        res.json(orders)
    }catch(err) {
        console.error(err)
        res.status(500).json({error: "Failed while fetching orders"})
    }
})

router.get("/:id", async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
        if(!order) return res.status(404).json({error: "No order found"})
            res.json(order)
    }catch(err) {
res.status(500).json({error: "Failed to fect order"})
    }
})

module.exports = router