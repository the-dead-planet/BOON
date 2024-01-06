import ModelRegistry from '../common/model-registry';
import Route from '../common/route';

export const getPostRoutes = (modelRegistry: ModelRegistry) => [
    Route.getOne('Post', modelRegistry),
    Route.getAll('Post', modelRegistry),
    Route.create('Post', modelRegistry),
    Route.update('Post', modelRegistry),
    Route.remove('Post', modelRegistry),
];
