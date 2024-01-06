import ModelRegistry from "../common/model-registry";
import Route from '../common/route';

export const getProjectRoutes = (modelRegistry: ModelRegistry) => [
    Route.getOne('Project', modelRegistry),
    Route.getAll('Project', modelRegistry),
    Route.create('Project', modelRegistry),
    Route.update('Project', modelRegistry),
    Route.remove('Project', modelRegistry),
];
