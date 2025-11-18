const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const port = 3000;
const cors = require("cors");
const path = require("path");

app.use(cors());

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.listen(port, () =>
  console.log(`server is connected to ${port} successfully`)
);
mongoose
  .connect("mongodb://localhost:27017/portfolio")
  .then(() => console.log("DataBase is connected successfully"))
  .catch(() => console.log("failed to connect to DB"));

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    lowercase: true,
  },
  description: {
    type: String,
    trim: true,
    lowercase: true,
  },
  img: {
    type: String,
    trim: true,
    lowercase: true,
  },
});
const Project = mongoose.model("Project", projectSchema);

const educationSchema = new mongoose.Schema({
  degree: {
    type: String,
    trim: true,
    lowercase: true,
  },
  fromWhere: {
    type: String,
    trim: true,
    lowercase: true,
  },
  gpa: {
    type: Number,
    trim: true,
    lowercase: true,
  },
});
const Education = mongoose.model("Education", educationSchema);
const experienceSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },
  employer: {
    type: String,
    trim: true,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  desc: {
    type: String,
    trim: true,
  },
});

const Experience = mongoose.model("Experience", experienceSchema);

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  linkedin: {
    type: String,
    trim: true,
  },
});

const Contact = mongoose.model("Contact", contactSchema);

const aboutSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    img: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const About = mongoose.model("About", aboutSchema);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Initialize multer with the storage configuration
const upload = multer({ storage });

app.post("/project", upload.single("img"), async (req, res) => {
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

app.post("/education", async (req, res) => {
  try {
    const addEducation = await Education.create(req.body);
    res.status(201).json(addEducation);
  } catch (err) {
    console.log(err);
  }
});

app.post("/experience", async (req, res) => {
  try {
    const addExperience = await Experience.create(req.body);
    res.status(201).json(addExperience);
  } catch (err) {
    console.log(err);
  }
});

app.post("/contact", async (req, res) => {
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
app.post("/about", upload.single("img"), async (req, res) => {
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

app.get("/contact", async (req, res) => {
  try {
    const contact = await Contact.findOne();
    res.json(contact);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/education", async (req, res) => {
  try {
    const education = await Education.find();
    res.json(education);
  } catch (err) {
    console.log(err);
  }
});
app.get("/about", async (req, res) => {
  try {
    const about = await About.findOne();
    res.json(about);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});
app.get("/experience", async (req, res) => {
  try {
    const experience = await Experience.find();
    res.json(experience);
  } catch (err) {
    console.log(err);
  }
});
app.get("/project", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    console.log(err);
  }
});

app.delete("/experience/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const experience = await Experience.findByIdAndDelete(id);
    res.json({ message: "Experience deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/project/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Project.findByIdAndDelete(id);
    res.json({ message: "project deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.delete("/education/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Education.findByIdAndDelete(id);
    res.json({ message: "education deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
