const mongoose = require("mongoose");

const memoSchema = new mongoose.Schema({
  description: {
    type: String,
  },
  due_date: {
    type: Date,
  },
  created_at: {
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
