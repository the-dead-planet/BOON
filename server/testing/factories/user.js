const mongoose = require('mongoose');

const User = mongoose.model('User');

const createUser = ({ email, password, team }) =>
    User.register(User({ username: email, publicName: email, team }), password);

const createUsers = users => Promise.all(users.map(user => createUser(user)));

module.exports = { createUser, createUsers };
