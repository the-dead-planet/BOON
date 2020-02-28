const mongoose = require('mongoose');
const middleware = require('../middleware');
const User = mongoose.model('User');
const UserAuth = mongoose.model('UserAuth');
const passport = require('passport');

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

    // // TODO - add DESTROY
    // app.delete('/:id', (req, res) => {
    //     // Delete user and all related objects (users and users)
    //     User.findByIdAndDelete(req.params.id, function (err, user) {
    //         if (err || !user) {
    //             console.log('Deleting unsuccessful');
    //             req.flash('error', 'Sorry, this user does not exist!');
    //         } else {
    //             req.flash('success', 'User deleted');

    //             // TODO: find a more fancy solution to delete all related objects and handle async behavior
    //             // delete associated users
    //             User.deleteMany({ _id: req.object.users }, (err, user) => {
    //                 if (err || !user) {
    //                     req.flash('error', 'Sorry, this user does not exist');
    //                 } else {
    //                     req.flash('success', 'Related users deleted');
    //                 }
    //             });

    //             // delete associated users
    //             User.deleteMany({ _id: req.object.users }, (err, user) => {
    //                 if (err || !user) {
    //                     req.flash('error', 'Sorry, this user does not exist');
    //                 } else {
    //                     req.flash('success', 'Related users deleted');
    //                 }
    //             });

    //             return res.status(202).send({
    //                 error: false,
    //                 user,
    //             });
    //         }
    //     });
    // });
};
