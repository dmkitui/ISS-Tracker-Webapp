const User = require("../models/user");

const signupUser = function(req, res, next){
	if (req.body.password !== req.body.confirmPassword) {
		return res.render('users/signup', {notification: {message: 'Passwords do not match', type: 'alert-danger'}, username: req.body.username, email: req.body.email});
	}
	const passwordEvaluationErrors = passwordEvaluator(req.body.password);
	console.log('Error: ', passwordEvaluationErrors);
	if (passwordEvaluationErrors.length !== 0) {
		let errors = passwordEvaluationErrors.join(', ');
		return res.render('users/signup', {notification: {message: `Password Error: ${errors}`, type: 'alert-danger'}, username: req.body.username, email: req.body.email});
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

function passwordEvaluator(password) {
	let errors = [];
	if (password.length < 8 || password.length > 28) {
		errors.push('Should be between 8 and 28 characters long');
	}
	if (!(/[A-Z]/.test(password))) {
		errors.push('have at least one uppercase letter');
	}
	if (!(/[a-z]/.test(password))) {
		errors.push('have at least one lowercase letter');
	}
	if (!(/\d/.test(password))) {
		errors.push('have at least one digit');
	}
	if (!(/\W/.test(password))) {
		errors.push('have at least one non-alphabet character');
	}

	return errors;
}

module.exports.loginUser = loginUser;
module.exports.signupUser = signupUser;