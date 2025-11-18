const express= require('express');
const router= express.Router();

const multer=require('multer');
const path=require('path');
const  About= require('../models/about.model');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});


const upload = multer({ storage });
router.post("/", upload.single("img"), async (req, res) => {
  try {
    const { title, description } = req.body;
    const img = req.file ? req.file.filename : null;
    const about = await About.findOneAndUpdate(
      {},
      { title, description, img },
      { new: true, upsert: true }
    );
    res.status(201).json(about);
  } catch (err) {
    console.log("error from about post api");
    res.status(400).json({ error: err.message });
  }
});




router.get("/", async (req, res) => {
  try {
    const about = await About.findOne();
    res.json(about);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports= router;
