const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const app = express();

// const productsRouter = require()
app.enable("trust proxy");

//! Cors
app.use(cors());
app.options("*", cors());

//! Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//! Logger in Development mode
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use((req, res, next) => {
  console.log("hello from middleware😛");
  next();
});

//! Frontend
app.use(express.static("client/build"));

//! API routers
// app.use("/api/v1/products", );

app.all("*", (req, res, next) => {
  console.log("🚩 No API exists!");
  next(new AppError(`❓ Cannot find URL: ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
