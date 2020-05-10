// Base class for related model definitions.
// For now, only definitions on other models are supported.
// TODO: define all fields (e.g. Date, String) with this class.
class ModelField {
    constructor(modelName) {
        this.modelName = modelName;
    }
}

class SingleModelField extends ModelField {
    constructor(modelName) {
        super(modelName);
    }
}

class ManyModelField extends ModelField {
    constructor(modelName) {
        super(modelName);
    }
}

module.exports = { ModelField, SingleModelField, ManyModelField };
