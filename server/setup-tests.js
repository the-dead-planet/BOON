// Extend jest with local matchers.
const { toMatchMongooseId } = require('./src/testing/matchers');

expect.extend({ toMatchMongooseId });
