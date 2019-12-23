var mongoose = require('mongoose');

var sprintSchema = new mongoose.Schema({
    number: Number,
    name: String,
    dateFrom: {
        type: Date,
        default: Date.now(),
    },
    dateTo: {
        type: Date,
        default: Date.now(),
    },
    description: String,
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
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        username: String,
    },
    created: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model('Sprint', sprintSchema);
