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

    // Returns the logged in user, or `null` if not logged in.
    app.get('/api/whoami', (req, res) => {
        const user = req.isAuthenticated() ? req.user : null;
        return res.status(200).send(user);
    });

    // TODO: sort out a nicer way to write this with promises
    app.post('/register', (req, res) => {
        console.log(req.body);
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
                ).then(user =>
                    // Send the created user object to the client.
                    res.status(201).send({
                        error: false,
                        user,
                    })
                );
            })
            .catch(err => res.status(500).send({ err }));
    });

    // POST - Log in
    app.post('/login', passport.authenticate('local'), (req, res) => {
        console.log(req.user);
        let user = req.user;
        return res.status(201).send({
            error: false,
            user,
        });
    });

    // Log Out
    app.get('/logout', (req, res) => {
        let user = req.user;
        req.logout();
        return res.status(201).send({
            error: false,
            user,
        });
    });

    // TODO: update
    // // UPDATE
    // app.put("/api/users/:id", middleware.checkSprintOwnership, (req, res) => {
    //     User.findByIdAndUpdate(req.params.id, req.body.user, (err, user) => {
    //        if(err || !user){
    //            console.log("Error updating user: ", err);
    //            req.flash("error", "Sorry, this user does not exist!");
    //        } else {
    //            console.log("User updated ", req.params.dateFrom);
    //            req.flash("success", "User successfully updated");
    //            return res.status(202).send({
    //                 error: false,
    //                 user
    //             });
    //        }
    //     });
    // });

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
