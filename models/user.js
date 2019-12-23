var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
    userAuth: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserAuth',
    },
    team: String,
    created: {
        type: Date,
        default: Date.now(),
    },
});

// This adds methods to the User object - is this needed here?
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
