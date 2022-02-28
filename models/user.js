const mongoose = require("mongoose");

const timelineSchema = new mongoose.Schema({
  distance: {
    type: Number,
  },
  created_at: {
    type: Date,
  },
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  uid: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  timeline: [timelineSchema],
  refreshToken: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
