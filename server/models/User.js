var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    userAuth: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserAuth',
    },
    username: String,
    team: String,
    role: String,
    country: String,
    skills: [String],
    joined: {
        type: Date,
        default: undefined,
    },
    left: {
        type: Date,
        default: undefined,
    },
    created: {
        type: Date,
        default: Date.now,
    },
    edited: {
        type: Date,
        default: undefined,
    },
    // TODO: think how to store this attribute. Values: admin, standard user etc
    auth: String,
});

module.exports = mongoose.model('User', userSchema);
