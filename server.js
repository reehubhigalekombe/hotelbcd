require("dotenv").config();
const express = require("express");
const connectDB = require("./db");
const cors = require("cors")
const orderRoutes = require("./router/myorder")
const foodRoutes = require("./router/mloRoutes")

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}
));
app.use(express.json());

connectDB()

const PORT = process.env.PORT || 8001;

app.use("/api/orders", orderRoutes);
app.use("/api/mlo", foodRoutes);

app.get("/", (req, res) => {
    res.send("Hello Higal, you are doing well?")
})

app.listen(PORT, () => {
    console.log(` Higal Server is running, ${PORT}`)
})