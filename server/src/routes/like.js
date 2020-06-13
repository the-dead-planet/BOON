const Route = require('../common/Route');

module.exports = modelRegistry => [
    Route.getOne('Like', modelRegistry),
    Route.getAll('Like', modelRegistry),
    Route.create('Like', modelRegistry),
    Route.update('Like', modelRegistry),
    Route.remove('Like', modelRegistry),
];
