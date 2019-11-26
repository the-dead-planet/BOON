var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

// Schema setup - later will be broken to separate files
var userSchema = new mongoose.Schema({
	username: String,
	email: String,
	team: String,
	password: String,
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	],
	articles: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Article"
		}
	],
	posts: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Post"
		}
	],
	likes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Like"
		}
	]
});

// This adds methods to the User object
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);