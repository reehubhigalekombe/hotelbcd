const express = require("express");
const router = express.Router();
const Mlo = require("../model/mlo");
const multer = require("multer");
const path = require("path")
const fs = require("fs")


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, "../public/uploads"))
    },   
    filename: function(req, file, cb) { 
        cb(null, Date.now() + "-" + file.originalname)
    }
})
 const upload = multer({storage: storage});

router.post("/", upload.array("image"), async (req, res) => {
    try {
        const formData = JSON.parse(req.body.formData);

        const files = req.files

        const filledtems = formData.map((item, index) => ({
              ...item,
                image: files[index] ? `/uploads/${files[index].filename}` : null
        }));

        const saveFood = await Mlo.insertMany(filledtems);
        res.status(201).json(saveFood)
        
    }catch(err) {
        console.error(err);
        res.status(500).json({err: "The Server has failed to add"})
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
router.delete("/:id", async (req, res) => {
    try {
        const deleteFood = await Mlo.findByIdAndDelete(req.params.id);
        if(item)  return res.status(404).json({message: "Item not found"})
        if(item.image) {
            const imagePath = path.join(__dirname, "public/uploads", item.image);
            fs.unlink(imagePath, (err) => {
                if(err) console.warn("image delete has failed", err.message)
            });
        }
        await Mlo.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Food Item has been deleted with image"})
    }catch(err) {
        console.error("Delete error has occured", err);
        res.status(500).json({message: "Server error has occured"})
    }
})

module.exports = router

