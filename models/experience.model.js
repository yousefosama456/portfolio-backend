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
module.exports = mongoose.model("Experience", experienceSchema);
