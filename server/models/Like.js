var mongoose = require('mongoose');

var likeSchema = new mongoose.Schema({
    // TODO: possibly add a separate model for like type and allow selection on the front-end
    type: {
        type: String,
        default: 'Thumb up',
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    created: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Like', likeSchema);
