const mongoose = require('mongoose');
const middleware = require('../middleware');
const User = mongoose.model('User');
const UserAuth = mongoose.model('UserAuth');
const passport = require('passport');

module.exports = app => {
    // Returns the logged in user, or `null` if not logged in.
    app.get('/api/auth/whoami', (req, res) => {
        const user = req.isAuthenticated() ? req.user : null;
        return res.status(200).send({ user });
    });

    // TODO: sort out a nicer way to write this with promises
    app.post('/api/auth/register', (req, res) => {
        // Create user with login credentials only
        return UserAuth.register(
            new UserAuth({
                username: req.body.email,
            }),
            req.body.password
        )
            .then(userAuth => {
                // TODO: Add check if username also already exists or not
                return User.create(
                    new User({
                        userAuth: userAuth._id,
                        username: req.body.username,
                        team: req.body.team,
                    })
                ).then(user => {
                    // Authenticate the user after registration.
                    req.login(userAuth, err => console.log({ err }));

                    // Send the created user object to the client.
                    return res.status(201).send({
                        error: false,
                        user,
                    });
                });
            })
            .catch(err => res.status(500).send({ err }));
    });

    // POST - Log in
    app.post('/api/auth/login', passport.authenticate('local'), (req, res) => {
        let user = req.user;
        return res.status(201).send({
            error: false,
            user,
        });
    });

    // Log Out
    app.post('/api/auth/logout', (req, res) => {
        let user = req.user;
        req.logout();
        return res.status(201).send({
            error: false,
            user,
        });
    });
};
