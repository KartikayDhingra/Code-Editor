const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
require("./auth");

const app = express();

// "client": "npm run start --prefix client",
//     "dev": "concurrently \"npm run client\" \"npm run start\"",
//     "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"

app.use(
  cors({
    origin: "http://localhost:3000", // allow to server to accept request from different origin
    credentials: true
  })
);


app.get("/", (req, res) => {
  res.send("App is running");
})

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

const codeRouter = require("./Router/Code/code.router");
app.use("/save", codeRouter);

// const googleAuthRouter = require("./Router/GoogleAuth/google-auth");
// app.use('/auth/google', googleAuthRouter);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"]})
);

app.get(
  "/auth/google/secrets",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/signup",
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    // console.log(req.user);
    res.redirect("http://localhost:3000");
  }
);

const isLogged = (req,res,next) => {
  if(req.user){
      next();
  }
  else{
      res.sendStatus(401);
  }
}

app.get("/userInfo", isLogged, (req, res) => {
  res.send(req.user);
  // res.redirect("http://localhost:3000");
});

app.get("/logout", isLogged, (req,res) => {
    req.logout();
    res.redirect('http://localhost:3000');
})

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

if(process.env.NODE_ENV === 'production'){
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  })
}

const port = process.env.PORT || 5000;

app.listen(port, (req, res) => {
  console.log("Server running at port 5000");
});