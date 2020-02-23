var mongoose = require('mongoose');

var projectSchema = new mongoose.Schema({
    title: String,
    body: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
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
    edited: {
        type: Date,
        default: undefined,
    },
});

module.exports = mongoose.model('Project', projectSchema);
