var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
    // TODO: consider dropping this field; according to the implementation, Posts can be added to Sprints only
    postedToObject: {
        model: String,
        id: String,
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
    },
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
        // TODO: do not store the username here; store `User.id` only
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

module.exports = mongoose.model('Post', postSchema);
