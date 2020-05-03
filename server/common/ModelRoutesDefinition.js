// Single type exposing all data needed to define API routes for a model.
//
// For now, it requires manual work to keep it in sync with mongoose models.
// TODO: derive this from mongoose models, or derive mongoose models from this.
class ModelRoutesDefinition {
    constructor(modelName, relatedModels) {
        // Unique identifier of the model.
        this.modelName = modelName;

        // { referenceId: referenceModelName } mapping of related models.
        // Will be used, among others, to derive `populate` paths.
        this.relatedModels = relatedModels;
    }

    populatePaths() {
        // TODO: build recursive paths.
        return Object.keys(this.relatedModels);
    }
}

module.exports = ModelRoutesDefinition;
