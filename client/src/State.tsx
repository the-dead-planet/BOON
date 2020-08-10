import { depopulate, mergeStateData, initialState as initialStateData } from './logic/StateData';
import { Mode, StateType, User, Notification, Sprint, MongoObject, Path, StateDataKeys, Model } from './logic/types';

// Module containing global state definition and functions for manipulating it.
// Each state modifying function takes the current state as the first argument
// and returns subset of the new state as a result.
// Functions can be user in `App.js` by:
// - binding with `this.state`
// - forwarding the result to `setState`
export const INITIAL_STATE: StateType = {
    // Client-side reflection of the backend state. Contains a subset of data
    // stored by the backend.
    // Field below should follow schema defined by the backend.
    // Data fetched with `GET` requests should end up here.
    // Each field is indexed by the objects' `id` field.
    data: { ...initialStateData() },

    // Client specific state.
    whoamiRequestDone: false,
    user: null,
    mode: 'light',
    notifications: [],
};

export const resolveWhoAmI = (state: StateType) => (user: User | null) => ({ user, whoamiRequestDone: true });

export const clearUser = (state: StateType) => () => ({ user: null });

export const setUser = (state: StateType) => (user: User | null) => ({ user });

export const addNotification = (state: StateType) => (notification: Notification) => ({
    notifications: state.notifications.concat([notification]),
});

export const popNotification = (state: StateType) => (notificationId: string) => ({
    notifications: state.notifications.filter(n => n.id !== notificationId),
});

// Set populated objects, such as: posts, comments, likes
// Depopulate objects and store them as originally stored in mongo (with references to id's only)
export const setSprints = (state: StateType) => (sprints: Array<Sprint>) => {
    const stateDataUpdates = depopulate(sprints as any, 'sprints');
    // Merge current state with updates.
    // The second argument takes precedence -> pass updates as the second argument.
    const mergedData = mergeStateData(state.data, stateDataUpdates);
    return { data: mergedData };
};

const modelPaths = {
    Sprint: 'sprints',
    Post: 'posts',
    Comment: 'comments',
    Like: 'likes',
    Project: 'projects',
    User: 'users',
    Team: 'teams',
};

// Update relevant map and insert reference _id in parent object
export const updateData = (state: StateType) => (
    { _id, ...args }: any,
    path: StateDataKeys,
    obj?: { _id: string; model: Model }
) => {
    // let data = { ...state }.data;
    // data[path].set(_id, { _id, ...args })
    const newData = Object.fromEntries(Object.entries(state.data));
    newData.comments.set(_id, { _id, ...args });
    const mergedData = mergeStateData(state.data, newData);

    // If new object has a parent, update the reference in parent object
    if (obj) {
        const updatedObject = newData[modelPaths[obj.model]].get(obj._id);

        // TODO: fix this eh
        if (updatedObject) {
            for (const [key, value] of Object.entries(updatedObject)) {
                if (key === path) {
                    // value.push(_id)
                    updatedObject[key].push(_id);
                }
            }

            newData[modelPaths[obj.model]].set(obj._id, updatedObject);
        }

        return { data: updatedObject };
    }

    console.log(mergedData);
    console.log(state.data == newData);

    return { data: mergedData };
};
