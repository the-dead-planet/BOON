const mongoose = require('mongoose');

const { RequestKind, requestPreprocessor } = require('./request');
const { pathsInMongooseFormat } = require('./queries');
const { isLoggedIn } = require('../middleware');
const { NotFoundError } = require('./errors');

// Definition of a single API route.
//
// Exposes multiple static factory methods implementing common
// scenarios.
//
// `behaviour` is a function `(mongoose, request) => { statusCode: Number, data: Object }`.
// `mongoose` is injected as an argument to minimize boilerplate of route definitions and
// to aid testing - since `mongoose` is being injected, it can be easily mocked.
class Route {
    constructor(path, method, behaviour, middleware) {
        this.path = path;
        this.method = method;
        this.behaviour = behaviour;
        this.middleware = middleware;
    }

    // A default route fetching a single object.
    static getOne(modelId, modelRegistry) {
        const path = `/api/${modelId}s/:id`;
        const method = RequestKind.GET;

        const behaviour = (mongoose, req) => {
            const { params } = req;
            const mongooseModel = mongoose.model(modelId);
            const query = mongooseModel.findById(params.id);
            return query
                .populate(pathsInMongooseFormat(modelRegistry.populatePaths(modelId)))
                .exec()
                .then(sprint => ({ statusCode: 200, data: sprint }));
        };

        return new Route(path, method, behaviour);
    }

    // A default route fetching all objects of a given model.
    // TODO: extract common part of getOne and getAll into a separate method
    static getAll(modelId, modelRegistry) {
        const path = `/api/${modelId}s`;
        const method = RequestKind.GET;
        const behaviour = (mongoose, req) => {
            const mongooseModel = mongoose.model(modelId);
            const query = mongooseModel.find({});
            return query
                .populate(pathsInMongooseFormat(modelRegistry.populatePaths(modelId)))
                .exec()
                .then(sprints => ({ statusCode: 200, data: sprints }));
        };

        return new Route(path, method, behaviour);
    }

    // A default route creating a single object.
    static create(modelId, modelRegistry) {
        const path = `/api/${modelId}s`;
        const method = RequestKind.POST;

        const modelDefinition = modelRegistry.findDefinition(modelId);
        const postRequestPreprocessor = requestPreprocessor(modelDefinition.requestMappers[method] || {});

        const behaviour = async (mongoose, req) => {
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
            const query = mongooseModel.create(data);
            return query.then(obj => ({ statusCode: 201, data: obj }));
        };

        return new Route(path, method, behaviour, isLoggedIn);
    }

    // A default route updating a single object.
    static update(modelId, modelRegistry) {
        const path = `/api/${modelId}s/:id`;
        const method = RequestKind.PUT;

        const modelDefinition = modelRegistry.findDefinition(modelId);
        const putRequestPreprocessor = requestPreprocessor(modelDefinition.requestMappers[method] || {});

        const behaviour = (mongoose, req, res) => {
            const { params } = req;

            const data = putRequestPreprocessor(req);
            const mongooseModel = mongoose.model(modelId);
            const query = mongooseModel.findByIdAndUpdate(params.id, data);
            return query.then(obj => {
                obj.save();
                return { statusCode: 202, data: obj };
            });
        };

        return new Route(path, method, behaviour, isLoggedIn); // TODO: checkOwnership
    }

    // A default route deleting a single object and its children.
    // Not named `delete` to avoid conflicts with the builtin operator.
    static remove(modelId, modelRegistry) {
        const path = `/api/${modelId}s/:id`;
        const method = RequestKind.DELETE;

        // TODO: find related models, delete them too

        const behaviour = (mongoose, req, res) => {
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
        return async (req, res, next) => {
            try {
                const { statusCode = 200, data } = await this.behaviour(mongoose, req);
                return res.status(statusCode).send(data);
            } catch (err) {
                // Let the remaining middleware handle the error.
                // Unless some remaining middleware catches the error, this will result in a 500 response.
                next(err);
            }
        };
    }

    // Adds the route to `app`.
    connect(app) {
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
            case RequestKind.GET:
                return 'get';
            case RequestKind.POST:
                return 'post';
            case RequestKind.PUT:
                return 'put';
            case RequestKind.DELETE:
                return 'delete';
            default:
                throw new Error(`Unknown method: ${this.method}`);
        }
    }
}

module.exports = Route;
