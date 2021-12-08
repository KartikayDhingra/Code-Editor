const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/run", (req, res) => {
  return res.status(200).json("Hello");
})

app.use(bodyParser.urlencoded({ extended: true }));

app.listen("5000", (req, res) => {
  console.log("Server running at port 5000");
});
