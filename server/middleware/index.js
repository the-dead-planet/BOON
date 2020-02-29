// const models = require('../common/models');
var Sprint = require('../models/Sprint');
var Project = require('../models/Project');
var Post = require('../models/Post');
var Comment = require('../models/Comment');
var Like = require('../models/Like');
const User = require('../models/User');
var BoonHttpError = require('../common/errors').BoonHttpError;

const asyncMiddleware = require('./asyncMiddleware');

var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    // Return a `401 - Unauthorized error and let the client handle it.
    // Do not perform any redirects, as the backend does not control client-side routes.
    return res.status(401).end();
};

// Checks if the requesting user is the same as the viewed user.
middlewareObj.isUser = asyncMiddleware(async (req, res, next) => {
    const loggedInUserAuthId = req.isAuthenticated() ? req.user.id : null;
    if (loggedInUserAuthId === null) {
        // Unauthenticated user.
        return res.status(401).end();
    }

    // The object stored under `req.user` is a `UserAuth` instance.
    // Fetch the related `User` instance.
    // TODO - consider storing userId in the `userAuth` model.
    const loggedInUser = await User.findOne({ userAuth: loggedInUserAuthId });
    const viewedUserId = req.params.id;
    if (loggedInUser._id != viewedUserId) {
        // Different user.
        return res.status(403).end();
    }

    return next();
});

middlewareObj.checkSprintOwnership = function(req, res, next) {
    checkOwnership(req, res, next, Sprint, req.params.id, 'Sprint', '/sprints');
};

middlewareObj.checkPostOwnership = function(req, res, next) {
    checkOwnership(req, res, next, Post, req.params.id, 'Post', '/sprints');
};

middlewareObj.checkProjectOwnership = function(req, res, next) {
    checkOwnership(req, res, next, Project, req.params.id, 'Project', '/sprints');
};

middlewareObj.checkCommentOwnership = function(req, res, next) {
    checkOwnership(req, res, next, Comment, req.params.id, 'Comment', '/sprints');
};

middlewareObj.checkLikeOwnership = function(req, res, next) {
    checkOwnership(req, res, next, Like, req.params.id, 'Like', '/sprints');
};

// Generic check ownershi
function checkOwnership(req, res, next, Object, id, objectName, redirectPath) {
    if (req.isAuthenticated()) {
        Object.findById(id, function(err, object) {
            if (err || !object) {
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

middlewareObj.handleErrors = function handleErrors(err, req, res, next) {
    if (err && err instanceof BoonHttpError) {
        return res.status(err.errorCode).send(err.toRawObject());
    } else {
        // If the error is not our custom object, let the default handler take
        // care of it.
        return next(err);
    }
};

module.exports = middlewareObj;
