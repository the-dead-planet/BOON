import { Request, Response } from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import Route from  '../common/route';
import { RequestMethod } from '../common/request';
import  { InternalError, UnauthenticatedError } from '../common/errors';
import ModelRegistry from '../common/model-registry';

export const getAuthRoutes = (_modelRegistry: ModelRegistry) => [
    new Route('/auth/whoami', RequestMethod.GET, async (req: Request) => {
        const user = req.isAuthenticated() ? req.user : null;
        return { statusCode: 200, data: { user } };
    }),

    new Route('/auth/register', RequestMethod.POST, async (req: Request) => {
        const User = mongoose.model('User');

        // TODO: Add check if username also already exists or not
        const user = await User.register(
            new User({
                username: req.body.email,
                publicName: req.body.username,
                role: req.body.role,
                country: req.body.country,
                joined: req.body.joined,
                left: req.body.left,
            }),
            req.body.password
        );

        // TODO: handle array of skills
        // .then(user =>
        //      req.body.skills.map(skill => user.skills.push(skill))
        //     res.status(201).send({
        //         error: false,
        //         user,
        //     })
        // )
        // .catch(err => res.status(500).send({ err }));

        // TODO: Add user ID to Team.users array

        // Authenticate the user after registration.
        // TODO: Add check if username also already exists or not
        await req.login(user as Express.User, (err) => {
            if (err) {
                throw err;
            }
        });

        // Send the created user object to the client.
        return { statusCode: 201, data: { user } };
    }),

    new Route(
        '/auth/login',
        RequestMethod.POST,
        async (req: Request, _res: Express.Response, err: string) => {
            const { user } = req;

            if (err) {
                throw new InternalError(err);
            }

            if (!user) {
                throw new UnauthenticatedError();
            }

            return { statusCode: 200, data: { user } };
        },
        passport.authenticate('local')
    ),

    new Route('/auth/logout', RequestMethod.POST, async (req: Request, _res: Response, _error: string) => {
        req.logout({}, () => null);
        return { statusCode: 200, data: undefined };
    }),
];
