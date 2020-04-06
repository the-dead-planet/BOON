// Module containing global state definition and functions for manipulating it.
// Each state modifying function takes the current state as the first argument
// and returns subset of the new state as a result.
// Functions can be user in `App.js` by:
// - binding with `this.state`
// - forwarding the result to `setState`
export const INITIAL_STATE = {
    // Client-side reflection of the backend state. Contains a subset of data
    // stored by the backend.
    // Field below should follow schema defined by the backend.
    // Data fetched with `GET` requests should end up here.
    // Each field is indexed by the objects' `id` field.
    data: {
        projects: new Map(),
        sprints: new Map(),
        posts: new Map(),
        comments: new Map(),
        teams: new Map(),
        authors: new Map(),
        likes: new Map(),
    },

    // Client specific state.
    whoamiRequestDone: false,
    user: null,
    notifications: [],
};

export const resolveWhoAmI = state => user => ({ user, whoamiRequestDone: true });

export const clearUser = state => () => ({ user: null });

export const setUser = state => user => ({ user });

export const addNotification = state => notification => ({
    notifications: state.notifications.concat([notification]),
});

export const popNotification = state => notificationId => ({
    notifications: state.notifications.filter(n => n.id !== notificationId),
});

// Extract populated objects, such as: posts, comments, likes
// Depopulate objects and store them as originally stored in mongo (with references to id's only)
export const setSprints = state => sprints => {
    let state = {
        sprints: new Map(),
        posts: new Map(),
        comments: new Map(),
        likes: new Map(),
        authors: new Map(), // TODO: only users who posted something are extracted here, does it make sense to store as a separate state obj or too much redundancy?
    };

    extractAndDepopulateMany(sprints, 'sprints', state);
    console.log('state', state);
    // return state;
    return { data: state };
};

// TODO: extract author and create generic method
const extractSprint = ({ _id, author, posts, comments, likes, ...args }, state) => {
    return {
        _id: _id,
        author: extractAndDepopulateOne(author, 'authors', state),
        posts: extractAndDepopulateMany(posts, 'posts', state),
        comments: extractAndDepopulateMany(comments, 'comments', state),
        likes: extractAndDepopulateMany(likes, 'likes', state),
        ...args,
    };
};

const extractPost = ({ author, comments, likes, ...args }, state) => {
    return {
        author: extractAndDepopulateOne(author, 'authors', state),
        comments: extractAndDepopulateMany(comments, 'comments', state),
        likes: extractAndDepopulateMany(likes, 'likes', state),
        ...args,
    };
};

const extractComment = ({ author, likes, ...args }, state) => {
    return {
        author: extractAndDepopulateOne(author, 'authors', state),
        likes: extractAndDepopulateMany(likes, 'likes', state),
        ...args,
    };
};

const extractLike = ({ author, ...args }, state) => {
    return {
        author: author._id,
        ...args,
    };
};

const extractAuthor = ({ ...args }, state) => {
    return {
        ...args,
    };
};

// Generic method
const extractMethods = {
    sprints: extractSprint,
    posts: extractPost,
    comments: extractComment,
    likes: extractLike,
    authors: extractAuthor,
};

const extractAndDepopulateMany = (list, name, state) => list.map(obj => extractAndDepopulateOne(obj, name, state));

const extractAndDepopulateOne = ({ _id, ...args }, name, state) => {
    state[name].set(_id, extractMethods[name]({ _id, ...args }, state)); // TODO: remove the _id - see sprint ListDrawer component
    return _id;
};
