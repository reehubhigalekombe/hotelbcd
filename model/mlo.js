const mongoose = require("mongoose");

const mloSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        default: "general",
    },
    available: {
        type: Boolean,
        default: true
    },
    image: {
        type: String,
        required: false
    }
}, 
{timestamps: true})

module.exports = mongoose.model("Mlo", mloSchema)