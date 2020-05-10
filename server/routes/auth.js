const passport = require('passport');
const Route = require('../common/Route');
const { RequestKind } = require('../common/request');

module.exports = modelRegistry => [
    new Route('/api/auth/whoami', RequestKind.GET, (mongoose, req, res) => {
        const user = req.isAuthenticated() ? req.user : null;
        return res.status(200).send({ user });
    }),

    new Route('/api/auth/register', RequestKind.POST, async (mongoose, req, res, next) => {
        try {
            const User = mongoose.model('User');

            // TODO: Add check if username also already exists or not
            const user = await User.register(
                new User({
                    username: req.body.email,
                    publicName: req.body.publicName,
                    role: req.body.role,
                    country: req.body.country,
                    joined: req.body.joined,
                    left: req.body.left,
                }),
                req.body.password
            );

            // TODO: handle array of skills
            // .then(user =>
            //      req.body.skills.map(skill => user.skills.push(skill))
            //     res.status(201).send({
            //         error: false,
            //         user,
            //     })
            // )
            // .catch(err => res.status(500).send({ err }));

            // TODO: Add user ID to Team.users array

            // Authenticate the user after registration.
            // TODO: Add check if username also already exists or not
            await req.login(user, err => {
                if (err) {
                    throw err;
                }
            });

            // Send the created user object to the client.
            return res.status(201).send({
                user,
            });
        } catch (err) {
            next(err);
        }
    }),

    new Route(
        '/api/auth/login',
        RequestKind.POST,
        (mongoose, req, res) => {
            const { user } = req;
            return res.status(200).send({
                user,
            });
        },
        passport.authenticate('local')
    ),

    new Route('/api/auth/logout', RequestKind.POST, (mongoose, req, res) => {
        req.logout();
        return res.status(200).send();
    }),
];
