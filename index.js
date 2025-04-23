const express = require("express");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const httpStatusText = require("./utils/httpStatusText");
const mongoose = require("mongoose");
const coursesRouter = require("./routes/course.routes");
const path = require("node:path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const limiter = rateLimit({
  max: 200,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this IP",
});
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("mongoDB server started...");
  })
  .catch(() => {
    console.log("fail connection to mongoDB!!");
  });

const app = express();
app.use(limiter);
app.use(cors());

app.use(express.json());
app.use("/api/courses", coursesRouter);

app.all("*", (req, res, next) => {
  return res.status(404).json({
    status: httpStatusText.ERROR,
    message: "this resource is not available",
  });
});

app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    status: error?.statusText || httpStatusText.ERROR,
    message: error?.message,
    code: error?.statusCode || 500,
    data: null,
  });
});

app.listen(3000, () => {
  console.log("starting app...");
});
