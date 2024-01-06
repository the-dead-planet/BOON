import ModelRegistry from '../common/model-registry';
import Route from '../common/route';

export const getTeamRoutes = (modelRegistry: ModelRegistry) => [
    Route.getOne('Team', modelRegistry),
    Route.getAll('Team', modelRegistry),
    Route.create('Team', modelRegistry),
    Route.update('Team', modelRegistry),
    Route.remove('Team', modelRegistry),
];
