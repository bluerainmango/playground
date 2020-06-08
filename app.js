const express = require("express");
const path = require("path");
const app = express();

// Frontend
app.use(express.static("client/build"));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

module.exports = app;
