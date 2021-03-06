require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const connectDB = require("./db");
const authRouter = require("./routes/auth");
const taskRouter = require("./routes/task");
const timelineRouter = require("./routes/timeline");
const checkHeader = require("./utils/checkHeader");

const app = express();
connectDB();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(
  cors({
    credentials: true,
  }),
);

app.use(logger("dev"));
app.use(
  express.json({
    limit: "100mb",
  }),
);
app.use(express.urlencoded({ limit: "100mb", extended: true, parameterLimit: 50000 }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/auth", authRouter);
app.use("/task", checkHeader, taskRouter);
app.use("/timeline", checkHeader, timelineRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
