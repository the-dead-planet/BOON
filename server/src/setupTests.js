// Extend jest with local matchers.
const matchers = require('./testing/matchers');

expect.extend(matchers);
