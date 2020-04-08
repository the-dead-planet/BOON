import * as StateData from './logic/StateData';
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
        users: new Map(),
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

// Set populated objects, such as: posts, comments, likes
// Depopulate objects and store them as originally stored in mongo (with references to id's only)
export const setSprints = state => sprints => {
    let state = { ...INITIAL_STATE.data };
    StateData.setAndDepopulateMany(sprints, 'sprints', state);

    return { data: state };
};
