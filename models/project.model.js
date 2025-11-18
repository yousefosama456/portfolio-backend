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
module.exports = mongoose.model("Project", projectSchema);