import { isEqual } from 'lodash';
import { concatMaps } from '../utils/containers';
import { StateData, MongoObject, Model, Path, StateDataFunc } from './types';
import { getValue } from '../utils/helperMethods'; // TODO: On a long term solve in a cleverer way
/* Module containing methods related to state data manipulation */

// Initial values of the object.
// Wrapped in a function to make sure each call returns a fresh, empty state.
// If it was exposed as a constant, it would still be possible to modify its underlying maps.
export const initialState: StateDataFunc = () => ({
    projects: new Map(),
    sprints: new Map(),
    posts: new Map(),
    comments: new Map(),
    teams: new Map(),
    users: new Map(),
    likes: new Map(),
});

// Merge two state data objects.
// `right` takes precedence.
export const mergeStateData = (left: any, right: any) => {
    // Make sure both objects contain the same set of keys.
    const sortedKeys = (obj: any) => Object.keys(obj).sort();

    // `isEqual` checks deep equality, as opposed to the `==` operator.
    const leftKeys = sortedKeys(left);
    const rightKeys = sortedKeys(right);
    if (!isEqual(leftKeys, rightKeys)) {
        throw new Error(`Objects contain different keys: ${JSON.stringify({ leftKeys, rightKeys })}`);
    }

    return Object.fromEntries(
        Object.keys(left).map((key) => {
            const mergedValue = concatMaps([left[key], right[key]]);
            return [key, mergedValue];
        })
    );
};

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
    projects: {
        paths: ['author', 'posts'],
        state: 'projects',
    },
};

// This function receives a nested (populated) object as the first parameter
// and depopulates its properties defined in 'PATHS_DATA' by overwriting
// them with their '_id' value. The same is repeated for each nested object
// within the object passed as function parameter. Return value is the depopulated object.
//
// This is the only exported depopulation related function.
// The two remaining functions are not exported, because we want to have a single entry point
// to the logic - it's easier to maintain.
export const depopulate = (obj: MongoObject, modelName: Path) => {
    // `depopulateImpl` modifes a received state in-place. It's an implementation detail, though.
    // This function will have no side effects - it creates its own state and returns it to the caller.
    // The caller is responsible for merging the created state with its own, previous state.
    const state = initialState();
    (depopulateImpl as any)({ [modelName]: obj }, [modelName], state);
    return state;
};

// Implementation of `depopulate`. Not to be exported.
// This function differs from `depopulate` in its signature, allowing more fine grained invocations.
export const depopulateImpl = (obj: MongoObject, paths: Array<Path>, stateData: StateData) => {
    paths.map((path) => {
        if (!(path in obj)) {
            throw new Error(`Unknown depopulation path: ${JSON.stringify({ path, obj })}`);
        }

        // Check if the property stores one object (author) or many in an array (posts)
        const setAndDepopulate = Array.isArray(getValue(obj, path)) ? setAndDepopulateMany : setAndDepopulateOne;
        (obj as any)[path] = setAndDepopulate(getValue(obj, path), path, stateData);
    });

    return obj;
};

// This function receives an object and depopulates it by replacing all
// direct nested objects with their object._id and initiates the same for these nested object,
// then adds the depopulated object to the appropriate state property
const setAndDepopulateOne = ({ _id, ...args }: MongoObject, path: Path | string, stateData: StateData) => {
    const model = getValue(PATHS_DATA, path);
    if (!model) {
        throw new Error(`Model not found: ${JSON.stringify({ path })}`);
    }

    const { state, paths } = model;
    if (!(state in stateData)) {
        throw new Error(`State data not found: ${JSON.stringify({ state, stateData })}`);
    }

    getValue(stateData, state).set(_id, depopulateImpl({ _id, ...args }, paths, stateData)); // TODO: delete _id

    return _id;
};

// The same as setAndDepopulateOne for an array of objects of the same model
const setAndDepopulateMany = (list: Array<MongoObject>, path: Path, stateData: StateData) =>
    list.map((obj) => setAndDepopulateOne(obj, path, stateData));
