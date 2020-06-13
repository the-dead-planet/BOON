const Route = require('../common/Route');

module.exports = modelRegistry => [
    Route.getOne('Post', modelRegistry),
    Route.getAll('Post', modelRegistry),
    Route.create('Post', modelRegistry),
    Route.update('Post', modelRegistry),
    Route.remove('Post', modelRegistry),
];
