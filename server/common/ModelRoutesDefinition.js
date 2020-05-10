const RequestKind = require('./request');
const { ModelField } = require('./ModelField');

// Single type exposing all data needed to define API routes for a model.
//
// For now, it requires manual work to keep it in sync with mongoose models.
// TODO: derive this from mongoose models, or derive mongoose models from this.
//
// Merely a plain definition, exposing no complex methods. Core logi is exposed through
// `ModelRegistry`.
// TODO: convert into a regular interface once TypeScript is supported.
class ModelRoutesDefinition {
    constructor(fields, requestMappers) {
        fields = fields || {};
        requestMappers = requestMappers || {};

        Object.values(fields).forEach(modelField => {
            if (!(modelField instanceof ModelField)) {
                throw new Error(`fields must only contain ModelFields. Got: ${modelField}`);
            }
        });

        // { referenceId: ModelField } mapping of related models.
        // Will be used, among others, to derive `populate` paths.
        this.fields = fields;

        // { RequestKind: { propertyId: mapper } } mapping of per-request mappers.
        // By default, each request's `body` object will be passed directly to mongoose as
        // an object's definition. A mapper can be used to preprocess the `body` before passing
        // it to mongoose.
        // For example, one could add a `createdAt` field to each created object by definining
        // ```
        // requestMappers = {
        //   [RequestKind.POST]: { createdAt: req => Date.now() }
        // }
        // ```
        // Only PUT and POST request kinds are supported.
        // TODO: enforce on type level once TS is supported
        this.requestMappers = requestMappers;
    }
}

module.exports = ModelRoutesDefinition;
