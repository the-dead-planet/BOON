var mongoose = require('mongoose');

// Schema setup - later will be broken to separate files
var commentSchema = new mongoose.Schema({
    commentedObject: {
        model: String,
        id: String,
    },
    body: String,
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
    edited: [
        {
            type: Date,
            default: undefined,
        },
    ],
});

module.exports = mongoose.model('Comment', commentSchema);
