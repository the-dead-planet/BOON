// Jest's matchers list is terrible.
// This module adds a few missing matchers.
// See https://jestjs.io/docs/en/expect#expectextendmatchers for details.

// Note, that JS type system is a bit weird.
// It will work fine for classes, but JS's definition of a function
// is a bit vague.
export const toBeOfType = (received, expectedType) => {
    const pass = received instanceof expectedType;
    const expectedTypeName = (expectedType && expectedType.name) || expectedType;
    if (pass) {
        return {
            message: () => `expected ${received} not to be a ${expectedTypeName}`,
            pass,
        };
    } else {
        return {
            message: () => `expected ${received} to be a ${expectedTypeName}`,
            pass,
        };
    }
};

// Export the objects explicitly to minimize the amount of code in setup-tests.js
export const matchers = { toBeOfType };
