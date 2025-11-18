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

module.exports= mongoose.model("Contact", contactSchema);