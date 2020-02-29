const mongoose = require('mongoose');
const middleware = require('../middleware');
const User = mongoose.model('User');
const UserAuth = mongoose.model('UserAuth');
const passport = require('passport');

// NOTE: delete is not supported user objects, as it would cause holes in
// stored data - all related objects (comments, posts) would have to disappear
// or lost information regarding the author.
// If an unregister-like functionality is needed, consider adding a
// `deactivated` field to the model.
module.exports = app => {
    // INDEX
    app.get(`/api/users`, async (req, res) => {
        User.find({})
            .populate('userAuth')
            .exec()
            .then(users => res.status(200).send(users))
            .catch(err => res.status(500).send({ err }));
    });

    // UPDATE
    app.put('/api/users/:id', middleware.isUser, async (req, res) => {
        const { id } = req.params;
        const user = {
            ...req.body,
            edited: Date.now(),
        };
        // TODO: throw if userAuth is modified
        User.findByIdAndUpdate(id, user)
            .then(user => {
                res.status(200).send({ error: false, user });
            })
            .catch(err => res.status(500).send({ err }));
    });
};
