const mongoose = require("mongoose");

module.exports = () => {
  mongoose.connect(process.env.MONGODB_ADDRESS);

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", console.log.bind(console, "Connected to database.."));
};
