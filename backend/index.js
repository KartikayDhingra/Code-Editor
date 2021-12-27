const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
// const isLogged = require("./isLogged");
require("./auth");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // allow to server to accept request from different origin
    credentials: true
  })
);

app.get("/run", (req, res) => {
  return res.status(200).json("Hello");
});

app.use(bodyParser.urlencoded({ extended: true }));

const uri = process.env.DATABASE;

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected");
  })
  .catch((err) => console.log(err));

const userRouter = require("./Router/User/user.router");
app.use("/users", userRouter);

// const googleAuthRouter = require("./Router/GoogleAuth/google-auth");
// app.use('/auth/google', googleAuthRouter);

app.use(
  session({
    secret: "23ewjfj48bddffg893",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/secrets",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/signup",
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("http://localhost:3000");
  }
);

const isLogged = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

app.get("/userInfo", isLogged, (req, res) => {
  res.send(req.user);
  // res.redirect("http://localhost:3000");
});

app.get("/logout", isLogged, (req,res) => {
    req.logout();
    res.redirect('http://localhost:3000');
})

app.listen("5000", (req, res) => {
  console.log("Server running at port 5000");
});
