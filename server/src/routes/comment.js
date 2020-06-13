const Route = require('../common/Route');

module.exports = modelRegistry => [
    Route.getOne('Comment', modelRegistry),
    Route.getAll('Comment', modelRegistry),
    Route.create('Comment', modelRegistry),
    Route.update('Comment', modelRegistry),
    Route.remove('Comment', modelRegistry),
];
