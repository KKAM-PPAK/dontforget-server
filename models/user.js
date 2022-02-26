const mongoose = require("mongoose");

const timelineSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  distance: {
    type: Number,
  },
  created_at: {
    type: Date,
  },
});

const userSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  timeline: [timelineSchema],
});

module.exports = mongoose.model("User", userSchema);
