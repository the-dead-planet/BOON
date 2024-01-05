// Jest's matchers list is terrible.
// This module adds a few missing matchers.
// See https://jestjs.io/docs/en/expect#expectextendmatchers for details.
import { ObjectId } from 'mongodb';

const toMatchMongooseId = (received: ObjectId | unknown, expected: ObjectId) => {
    const pass = received instanceof ObjectId && received.equals(expected);
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

export { toMatchMongooseId };
