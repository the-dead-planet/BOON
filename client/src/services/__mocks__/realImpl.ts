/**
 * Mock implementation of all services.
 * Each individual service is exported, to make writing tests easier - each
 * test can explicitly specify which subservices to import.
 *
 * Note, that this solution is expected to be temporary. It's still possible
 * to simply forget to mock some service and get undefined behaviour. The long
 * term goal is to explicitly throw errors upon receiving an unexpected call -
 * this way, debugging tests will be far easier.
 */

import Services from '../services';

// Crud services follow the same pattern. Mock all methods.
//
// Note, that this is a function! You need to call it to produce a service.
// Using a function guarantees that each caller receives its own copy of the
// object. Had we defined a mock crud service as a constant object, each
// instance would point to the same memory - each subsequent mock would
// overwrite the previous ones.
const buildMockCrudService = () => ({
    getAll: jest.fn(),
    getOne: jest.fn(),
    add: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
});

export const authService = {
    login: jest.fn(),
    logout: jest.fn(),
    register: jest.fn(),
    whoami: jest.fn(),
};

export const sprintsService = {
    getAll: jest.fn(),
    add: jest.fn(),
    delete: jest.fn(),
};

const realImpl: Services = {
    authService,
    commentsService: buildMockCrudService(),
    likesService: buildMockCrudService(),
    postsService: buildMockCrudService(),
    projectsService: buildMockCrudService(),
    sprintsService: buildMockCrudService(),
    usersService: buildMockCrudService(),
};

export default realImpl;
