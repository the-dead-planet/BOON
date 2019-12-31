var express = require('express');
// mergeParams is necessary to find the Id of a post when posting a new post
var router = express.Router({ mergeParams: true });
var Sprint = require('../models/sprint');
var Post = require('../models/post');
var Comment = require('../models/comment');
var User = require('../models/user');
var middleware = require('../middleware');

router.get('/new', middleware.isLoggedIn, function(req, res) {
    Sprint.findById(req.params.id, function(err, sprint) {
        if (err || !sprint) {
            req.flash('error', 'Sorry, this sprint does not exist!');
            res.redirect('/sprints');
            console.log('Test');
        } else {
            res.render('posts/new', { sprint: sprint });
        }
    });
});

// Post and get back to the sprint page
router.post('/', middleware.isLoggedIn, function(req, res) {
    Sprint.findById(req.params.id, function(err, sprint) {
        if (err || !sprint) {
            req.flash('error', 'Sorry, this sprint does not exist!');
            res.redirect('/sprints');
        } else {
            Post.create(req.body.post, function(err, post) {
                if (err) {
                    req.flash('error', 'Something went wrong');
                    console.log(err);
                } else {
                    // add username and id to post
                    // user must be logged in (middleware isLoggedIn) - this is assured
                    post.author.id = req.user._id;
                    post.author.username = req.user.username;
                    // Save post
                    post.save();

                    sprint.posts.push(post);
                    sprint.save();
                    req.flash('success', 'Post added successfully');
                    res.redirect('/sprints/' + sprint._id);
                }
            });
        }
    });
});

router.get('/:post_id/edit', middleware.isLoggedIn, middleware.checkPostOwnership, function(req, res) {
    res.render('posts/edit', {
        sprint_id: req.params.id,
        post: req.object,
    });
});

// UPDATE ROUTE
router.put('/:post_id', middleware.checkPostOwnership, function(req, res) {
    Post.findByIdAndUpdate(req.params.post_id, req.body.post, function(err, post) {
        if (err) {
            req.flash('error', 'Something went wrong');
            res.redirect('back');
        } else {
            req.flash('success', 'Post successfully updated');
            res.redirect('/sprints/' + req.params.id);
        }
    });
});

// DESTROY ROUTE
router.delete('/:post_id', middleware.checkPostOwnership, function(req, res) {
    Post.findByIdAndRemove(req.params.post_id, function(err, post) {
        if (err || !post) {
            req.flash('error', 'Sorry, this post does not exist');
            res.redirect('back');
        } else {
            req.flash('success', 'Post successfully deleted');
            res.redirect('/sprints/' + req.params.id);
        }
    });
});

module.exports = router;
