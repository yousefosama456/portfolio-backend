const express= require('express');
const router= express.Router();
const Experience=require('../models/experience.model')


router.get("/", async (req, res) => {
  try {
    const experience = await Experience.find();
    res.json(experience);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const experience = await Experience.findByIdAndDelete(id);
    res.json({ message: "Experience deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const addExperience = await Experience.create(req.body);
    res.status(201).json(addExperience);
  } catch (err) {
    console.log(err);
  }
});


module.exports=router;
