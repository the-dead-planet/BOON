var mongoose = require('mongoose');

// Schema setup - later will be broken to separate files
var commentSchema = new mongoose.Schema({
    body: String,
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

module.exports = mongoose.model('Comment', commentSchema);
