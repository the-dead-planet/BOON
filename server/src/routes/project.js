const Route = require('../common/Route');

module.exports = modelRegistry => [
    Route.getOne('Project', modelRegistry),
    Route.getAll('Project', modelRegistry),
    Route.create('Project', modelRegistry),
    Route.update('Project', modelRegistry),
    Route.remove('Project', modelRegistry),
];
