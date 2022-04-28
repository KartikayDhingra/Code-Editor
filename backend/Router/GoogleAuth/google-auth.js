const express = require("express");
const router = express.Router();
const session = require('express-session');
const passport = require("passport");
// const User = require("../../models/user.model");
const isLogged = require("../../islogged");
require("../../auth");

const app = express();

router.use(
  session({
    secret: "23ewjfj48bddffg893",
    resave: false,
    saveUninitialized: true,
  })
);

router.use(passport.initialize());
router.use(passport.session());

router.get("/", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/secrets",
  passport.authenticate("google", {
    failureRedirect: "https://code-through-kartikaydhingra.vercel.app/signup",
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('https://code-through-kartikaydhingra.vercel.app');
  }
);

module.exports = router;
