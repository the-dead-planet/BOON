var mongoose = require('mongoose');

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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    created: {
        type: Date,
        default: Date.now,
    },
    edited: {
        type: Date,
        default: undefined,
    },
});

module.exports = mongoose.model('Post', postSchema);
