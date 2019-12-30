var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

// User login credentials only
var userAuthSchema = new mongoose.Schema({
    username: String,
    password: String
});

// Add methods from passport-local-mongoose (authenticate, register etc)
userAuthSchema.plugin(passportLocalMongoose);


module.exports = mongoose.model('UserAuth', userAuthSchema);