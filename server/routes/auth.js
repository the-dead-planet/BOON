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

    app.post('/api/auth/register', (req, res, next) => {
        // Wrap the code with an empty promise to make the inner code `async` and handle potential errors.
        return Promise.resolve()
            .then(async () => {
                // Create user with login credentials only
                const userAuth = await UserAuth.register(
                    new UserAuth({
                        username: req.body.email,
                    }),
                    req.body.password
                );

                // TODO: Add check if username also already exists or not
                const user = await User.create(
                    new User({
                        userAuth: userAuth._id,
                        username: req.body.username,
                        team: req.body.team,
                    })
                );

                // Authenticate the user after registration.
                req.login(userAuth, err => {
                    if (err) {
                        throw err;
                    } else {
                        // Send the created user object to the client.
                        return res.status(201).send({
                            user,
                        });
                    }
                });
            })
            .catch(next);
    });

    // POST - Log in
    app.post('/api/auth/login', passport.authenticate('local'), (req, res) => {
        const { user } = req;
        return res.status(200).send({
            user,
        });
    });

    // Log Out
    app.post('/api/auth/logout', (req, res) => {
        req.logout();
        return res.status(200).send();
    });
};
