var mongoose = require('mongoose');

var TeamSchema = new mongoose.Schema({
    title: String,
    body: String,
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
        },
    ],
    created: {
        type: Date,
        default: Date.now,
    },
    edited: {
        type: Date,
        default: undefined,
    },
});

module.exports = mongoose.model('Team', TeamSchema);
