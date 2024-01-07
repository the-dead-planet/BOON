import mongoose from 'mongoose';
import { NextFunction, Request, Response } from 'express';
import * as core from "express-serve-static-core";
import { RequestMethod, requestPreprocessor } from './request';
import { pathsInMongooseFormat } from './queries';
import { isLoggedIn } from '../middleware';
import { NotFoundError } from './errors';
import Link from './link';
import ModelRegistry from './model-registry';

type Behaviour<T> = (req: Request, response: Response, error: string) => Promise<{ statusCode: number, data: T; }>;
type Middleware = (req: Request, res: Response, next: NextFunction) => void;

/**
 * Definition of a single API route.
 * Exposes multiple static factory methods implementing common scenarios.
 * `behaviour` is a function `(mongoose, request) => { statusCode: Number, data: Object }`.
 * `mongoose` is injected as an argument to minimize boilerplate of route definitions and to aid testing - since `mongoose` is being injected, it can be easily mocked.
 */
class Route<T>{
    public path: string;
    public method: RequestMethod;
    behaviour: Behaviour<T>;
    public middleware: Middleware | undefined;

    public constructor(path: string, method: RequestMethod, behaviour: Behaviour<T>, middleware?: Middleware) {
        this.path = path;
        this.method = method;
        this.behaviour = behaviour;
        this.middleware = middleware;
    }

    // A default route fetching a single object.
    static getOne<T>(modelId: string, modelRegistry: ModelRegistry) {
        const path = `/${modelId}s/:id`;
        const method = RequestMethod.GET;

        const behaviour = (req: Request) => {
            const { params } = req;
            const mongooseModel = mongoose.model(modelId);
            const query = mongooseModel.findById(params.id);
            return query
                .populate(pathsInMongooseFormat(modelRegistry.populatePaths(modelId)))
                .exec()
                .then((data) => ({ statusCode: 200, data: data as T }));
        };

        return new Route<T>(path, method, behaviour);
    }

    // A default route fetching all objects of a given model.
    // TODO: extract common part of getOne and getAll into a separate method
    static getAll(modelId: string, modelRegistry: ModelRegistry) {
        const path = `/${modelId}s`;
        const method = RequestMethod.GET;

        const behaviour = (_req: Request) => {
            const mongooseModel = mongoose.model(modelId);
            const query = mongooseModel.find({});
            return query
                .populate(pathsInMongooseFormat(modelRegistry.populatePaths(modelId)))
                .exec()
                .then((data) => ({ statusCode: 200, data }));
        };

        return new Route(path, method, behaviour);
    }

    // A default route creating a single object.
    static create(modelId: string, modelRegistry: ModelRegistry) {
        const path = `/${modelId}s`;
        const method = RequestMethod.POST;

        const modelDefinition = modelRegistry.findDefinition(modelId);
        const postRequestPreprocessor = requestPreprocessor(modelDefinition.requestMappers[method] || {});

        const behaviour = async (req: Request) => {
            const data = postRequestPreprocessor(req);
            // Check if all related objects exist.
            await Promise.all(
                Object.entries(modelDefinition.fields)
                    .filter(([_, field]) => field.required())
                    .map(async ([propertyName, field]) => {
                        const relatedModel = mongoose.model(field.modelName);
                        const providedRelatedId = data[propertyName];
                        if (!relatedModel) {
                            throw new Error(`Unknown model: ${field.modelName}`);
                        }
                        if ((await relatedModel.findById(providedRelatedId).exec()) == null) {
                            throw new NotFoundError(field.modelName, providedRelatedId);
                        }
                    })
            );

            const mongooseModel = mongoose.model(modelId);
            const obj = await mongooseModel.create(data);

            // Link the object to related objects.
            await Promise.all(
                Object.entries(data)
                    .filter(([_, value]) => value instanceof Link)
                    .map(async ([_key, link]) => {
                        const relatedModel = mongoose.model((link as Link).modelId);
                        const relatedObject = await relatedModel.findById((link as Link).objectId).exec() as { [key in string]: string[]} & mongoose.Document;
                        relatedObject?.[(link as Link).modelProperty].push(obj._id);
                        await relatedObject?.save();
                    })
            );

            return { statusCode: 201, data: obj };
        };

        return new Route(path, method, behaviour, isLoggedIn);
    }

    // A default route updating a single object.
    static update(modelId: string, modelRegistry: ModelRegistry) {
        const path = `/${modelId}s/:id`;
        const method = RequestMethod.PUT;

        const modelDefinition = modelRegistry.findDefinition(modelId);
        const putRequestPreprocessor = requestPreprocessor(modelDefinition.requestMappers[method] || {});

        const behaviour = (req: Request, _res: Response) => {
            const { params } = req;

            const data = putRequestPreprocessor(req);
            const mongooseModel = mongoose.model(modelId);
            const query = mongooseModel.findByIdAndUpdate(params.id, data);
            return query.then((obj) => {
                obj?.save();
                return { statusCode: 202, data: obj };
            });
        };

        return new Route(path, method, behaviour, isLoggedIn); // TODO: checkOwnership
    }

    // A default route deleting a single object and its children.
    // Not named `delete` to avoid conflicts with the builtin operator.
    static remove(modelId: string, _modelRegistry: ModelRegistry) {
        const path = `/${modelId}s/:id`;
        const method = RequestMethod.DELETE;

        // TODO: find related models, delete them too

        const behaviour = (req: Request) => {
            const { params } = req;

            const mongooseModel = mongoose.model(modelId);
            const query = mongooseModel.findByIdAndDelete(params.id);
            return query.then(() => ({ statusCode: 202, data: params.id }));
        };

        return new Route(path, method, behaviour, isLoggedIn); // TODO: checkOwnership
    }

    // Handles all boilerplate of turning a behaviour function into an express-compatible callback.
    // Guarantees that a response is returned to the client.
    decoratedBehaviour() {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { statusCode = 200, data } = await this.behaviour(req, res, '');
                return res.status(statusCode).send(data);
            } catch (err) {
                // Let the remaining middleware handle the error.
                // Unless some remaining middleware catches the error, this will result in a 500 response.
                next(err);
            }
        };
    }

    // Adds the route to `app`.
    connect(app: core.Express) {
        // Behaviour with all arguments not provided by the request itself preapplied.
        // Matches the signature expected by express.
        const preappliedBehaviour = this.decoratedBehaviour();
        const expressProperty = this.expressPropertyMatchingMethod();
        if (this.middleware) {
            app[expressProperty](this.path, this.middleware, preappliedBehaviour);
        } else {
            app[expressProperty](this.path, preappliedBehaviour);
        }
    }

    // Property to invoke on the `app` object.
    // For example, to define a `GET` route, one calls `app.get`.
    expressPropertyMatchingMethod() {
        switch (this.method) {
            case RequestMethod.GET:
                return 'get';
            case RequestMethod.POST:
                return 'post';
            case RequestMethod.PUT:
                return 'put';
            case RequestMethod.DELETE:
                return 'delete';
            default:
                throw new Error(`Unknown method: ${this.method}`);
        }
    }
}

export default Route;
