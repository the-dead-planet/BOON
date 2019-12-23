var Sprint = require('../models/Sprint');
var Post = require('../models/Post');
var Comment = require('../models/Comment');

var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    req.flash('error', 'You need to be logged in to do that');
    res.redirect('/login');
};

middlewareObj.checkSprintOwnership = function(req, res, next) {
    checkOwnership(req, res, next, Sprint, req.params.id, 'Sprint', '/posts');
};

middlewareObj.checkPostOwnership = function(req, res, next) {
    checkOwnership(req, res, next, Post, req.params.post_id, 'Post', '/posts');
};

middlewareObj.checkCommentOwnership = function(req, res, next) {
    checkOwnership(req, res, next, Comment, req.params.comment_id, 'Comment', '/posts');
};

// Generic check ownershi
function checkOwnership(req, res, next, Object, id, objectName, redirectPath) {
    if (req.isAuthenticated()) {
        Object.findById(id, function(err, object) {
            if (err || !object) {
                console.log(err);
                req.flash('error', objectName + ' not found');
                res.redirect(redirectPath);
            } else {
                if (object.author.id.equals(req.user._id)) {
                    req.object = object;
                    next();
                } else {
                    req.flash('error', 'You do not have permission to edit this ' + objectName.toLowerCase());
                    res.redirect(redirectPath);
                }
            }
        });
    } else {
        req.flash('error', 'You need to be logged in to do that');
        res.redirect('back');
    }
}

module.exports = middlewareObj;
