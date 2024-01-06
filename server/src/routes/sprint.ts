import ModelRegistry from "../common/model-registry";
import Route from '../common/route';

export const getSprintRoutes = (modelRegistry: ModelRegistry) => [
    Route.getOne('Sprint', modelRegistry),
    Route.getAll('Sprint', modelRegistry),
    Route.create('Sprint', modelRegistry),
    Route.update('Sprint', modelRegistry),
    Route.remove('Sprint', modelRegistry),
];
