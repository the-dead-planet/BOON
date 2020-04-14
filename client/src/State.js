import { depopulate, initialState as initialStateData } from './logic/StateData';
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
    data: { ...initialStateData() },

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
    const newState = { ...state.data };

    // Wrap data in an object to match `depopulate`'s signature.
    depopulate({ sprints }, ['sprints'], newState);

    return { data: newState };
};

// FIXME: State is updated
// Update state after posting an object to db
export const updateData = state => ({ _id, ...args }, prop) => {
    state.data[prop].set(_id, { _id, ...args }); // TODO: delete _id once sprint drawer issue resolved

    return state;
};
