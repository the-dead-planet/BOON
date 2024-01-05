import ModelRegistry from "../common/model-registry";
import Route from '../common/route';

export const getCommentRoutes = (modelRegistry: ModelRegistry) => [
    Route.getOne('Comment', modelRegistry),
    Route.getAll('Comment', modelRegistry),
    Route.create('Comment', modelRegistry),
    Route.update('Comment', modelRegistry),
    Route.remove('Comment', modelRegistry),
];
