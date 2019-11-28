var mongoose = require('mongoose');

// Schema setup - later will be broken to separate files
var postSchema = new mongoose.Schema({
	name: String,
    description: String,
    sprint: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Sprint"
		},
		name: String
	},
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String 
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
    ],
    created: {
		type: Date, 
		default: Date.now()
	}
});

module.exports = mongoose.model("Post", postSchema);