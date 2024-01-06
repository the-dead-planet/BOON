/**
 * Base class for related model definitions.
 * For now, only definitions on other models are supported.
 */
// TODO: define all fields (e.g. Date, String) with this class.
class ModelField {
    public modelName: string;

    public constructor(modelName: string) {
        this.modelName = modelName;
    }
}

class SingleModelField extends ModelField {
    public constructor(modelName: string) {
        super(modelName);
    }

    public required(): boolean {
        return true;
    }
}

class ManyModelField extends ModelField {
    public constructor(modelName: string) {
        super(modelName);
    }

    public required(): boolean {
        return false;
    }
}

export { ModelField, SingleModelField, ManyModelField };
