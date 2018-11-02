const User = require("../models/user");

const signupUser = function(req, res, next){
	if (req.body.password !== req.body.confirmPassword) {
		res.render('users/signup', {notification: {message: 'Passwords do not match', type: 'alert-danger'}, username: req.body.username, email: req.body.email});
	}
	User.create(req.body, function(error, results) {
		if(error) {
			res.render('users/signup', {notification: {message: error, type: 'alert-danger'}, username: req.body.username, email: req.body.email});
		} else {
			req.session.email = req.body.email;
			res.redirect('/users/login');
		}
	});
};

const loginUser = function(req, res, next) {
	if(req.body.email && req.body.password) {
		User.authenticate(req.body.email, req.body.password, function(error, user) {
			if (error || !user) {
				res.render('users/login', {notification: {message: 'Wrong email or password', type: 'alert-danger'}, email: req.body.email});
			} else {
				req.session.user = user;
				res.redirect('/home');
			}
		});
	} else {
		const error = new Error('Username and/or password is required');
		return next(error);
	}
};

module.exports.loginUser = loginUser;
module.exports.signupUser = signupUser;