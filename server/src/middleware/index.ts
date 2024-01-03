import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import * as Models from '../models';
import { BoonHttpError } from '../common/errors';

const asyncMiddleware = require('./asyncMiddleware');

const  middlewareObj = {
    isLoggedIn: (req: Request, res: Response, next: NextFunction) => {
        if (req.isAuthenticated()) {
            return next();
        }
    
        // Return a `401 - Unauthorized error and let the client handle it.
        // Do not perform any redirects, as the backend does not control client-side routes.
        return res.status(401).end();
    },
    // Checks if the requesting user is the same as the viewed user.
    isUser: asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
        const loggedInUserId = req.isAuthenticated() ? (req.user as { id: string; }).id : null;
        if (loggedInUserId === null) {
            // Unauthenticated user.
            return res.status(401).end();
        }
    
        const viewedUserId = req.params.id;
        if (loggedInUserId != viewedUserId) {
            // Different user.
            return res.status(403).end();
        }
    
        return next();
    }),
    checkSprintOwnership: (req: Request, res: Response, next: NextFunction) => {
        checkOwnership(req, res, next, Models.Sprint, req.params.id, 'Sprint', '/sprints');
    },
    checkPostOwnership: (req: Request, res: Response, next: NextFunction) => {
        checkOwnership(req, res, next, Models.Post, req.params.id, 'Post', '/sprints');
    },
    checkProjectOwnership: (req: Request, res: Response, next: NextFunction) => {
        checkOwnership(req, res, next, Models.Project, req.params.id, 'Project', '/sprints');
    },
    checkCommentOwnership: (req: Request, res: Response, next: NextFunction) => {
        checkOwnership(req, res, next, Models.Comment, req.params.id, 'Comment', '/sprints');
    },
    checkLikeOwnership: (req: Request, res: Response, next: NextFunction) => {
        checkOwnership(req, res, next, Models.Like, req.params.id, 'Like', '/sprints');
    },
    handleErrors: (err: Error | null | undefined | string, req: Request, res: Response, next: NextFunction) => {
        if (err && err instanceof BoonHttpError) {
            return res.status(err.errorCode).send(err.toRawObject());
        } else {
            // If the error is not our custom object, let the default handler take
            // care of it.
            return next(err);
        }
    }
};

// Generic check ownership.
// TODO: remove references to flash and redirect (we don't handle them due to a custrom frontend).
function checkOwnership(req: Request, res: Response, next: NextFunction, Object: mongoose.PassportLocalModel<mongoose.Document>, id: string, objectName: string, redirectPath: string) {
    if (req.isAuthenticated()) {
        // TODO: Test these types
        Object.findById(id, (err: Error | null | undefined | string, object: { [key in string]: string; }) => {
            if (err || !object) {
                // req.flash('error', objectName + ' not found');
                res.redirect(redirectPath);
            } else {
                if (object.author === ((req.user as { _id: string })._id)) {
                    // req.object = object;
                    next();
                } else {
                    // req.flash('error', 'You do not have permission to edit this ' + objectName.toLowerCase());
                    res.redirect(redirectPath);
                }
            }
        });
    } else {
        // req.flash('error', 'You need to be logged in to do that');
        res.redirect('back');
    }
}

export default middlewareObj;
