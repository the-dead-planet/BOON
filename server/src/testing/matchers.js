// Jest's matchers list is terrible.
// This module adds a few missing matchers.
// See https://jestjs.io/docs/en/expect#expectextendmatchers for details.
const { ObjectID } = require('mongodb');

const toMatchMongooseId = (received, expected) => {
    const pass = received instanceof ObjectID && received.equals(expected);
    if (pass) {
        return {
            message: () => `expected ${received} not to be equal ${expected}`,
            pass,
        };
    } else {
        return {
            message: () => `expected ${received} to equal ${expected}`,
            pass,
        };
    }
};

module.exports = { toMatchMongooseId };
