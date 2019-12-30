var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    userAuth: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserAuth',
    },
    username: String,
    team: String,
    created: {
        type: Date,
        default: Date.now,
    },
});


module.exports = mongoose.model('User', userSchema);
