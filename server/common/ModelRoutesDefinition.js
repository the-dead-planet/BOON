// Single type exposing all data needed to define API routes for a model.
//
// For now, it requires manual work to keep it in sync with mongoose models.
// TODO: derive this from mongoose models, or derive mongoose models from this.
//
// Merely a plain definition, exposing no complex methods. Core logi is exposed through
// `ModelRegistry`.
// TODO: convert into a regular interface once TypeScript is supported.
class ModelRoutesDefinition {
    constructor(relatedModels) {
        // { referenceId: referenceModelName } mapping of related models.
        // Will be used, among others, to derive `populate` paths.
        this.relatedModels = relatedModels;
    }
}

module.exports = ModelRoutesDefinition;
