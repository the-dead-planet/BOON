var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

// Schema setup - later will be broken to separate files
var userSchema = new mongoose.Schema({
	username: String,
	email: String,
	team: String,
	password: String
});

// This adds methods to the User object
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);