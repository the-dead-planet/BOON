/**
 * Declares a link to a single object.
 * Can be used in post routes to associate a newly created object with an already existing one,
 * e.g. upon creating a `Comment` one could link it to a specific `Post`.
 */
class Link {
    public modelId: string;
    public objectId: string;
    public modelProperty: string;

    constructor(modelId: string, objectId: string, modelProperty: string) {
        this.modelId = modelId;
        this.objectId = objectId;
        this.modelProperty = modelProperty;
    }
}

export default Link;
