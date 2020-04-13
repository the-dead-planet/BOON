/* Module containing methods related to state data manipulation */

// Initial values of the object.
// Wrapped in a function to make sure each call returns a fresh, empty state.
// If it was exposed as a constant, it would still be possible to modify its underlying maps.
export const initialState = () => ({
    projects: new Map(),
    sprints: new Map(),
    posts: new Map(),
    comments: new Map(),
    teams: new Map(),
    users: new Map(),
    likes: new Map(),
});

// Direct paths which are populated in data returned by rest call
// state is the name of the app state property where object data is stored
const PATHS_DATA = {
    sprints: {
        paths: ['author', 'posts', 'comments', 'likes'],
        state: 'sprints',
    },
    posts: {
        paths: ['author', 'comments', 'likes'],
        state: 'posts',
    },
    comments: {
        paths: ['author', 'likes'],
        state: 'comments',
    },
    likes: {
        paths: ['author'],
        state: 'likes',
    },
    author: {
        paths: [],
        state: 'users',
    },
};

// TODO: Szukalam definicji w mongoose metod obj.populate i obj.depopulate, bo im sie tez podaje prop 'path', ale nie moglam znalezc
// Wydaje mi sie, ze to rozwiazanie jest troche kulawe ale bliskie czegos sensownego
// Natomiast (moze sie myle) ale loading time troche spowolnil

// This function receives an object and depopulates it by replacing all
// direct nested objects with their object._id and initiates the same for these nested object,
// then adds the depopulated object to the appropriate state property
export const setAndDepopulateOne = ({ _id, ...args }, path, stateData) => {
    const model = PATHS_DATA[path];
    if (!model) {
        throw new Error(`Model not found: ${JSON.stringify({ path })}`);
    }

    const { state, paths } = model;
    if (!(state in stateData)) {
        throw new Error(`State data not found: ${JSON.stringify({ state, stateData })}`);
    }

    stateData[state].set(_id, depopulate({ _id, ...args }, paths, stateData)); // TODO: delete _id

    return _id;
};

// The same as setAndDepopulateOne for an array of objects of the same model
export const setAndDepopulateMany = (list, path, stateData) =>
    list.map(obj => setAndDepopulateOne(obj, path, stateData));

// This function receives a nested (populated) object as the first parameter
// and depopulates its properties defined in 'PATHS_DATA' by overwriting
// them with their '_id' value. The same is repeated for each nested object
// within the object passed as function parameter. Return value is the depopulated object.
export const depopulate = (obj, paths, stateData) => {
    paths.map(path => {
        if (!(path in obj)) {
            throw new Error(`Unknown depopulation path: ${JSON.stringify({ path, obj })}`);
        }
        // Check if the property stores one object (author) or many in an array (posts)
        const setAndDepopulate = Array.isArray(obj[path]) ? setAndDepopulateMany : setAndDepopulateOne;
        obj[path] = setAndDepopulate(obj[path], path, stateData);
    });

    return obj;
};
