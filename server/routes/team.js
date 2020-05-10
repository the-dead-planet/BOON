const Route = require('../common/Route');

module.exports = modelRegistry => [
    Route.getOne('Team', modelRegistry),
    Route.getAll('Team', modelRegistry),
    Route.create('Team', modelRegistry),
    Route.update('Team', modelRegistry),
    Route.remove('Team', modelRegistry),
];
