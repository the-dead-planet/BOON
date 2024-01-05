import ModelRegistry from '../common/model-registry';
import Route from '../common/route';

export const getLikeRoutes = (modelRegistry: ModelRegistry) => [
    Route.getOne('Like', modelRegistry),
    Route.getAll('Like', modelRegistry),
    Route.create('Like', modelRegistry),
    Route.update('Like', modelRegistry),
    Route.remove('Like', modelRegistry),
];
