const express= require('express');
const router= express.Router();
const Education= require('../models/education.model');

router.post("/", async (req, res) => {
  try {
    const addEducation = await Education.create(req.body);
    res.status(201).json(addEducation);
  } catch (err) {
    console.log(err);
  }
});
router.get("/", async (req, res) => {
  try {
    const education = await Education.find();
    res.json(education);
  } catch (err) {
    console.log(err);
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Education.findByIdAndDelete(id);
    res.json({ message: "education deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports=router