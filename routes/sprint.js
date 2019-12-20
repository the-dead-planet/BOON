const mongoose = require('mongoose');
const middleware = require('../middleware');
const Sprint = mongoose.model('Sprint');

module.exports = app => {
    app.get('/', async (req, res) => {
        res.send("BOON API's: /api/sprints  /api/posts  /api/comments  /api/users");
    });

    // INDEX
    app.get(`/api/sprints`, async (req, res) => {
        Sprint.find({})
            .populate({
                path: 'posts comments',
                populate: {
                    path: 'comments',
                },
            })
            .exec((err, sprints) => {
                if (err) {
                    console.log('Error getting all sprints from the db: ', err);
                } else {
                    return res.status(200).send(sprints);
                }
            });
    });

    // POST
    app.post('/api/sprints', middleware.isLoggedIn, (req, res) => {
        let sprint = {
            number: req.body.number,
            name: req.body.name,
            dateFrom: req.body.dateFrom,
            dateTo: req.body.dateTo,
            description: req.body.description,
            author: {
                id: req.user._id,
                username: req.user.username,
            },
            created: req.body.created,
        };

        // Create a new sprint and save it to DB
        Sprint.create(sprint, (err, sprint) => {
            if (err || !sprint) {
                console.log('Error creating new sprint: ', err);
                req.flash('error', 'Something went wrong');
            } else {
                console.log('New sprint created:', err);
                req.flash('success', 'Sprint successfully created');
                return res.status(201).send({
                    error: false,
                    sprint,
                });
            }
        });
    });

    // UPDATE
    app.put('/api/sprints/:id', middleware.checkSprintOwnership, (req, res) => {
        Sprint.findByIdAndUpdate(req.params.id, req.body.sprint, (err, sprint) => {
            if (err || !sprint) {
                console.log('Error updating sprint: ', err);
                req.flash('error', 'Sorry, this sprint does not exist!');
            } else {
                console.log('Sprint updated ', req.params.dateFrom);
                req.flash('success', 'Sprint successfully updated');
                return res.status(202).send({
                    error: false,
                    sprint,
                });
            }
        });
    });

    // DESTROY
    app.delete('/:id', middleware.checkSprintOwnership, (req, res) => {
        // Delete sprint and all related objects (posts and comments)
        Sprint.findByIdAndDelete(req.params.id, function(err, sprint) {
            if (err || !sprint) {
                console.log('Deleting unsuccessful');
                req.flash('error', 'Sorry, this sprint does not exist!');
            } else {
                req.flash('success', 'Sprint deleted');

                // TODO: find a more fancy solution to delete all related objects and handle async behavior
                // delete associated posts
                Post.deleteMany({ _id: req.object.posts }, (err, post) => {
                    if (err || !post) {
                        req.flash('error', 'Sorry, this post does not exist');
                    } else {
                        req.flash('success', 'Related posts deleted');
                    }
                });

                // delete associated comments
                Comment.deleteMany({ _id: req.object.comments }, (err, comment) => {
                    if (err || !comment) {
                        req.flash('error', 'Sorry, this comment does not exist');
                    } else {
                        req.flash('success', 'Related comments deleted');
                    }
                });

                return res.status(202).send({
                    error: false,
                    sprint,
                });
            }
        });
    });
};
