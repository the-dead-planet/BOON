const mongoose = require('mongoose');
const middleware = require('../middleware');
const User = mongoose.model('User');
const passport = require('passport');

module.exports = app => {
    // INDEX
    app.get(`/api/users`, async (req, res) => {
        User.find({})
            .populate('comments')
            .exec((err, users) => {
                if (err) {
                    console.log('Error getting all users from the db: ', err);
                } else {
                    return res.status(200).send(users);
                }
            });
    });

    // Returns the logged in user, or `null` if not logged in.
    app.get('/api/whoami', (req, res) => {
        const user = req.isAuthenticated() ? req.user : null;
        return res.status(200).send(user);
    });

    // POST
    app.post('/register', (req, res) => {
        User.register(
            new User({
                username: req.body.username,
                email: req.body.email,
                team: req.body.team,
            }),
            req.body.password,
            (err, user) => {
                if (err) {
                    console.log('Cannot register: ' + err);
                    req.flash('error', err.message);
                }

                passport.authenticate('local')(req, res, () => {
                    req.flash('success', 'Welcome to BOON!, ' + user.username);
                    return res.status(201).send({
                        error: false,
                        user,
                    });
                });
            }
        );
    });

    app.post(
        '/login',
        passport.authenticate('local', {
            // success commented out as successful route is moved to function(req, res) in order to use current username from req
            // successRedirect: "/sprints",
            // successFlash: "Welcome back!"
            failureRedirect: '/login',
            // failureFlash: "Wrong username or password"
            failureFlash: true,
        }),
        (req, res) => {
            let user = req.user;
            req.flash('success', 'Welcome back, ' + user.username);
            return res.status(201).send({
                error: false,
                user,
            });
        }
    );

    // Log Out
    app.get('/logout', (req, res) => {
        let user = req.user;
        req.logout();
        req.flash('success', 'Logged you out, ' + user.username);
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

    // DESTROY
    app.delete('/:id', middleware.checkSprintOwnership, (req, res) => {
        // Delete user and all related objects (users and users)
        User.findByIdAndDelete(req.params.id, function(err, user) {
            if (err || !user) {
                console.log('Deleting unsuccessful');
                req.flash('error', 'Sorry, this user does not exist!');
            } else {
                req.flash('success', 'User deleted');

                // TODO: find a more fancy solution to delete all related objects and handle async behavior
                // delete associated users
                User.deleteMany({ _id: req.object.users }, (err, user) => {
                    if (err || !user) {
                        req.flash('error', 'Sorry, this user does not exist');
                    } else {
                        req.flash('success', 'Related users deleted');
                    }
                });

                // delete associated users
                User.deleteMany({ _id: req.object.users }, (err, user) => {
                    if (err || !user) {
                        req.flash('error', 'Sorry, this user does not exist');
                    } else {
                        req.flash('success', 'Related users deleted');
                    }
                });

                return res.status(202).send({
                    error: false,
                    user,
                });
            }
        });
    });
};
