import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import * as Models from '../models';
import { BoonHttpError } from '../common/errors';
import asyncMiddleware from './async-middleware';

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        return next();
    }

    // Return a `401 - Unauthorized error and let the client handle it.
    // Do not perform any redirects, as the backend does not control client-side routes.
    return res.status(401).end();
};

// Checks if the requesting user is the same as the viewed user.
export const isUser = asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
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
});

export const checkSprintOwnership = (req: Request, res: Response, next: NextFunction) => {
    checkOwnership(req, res, next, Models.sprintModel.findById, req.params.id, '/sprints');
};

export const checkPostOwnership = (req: Request, res: Response, next: NextFunction) => {
    checkOwnership(req, res, next, Models.postModel.findById, req.params.id, '/sprints');
};

export const checkProjectOwnership = (req: Request, res: Response, next: NextFunction) => {
    checkOwnership(req, res, next, Models.projectModel.findById, req.params.id, '/sprints');
};

export const checkCommentOwnership = (req: Request, res: Response, next: NextFunction) => {
    checkOwnership(req, res, next, Models.commentModel.findById, req.params.id, '/sprints');
};

export const checkLikeOwnership = (req: Request, res: Response, next: NextFunction) => {
    checkOwnership(req, res, next, Models.likeModel.findById, req.params.id, '/sprints');
};

export const handleErrors = (err: Error | null | undefined | string, req: Request, res: Response, next: NextFunction) => {
    if (err && err instanceof BoonHttpError) {
        return res.status(err.errorCode).send(err.toRawObject());
    } else {
        // If the error is not our custom object, let the default handler take
        // care of it.
        return next(err);
    }
};

function checkOwnership(
    req: Request,
    res: Response,
    next: NextFunction,
    // TODO: For some reason with arg "object: mongoose.PassportLocalModel<mongoose.Document>" ts still saw errors even though all schema interfaces extend mongoose.Document
    findById: (id: string, fn: (err: Error | null | undefined | string, object: { [key in string]: string; }) => void) => void,
    id: string,
    redirectPath: string
) {
    if (req.isAuthenticated()) {
        findById(id, (err: Error | null | undefined | string, object: { [key in string]: string; }) => {
            if (err || !object) {
                res.redirect(redirectPath);
            } else {
                if (object.author === ((req.user as { _id: string })._id)) {
                    next();
                } else {
                    res.redirect(redirectPath);
                }
            }
        });
    } else {
        res.redirect('back');
    }
}
