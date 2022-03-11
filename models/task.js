const mongoose = require("mongoose");

const memoSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "empty",
  },
  description: {
    type: String,
    default: "empty",
  },
  due_date: {
    type: Date,
    default: Date,
  },
  did_date: {
    type: Date,
    default: Date,
  },
  repeat: {
    type: String,
    default: "0",
  },
});

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "empty",
  },
  writer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  memo: [memoSchema],
  created_at: {
    type: Date,
    default: Date,
  },
});

module.exports = mongoose.model("Task", taskSchema);
