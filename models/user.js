const mongoose = require("mongoose");

const timelineSchema = new mongoose.Schema({
  distance: {
    type: Number,
    default: 0,
  },
  polyline: [
    {
      type: String,
    },
  ],
  created_at: {
    type: String,
    default: new Date().toISOString(),
  },
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  timeline: [timelineSchema],
  refreshToken: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
