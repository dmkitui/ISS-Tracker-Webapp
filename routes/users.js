const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/signup", function(req, res, next) {
  res.render("users/signup", {title: "ISS Tracker - Sign Up"});
});

router.post("/signup", function(req, res, next) {
  userController.signupUser(req, res, next);
});

router.get("/login", function(req, res, next) {
  res.render("users/login", {title: "ISS Tracker - Log In"});
});

router.post("/login", function(req, res, next) {
  userController.loginUser(req, res, next);
});

router.get("/logout", function(req, res, next) {
  if(req.session) {
    req.session.destroy(function (error) {
        if (error) {
          return next(error);
        } else {
          return res.redirect('/home');
        }
	})
  }
});




module.exports = router;
