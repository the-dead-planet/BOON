// A container for models used in the app.
//
// Register is filled by individual definitions, each identified by a unique id.
// Each individual definition may depend on another model, but it cannot hold a direct reference to its definition,
// as that would have caused circular dependencies.
// `ModelRegistry` solves that problem by holding individual definitions and connecting
// relevant objects.
//

import ModelRoutesDefinition from "./model-routes-definition";
import { NestedDependency } from "./queries";

// Note, that the aforementioned referencing mechanism is similar to mongoose's `Ref`.
class ModelRegistry {
    public routesDefinitions: { [key in string]: ModelRoutesDefinition; }
    
    public constructor(routesDefinitions: { [key in string]: ModelRoutesDefinition; }) {
        this.routesDefinitions = routesDefinitions;
    }

    /**
     * Recursively build a tree of `populate` paths.
     * @param modelId 
     * @returns 
     */
    public populatePaths(modelId: string): NestedDependency {
        const fields = this.findDefinition(modelId).fields;

        return Object.fromEntries(
            Object.keys(fields).map((fieldName) => {
                // Call the function recursively for each related model.
                // Return in a format compatible with `Object.fromEntries`.
                const relatedModelName = fields[fieldName].modelName;
                return [fieldName, this.populatePaths(relatedModelName)];
            })
        );
    }

    public findDefinition(modelId: string): ModelRoutesDefinition {
        if (!(modelId in this.routesDefinitions)) {
            throw new Error(`Unknown model: ${modelId}`);
        }

        return this.routesDefinitions[modelId];
    }
}

export default ModelRegistry;
