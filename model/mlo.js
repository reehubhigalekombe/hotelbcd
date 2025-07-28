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
    }
}, 
{timestamps: true})

module.exports = mongoose.model("Mlo", mloSchema)