const mongoose = require('mongoose');

const UserAuth = mongoose.model('UserAuth');
const User = mongoose.model('User');

const createUser = ({ email, password, team }) =>
    UserAuth.register(UserAuth({ username: email }), password).then(userAuth =>
        User.create(User({ userAuth: userAuth._id, username: email, team }))
    );

const createUsers = users => Promise.all(users.map(user => createUser(user)));

module.exports = { createUser, createUsers };
