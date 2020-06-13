// Declares a link to a single object.
// Can be used in post routes to associate a newly created object with an already existing one,
// e.g. upon creating a `Comment` one could link it to a specific `Post`.
class Link {
    constructor(modelId, objectId, modelProperty) {
        this.modelId = modelId;
        this.objectId = objectId;
        this.modelProperty = modelProperty;
    }
}

module.exports = Link;
