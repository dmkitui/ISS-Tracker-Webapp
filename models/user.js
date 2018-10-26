const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
	username: {
		type: String,
		required: [true, "username is required"],
		unique: [true, "Username already exists"]
	},
	email: {
	  type: String,
		required: [true, "Email is not provided"],
		unique: [true, "Email already used to sign up"]
	},
	signUpDate: {
		type: Date,
		default: Date.now
	},
	password: {
		type: String,
		required: [true, "Password is required"]
	},
	myLocation: {
		type: String,
		coordinates: [Number]
	}
});
UserSchema.statics.authenticate = function(email, password, callback) {
	User.findOne({ email: email})
		.exec(function(error, user) {
			if (error) {
				callback(error);
			} else if (!user) {
				const error = new Error("User does not exist");
				error.status = 401;
				return callback(error);
			}
			bcrypt.compare(password, user.password, function(error, result){
				if(result === true) {
					return callback(null, user);
				} else {
					return callback();
				}
			});
		});
};

UserSchema.pre("save", function(next) {
	const user = this;
	bcrypt.hash(user.password, 10, function(error, hash) {
		if (error) {
			next(error);
		} else {
			user.password = hash;
			next();
		}
	});
});

const User = mongoose.model("User", UserSchema);
module.exports = User;