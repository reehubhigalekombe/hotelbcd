
const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB connected Succesfully")

    }catch(error) {
        console.error("MongoDB connection has failed")
    }
}
module.exports = connectDB