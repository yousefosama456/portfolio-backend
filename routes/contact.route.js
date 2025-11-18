const express= require('express');
const router= express.Router();
const Contact=require('../models/contact.model')

router.post("/", async (req, res) => {
  try {
    const { name, email, phone, linkedin } = req.body;
    const contactInfo = await Contact.findOneAndUpdate(
      {},
      { name, email, phone, linkedin },
      { new: true, upsert: true }
    );

    res.status(201).json(contactInfo);
  } catch (err) {
    console.log(err);
  }
});
router.get("/", async (req, res) => {
  try {
    const contact = await Contact.findOne();
    res.json(contact);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports= router;