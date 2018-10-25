const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/signup", function(req, res, next) {
  res.render("users/signup", {title: "ISS Tracker - Sign Up"});
});

router.post("/signup", function(req, res, next) {
  console.log("Posting a users stuff....", req.body)
  userController.signupUser(req, res);
});

router.get("/login", function(req, res, next) {
  console.log("Posting a users stuff....", req.body)
  res.render("users/login", {title: "ISS Tracker - Log In"});
});

router.post("/login", function(req, res, next) {
  userController.loginUser(req, res, next);
});


module.exports = router;
