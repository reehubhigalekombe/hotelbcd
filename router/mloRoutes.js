const express = require("express");
const router = express.Router();
const Mlo = require("../model/mlo");


router.post("/", async (req, res) => {
    try {
        const data = req.body;
        if(Array.isArray(data)) {
            const savedItems = await Mlo.insertMany(data);
            return res.status(201).json(savedItems)
        }
        const newMlo = new Mlo(req.body)
        const savedMlo = await newMlo.save();
        res.status(201).json(savedMlo)
    }catch(err) {
        res.status(500).json({error: "failed to add Food"})
    }

})

router.get("/", async (req, res) => {
    try {
        const {category} = req.query;
        const filter = {available: true}
        if(category) filter.category = category
        const mlo = await Mlo.find(filter);
        res.json(mlo)

    }catch(err) {
        res.status(500).json({error: "Failed to fetch food items"})

    }
})

module.exports = router