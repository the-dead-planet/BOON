import ModelRegistry from "../common/model-registry";
import Route from '../common/route';

/**
 * NOTE: delete is not supported user objects, as it would cause holes in stored data - all related objects (comments, posts) would have to disappear or lose information about the author.
 * If an unregister-like functionality is needed, consider adding a `deactivated` field to the model.
 * @param modelRegistry 
 * @returns 
 */
export const getUserRoutes = (modelRegistry: ModelRegistry) => [
    Route.getOne('User', modelRegistry),
    Route.getAll('User', modelRegistry),
    Route.update('User', modelRegistry),
];
