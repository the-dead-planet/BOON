var mongoose = require('mongoose');

var sprintSchema = new mongoose.Schema({
    number: Number,
    dateFrom: {
        type: Date,
        default: Date.now(),
    },
    dateTo: {
        type: Date,
        default: Date.now(),
    },
    title: String,
    body: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
        },
    ],
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

module.exports = mongoose.model('Sprint', sprintSchema);
