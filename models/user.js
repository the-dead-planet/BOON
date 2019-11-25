var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

// Schema setup - later will be broken to separate files
var userSchema = new mongoose.Schema({
	username: String,
	password: String,
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
});

// This adds methods to the User object
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);