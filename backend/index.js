const express = require("express");
const bodyParser = require("body-parser");

const { generateCode } = require("./generateCode");
const { runCpp } = require("./runCpp");
const { runPy } = require("./runPy");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.listen("5000", (req, res) => {
  console.log("Server running at port 5000");
});
