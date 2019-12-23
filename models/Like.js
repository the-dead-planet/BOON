var mongoose = require('mongoose');

// Schema setup - later will be broken to separate files
var likeSchema = new mongoose.Schema({
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
        default: Date.now(),
    },
});

module.exports = mongoose.model('Like', likeSchema);
