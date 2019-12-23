var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    userAuth: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserAuth',
    },
    team: String,
});

module.exports = mongoose.model('User', userSchema);
