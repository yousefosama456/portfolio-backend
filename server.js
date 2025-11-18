const express = require("express");
const app = express();

const multer = require("multer");
const dotenv=require('dotenv')
dotenv.config();
const port = process.env.PORT;
const cors = require("cors");
const path = require("path");
const connectDB=require('./config/db.config')

const aboutRoute=require('./routes/about.route');
const contactRoute=require('./routes/contact.route');
const educationRoute=require('./routes/education.route');
const experienceRoute=require('./routes/experience.route');
const projectRoute=require('./routes/project.route');
connectDB();

app.use(cors());

app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use('/about',aboutRoute);
app.use('/contact',contactRoute);
app.use('/education',educationRoute);
app.use('/experience',experienceRoute);
app.use('/project',projectRoute);



app.listen(port, () =>
  console.log(`server is connected to ${port} successfully`)
);















