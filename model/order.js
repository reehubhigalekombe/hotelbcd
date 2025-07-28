const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema ({
waiterName: String,
tableNumber: String,
items: [{
    name: String,
    quantity: Number,
    price: Number
}
],
totalAmount: Number,
orderTime: {
    type: Date,
    default: Date.now
}
},
{timestamps: true});

module.exports = mongoose.model("Order", orderSchema)