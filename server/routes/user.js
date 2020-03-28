const mongoose = require('mongoose');
const middleware = require('../middleware');
const User = mongoose.model('User');
const passport = require('passport');

// NOTE: delete is not supported user objects, as it would cause holes in
// stored data - all related objects (comments, posts) would have to disappear
// or lose information about the author.
// If an unregister-like functionality is needed, consider adding a
// `deactivated` field to the model.
module.exports = app => {
    // INDEX
    // TODO - use the `NotFoundError` class instead of `res.status(500)` (like in routes/like.js)
    app.get(`/api/users`, async (req, res) => {
        User.find({})
            .exec()
            .then(users => res.status(200).send(users))
            .catch(err => res.status(500).send({ err }));
    });

    app.get(`/api/users/:id`, async (req, res) => {
        User.findById(req.params.id)
            .then(user => res.status(200).send(user))
            .catch(err =>
                res.status(404).send({
                    error: `User ${req.params.id} not found`,
                })
            );
    });

    // UPDATE
    app.put('/api/users/:id', middleware.isUser, async (req, res) => {
        const { id } = req.params;
        const user = {
            ...req.body,
            edited: Date.now(),
        };
        User.findByIdAndUpdate(id, user)
            .then(user => {
                res.status(200).send({ error: false, user });
            })
            .catch(err =>
                res.status(404).send({
                    error: `User ${req.params.id} not found`,
                })
            );
    });
};
