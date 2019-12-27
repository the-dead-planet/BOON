var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

// User login credentials only
var userAuthSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
});

// This adds methods to the User object
userAuthSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('UserAuth', userAuthSchema);
 