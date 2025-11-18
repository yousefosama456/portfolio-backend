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
module.exports = mongoose.model("Education", educationSchema);