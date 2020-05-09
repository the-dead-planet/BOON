const mongoose = require('mongoose');

const { RequestKind, requestPreprocessor } = require('./request');
const { pathsInMongooseFormat } = require('./queries');
const { isLoggedIn } = require('../middleware');

// Definition of a single API route.
//
// Exposes multiple static factory methods implementing common
// scenarios.
//
// `behaviour` is a void function taking a `(mongoose, req, res)` triple as an argument.
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

        const behaviour = mongoose => (req, res) => {
            const { params } = req;
            const mongooseModel = mongoose.model(modelId);
            const query = mongooseModel.findById(params.id);
            return query
                .populate(pathsInMongooseFormat(modelRegistry.populatePaths(modelId)))
                .exec()
                .then(sprint => res.status(200).send(sprint))
                .catch(err => res.status(500).send({ err }));
        };

        return new Route(path, method, behaviour);
    }

    // A default route fetching all objects of a given model.
    // TODO: extract common part of getOne and getAll into a separate method
    static getAll(modelId, modelRegistry) {
        const path = `/api/${modelId}s`;
        const method = RequestKind.GET;
        const behaviour = (mongoose, req, res) => {
            const mongooseModel = mongoose.model(modelId);
            const query = mongooseModel.find({});
            return query
                .populate(pathsInMongooseFormat(modelRegistry.populatePaths(modelId)))
                .exec()
                .then(sprint => res.status(200).send(sprint))
                .catch(err => res.status(500).send({ err }));
        };

        return new Route(path, method, behaviour);
    }

    // A default route creating a single object.
    static create(modelId, modelRegistry) {
        const path = `/api/${modelId}s`;
        const method = RequestKind.POST;

        const modelDefinition = modelRegistry.findDefinition(modelId);
        const postRequestPreprocessor = requestPreprocessor(modelDefinition.requestMappers[method] || {});

        const behaviour = (mongoose, req, res) => {
            const data = postRequestPreprocessor(req);
            const mongooseModel = mongoose.model(modelId);
            const query = mongooseModel.create(data);
            return query.then(obj => res.status(201).send({ obj })).catch(err => res.status(500).send({ err }));
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

            const data = postRequestPreprocessor(req);
            const mongooseModel = mongoose.model(modelId);
            const query = mongooseModel.findByIdAndUpdate(params.id, data);
            return query
                .then(obj => obj.save().then(() => res.status(202).send({ obj })))
                .catch(err => res.status(500).send({ err }));
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
            return query.then(obj => res.status(202).send([params.id])).catch(err => res.status(500).send({ err }));
        };

        return new Route(path, method, behaviour, isLoggedIn); // TODO: checkOwnership
    }

    // Adds the route to `app`.
    connect(app) {
        // Behaviour with all arguments not provided by the request itself preapplied.
        // Matches the signature expected by express.
        const preappliedBehaviour = (req, res) => this.behaviour(mongoose, req, res);
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
