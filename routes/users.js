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


module.exports = router;
