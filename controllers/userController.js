const User = require("../models/user");

const signupUser = function(req, res){
	console.log('Maneno iko hapa: ', req.body, res.body)
	if (req.body.password !== req.body.confirmPassword) {
		res.status(400);
		return res.json('Passwords do not match!');
	}
	User.create(req.body, function(error, results) {
		if(error){
			res.status(400);
			res.json(error);
		} else {
			res.redirect('/home');
		}
	});
};

const loginUser = function(req, res, next) {
	if(req.body.email && req.body.password) {
		User.authenticate(req.body.email, req.body.password, function(error, user) {
			if (error || !user) {
				const error = new Error('Wrong email or password');
				error.status = 401;
				return next(error);
			} else {
				req.session.userId = user._id;
				res.redirect('/home');
			}
		});
	} else {
		const error = new Error('Username and/or password is required')
		return next(error);
	}
}

module.exports.loginUser = loginUser;
module.exports.signupUser = signupUser;