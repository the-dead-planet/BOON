// Extend jest with local matchers.
const matchers = require('./built/testing/matchers');

expect.extend(matchers);
