var mongoose = require('mongoose');

// Schema setup - later will be broken to separate files
var postSchema = new mongoose.Schema({
    title: String,
    body: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
        },
    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like',
        },
    ],
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        username: String,
    },
    created: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Post', postSchema);
