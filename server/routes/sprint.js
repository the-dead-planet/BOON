const Route = require('../common/Route');

module.exports = modelRegistry => [
    Route.getOne('Sprint', modelRegistry),
    Route.getAll('Sprint', modelRegistry),
    Route.create('Sprint', modelRegistry),
    Route.update('Sprint', modelRegistry),
    Route.remove('Sprint', modelRegistry),
];
