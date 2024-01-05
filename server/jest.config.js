module.exports = {
    globals: {
        'ts-jest': {
            tsConfig: 'tsconfig.json',
        },
    },
    moduleFileExtensions: ['ts', 'js'],
    transform: {},
    testMatch: [
        '**/src/**/*.test.*', // Match files under src/ and let the test framework transpile them.
    ],
    preset: '@shelf/jest-mongodb',
    setupFilesAfterEnv: ['./setup-tests.js'],
    testEnvironment: 'node',
};
