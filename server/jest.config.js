module.exports = {
    globals: {
        'ts-jest': {
            tsConfig: 'tsconfig.json',
        },
    },
    moduleFileExtensions: ['ts', 'js'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    testMatch: [
        '**/src/**/*.test.*', // Match files under src/ and let the test framework transpile them.
    ],
    preset: '@shelf/jest-mongodb',
    setupFilesAfterEnv: ['./setupTests.js'],
    testEnvironment: 'node',
};
