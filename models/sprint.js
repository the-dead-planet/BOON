var mongoose = require('mongoose');

// Schema setup - later will be broken to separate files
var sprintSchema = new mongoose.Schema({
    number: Number,
    name: String,
    dateFrom: {
		type: Date, 
		default: Date.now()
	},
    dateTo: {
		type: Date, 
		default: Date.now()
	},
	description: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String 
	},
	posts: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Post"
		}
    ],
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

module.exports = mongoose.model("Sprint", sprintSchema);