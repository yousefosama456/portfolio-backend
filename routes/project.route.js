const express= require('express');
const router= express.Router();
const multer=require('multer');
const path=require('path');
const Project= require('../models/project.model');

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
    const img = req.file.filename;
    const project = new Project({ title, description, img });
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    console.log("error from addroduct post api");
    res.status(400).json({ error: err.message });
  }
});
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Project.findByIdAndDelete(id);
    res.json({ message: "project deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports=router;