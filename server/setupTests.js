// Extend jest with local matchers.
const matchers = require('./src/testing/matchers');

expect.extend(matchers);
