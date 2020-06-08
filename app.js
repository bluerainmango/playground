const express = require("express");
const morgan = require("morgan");
const path = require("path");
const app = express();
const cors = require("cors");

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
app.all("*", () => {});

module.exports = app;
