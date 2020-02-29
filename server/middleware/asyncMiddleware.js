// Wrapper for middlewares that need to perform async actions, e.g. db lookup.
const asyncMiddleware = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncMiddleware;
