// Returns the original query with populated `paths`.
// An automated way of calling `.populate(path)` repetitively.
const populateFromPaths = (query, paths) => paths.reduce((q, path) => q.populate(path), query);

module.exports = { populateFromPaths };
