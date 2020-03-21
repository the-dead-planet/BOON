// TODO: extract services to a single, common class allowing generating mocks.
// Generate mocks backed by a mutable, exported `state` variable.
export default {
    getAll: jest.fn(),
    add: jest.fn(),
    delete: jest.fn(),
};
