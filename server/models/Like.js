var mongoose = require('mongoose');

var likeSchema = new mongoose.Schema({
    likedObject: {
        model: String,
        id: String,
    },
    type: {
        type: String,
        default: 'Thumb up',
    },
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

module.exports = mongoose.model('Like', likeSchema);
