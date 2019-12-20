var express = require('express');
var router = express.Router();
var Sprint = require('../models/sprint');
var Post = require('../models/post');
var Comment = require('../models/comment');
var User = require('../models/user');
var middleware = require('../middleware');

// INDEX route
router.get('/', function(req, res) {
    Sprint.find({}, function(err, allSprints) {
        if (err) {
            console.log('Error getting all sprints from the db: ' + err);
        } else {
            res.render('sprints/index', {
                sprints: allSprints,
            });
        }
    });
});

// NEW
router.get('/new', middleware.isLoggedIn, function(req, res) {
    res.render('sprints/new');
});

// CREATE
router.post('/', middleware.isLoggedIn, function(req, res) {
    var number = req.body.number;
    var name = req.body.name;
    var dateFrom = req.body.dateFrom;
    var dateTo = req.body.dateTo;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username,
    };
    var created = req.body.created;

    var newSprint = {
        number: number,
        name: name,
        dateFrom: dateFrom,
        dateTo: dateTo,
        description: description,
        author: author,
        created: created,
    };
    console.log(newSprint.number);
    // Create a new sprint and save it to DB
    Sprint.create(newSprint, function(err, sprint) {
        if (err || !sprint) {
            req.flash('error', 'Something went wrong');
            console.log('Error creating new sprint: ' + error);
        } else {
            console.log('New sprint created:');
            console.log(sprint);
        }
    });

    // redirect
    req.flash('success', 'Sprint successfully created');
    res.redirect('/sprints');
});

// Show sprint
router.get('/:id', function(req, res) {
    Sprint.findById(req.params.id)
        .populate({
            path: 'posts comments',
            populate: {
                path: 'comments',
            },
        })
        .exec(function(err, sprint) {
            if (err || !sprint) {
                console.log(err);
                req.flash('error', 'Sorry, this sprint does not exist');
                res.redirect('/sprints');
                console.log('Could not find id error: ' + err);
            } else {
                res.render('sprints/show', { sprint: sprint });
            }
        });
});

// EDIT
router.get('/:id/edit', middleware.isLoggedIn, middleware.checkSprintOwnership, function(req, res) {
    res.render('sprints/edit', { sprint: req.object });
});

// UPDATE ROUTE
router.put('/:id', middleware.checkSprintOwnership, function(req, res) {
    // find and update the correct campground
    Sprint.findByIdAndUpdate(req.params.id, req.body.sprint, function(err, updatedSprint) {
        if (err || !updatedSprint) {
            req.flash('error', 'Sorry, this sprint does not exist!');
            res.redirect('/sprints');
        } else {
            //redirect somewhere(show page)
            req.flash('success', 'Sprint successfully updated');
            res.redirect('/sprints/' + req.params.id);
            console.log(req.params.dateFrom);
        }
    });
});

// DESTROY ROUTE
router.delete('/:id', middleware.checkSprintOwnership, function(req, res) {
    // Delete sprint and all related objects (posts and comments)
    Sprint.findByIdAndRemove(req.params.id, function(err, sprint) {
        if (err || !sprint) {
            req.flash('error', 'Sorry, this sprint does not exist!');
            res.redirect('/sprints');
        } else {
            req.flash('success', 'Sprint deleted');

            // delete associated posts
            Post.deleteMany({ _id: req.object.posts }, function(err, post) {
                if (err || !post) {
                    req.flash('error', 'Sorry, this post does not exist');
                    res.redirect('back');
                } else {
                    req.flash('success', 'Related posts deleted');
                }
            });

            // delete associated comments
            Comment.deleteMany({ _id: req.object.comments }, function(err, comment) {
                if (err || !comment) {
                    req.flash('error', 'Sorry, this comment does not exist');
                } else {
                    req.flash('success', 'Related comments deleted');
                }
            });

            res.redirect('/sprints');
        }
    });
});

module.exports = router;
