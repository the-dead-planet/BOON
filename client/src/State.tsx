import { depopulate, mergeStateData, initialState as initialStateData } from './logic/StateData';
import { StateType, User, Sprint, Project, Comment, StateDataKeys } from './logic/types';

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
    themeType: 'default',
    notifications: [],
};

export const resolveWhoAmI = (_state: StateType) => (user: User | null) => ({ user, whoamiRequestDone: true });

export const clearUser = (_state: StateType) => () => ({ user: null });

export const addUser = (state: StateType) => (user: User | null) => {
    const stateUsers = depopulate([user], 'users');
    const stateData = mergeStateData(state.data, stateUsers);
    // TODO: Test this, something doesn't seem right:
    // const stateData = mergeStateData(state.data, { users: stateUsers });

    return { data: stateData };
};

// Add a single comment to a commentable object.
// Adds the comment object to `state.data.comments` and updates the commented object in `state.data`.
//
// To pass type checking, each commentable object (i.e. sprint / post) must implement its own method for commenting.
export const addCommentToSprint = (state: StateType) => (sprintId: string, comment: Comment) => {
    const [updatedCommentData, updatedSprintData] = addCommentImpl(
        state.data.sprints,
        sprintId,
        state.data.comments,
        comment
    );

    return { comments: updatedCommentData, sprints: updatedSprintData };
};

export const addCommentToPost = (state: StateType) => (postId: string, comment: Comment) => {
    const [updatedCommentData, updatedPostData] = addCommentImpl(
        state.data.posts,
        postId,
        state.data.comments,
        comment
    );

    return { comments: updatedCommentData, posts: updatedPostData };
};

// A generic, type safe variant of a function responsible for adding a new comment.
// Note, that the function is generic - it will work for any type that has the right interface, but the type is constant
// for each invocation. This is different than using an algebraic data type (e.g. `"Post" | "Sprint"`) - in that case
// the type is not guaranteed to stay the same during an invocation, which causes TS to reject such functions.
const addCommentImpl = <Commented extends { comments: Array<string> }>(
    commentedObjectData: Map<string, Commented>,
    commentedObjectId: string,
    commentData: Map<string, Comment>,
    comment: Comment
) => {
    // Add the new comment to the comment storage.
    const commentId = comment._id;
    commentData.set(commentId, comment);

    // Add the comment id to the commented object.
    // Gracefully handle a corner case where the commented object is not found.
    const maybeCommentedObject = commentedObjectData.get(commentedObjectId);
    if (maybeCommentedObject === undefined) {
        console.log(`Commenting an unknown object: ${{ commentedObjectId }}`);
    } else {
        const updatedCommentedObject = {
            ...maybeCommentedObject,
            comments: [...maybeCommentedObject.comments, commentId],
        };
        commentedObjectData.set(commentedObjectId, updatedCommentedObject);
    }

    return [commentData, commentedObjectData];
};

// Set populated objects, such as: posts, comments, likes
// Depopulate objects and store them as originally stored in mongo (with references to id's only)
export const setStateData = (state: StateType) => (
    sprints: Array<Sprint>,
    projects: Array<Project>,
    users: Array<User>
) => {
    const stateSprints = depopulate(sprints, 'sprints');
    const stateProjects = depopulate(projects, 'projects');
    const stateUsers = depopulate(users, 'users');

    // Merge current state with updates.
    // The second argument takes precedence -> pass updates as the second argument.
    const mergedSprintsData = mergeStateData(state.data, stateSprints);
    const mergedProjectsData = mergeStateData(mergedSprintsData, stateProjects);
    const mergedData = mergeStateData(mergedProjectsData, stateUsers);

    return { data: mergedData };
};

const map = new Map();
// Delete object from state.
// The function can be called for any combination of parent <-> child relations. Relation names are provided as strings and validated dynamically, rather than through types.
// TODO:
//  - move logic to `StateData.tsx`, add tests.
//    Only an adapter function should remain in this file.
//    - the logic can be split into two, type safe functions:
//      - deleteItem(path: string, id: string);  // deletes the object itself
//      - deleteChildren<ParentType, K extends keyof ParentType>(parentPath: string, childPath: K, id: string);  // deletes the parent objects children ids
//    Note, that `deleteItem` and `deleteChildren` are (somewhat) type safe and wouldn't require any type casting. Moreover, they can be easily tested, by simply
//    extending StateData.test.js. Only the simple bit that will be left in State.tsx will require some casting and unsafe operations. That way, we minimize
//    the amount of type-unchecked code, making the whole codebase safer.
//  - allow multiple parent -> child relationships
//  - generate paths automatically. Depopulation logic and backend models operate on the same models.
//    Define models only once.
//  - find some magic TS way of enforcing more type safety.
export const removeObject = (state: StateType) => ({
    child,
    parent,
    childId,
    parentId,
}: {
    child: StateDataKeys;
    parent: StateDataKeys;
    childId: string;
    parentId: string;
}) => {
    const stateData = state.data;

    // Remove deleted object from the state
    const childData = stateData[child];
    if (!childData) {
        console.log(`Tried to delete an object of unknown type: ${JSON.stringify({ child, childId })}`);
        return;
    }

    childData.delete(childId);

    // Remove from parent references
    // Cast `parentObj` to a less strict version to allow indexing by dynamic strings.
    // It would only allow indexing by poperty names otherwise, which, unfortunately, depend on the passed in values.
    // TODO: find a smart way to make it type safe.
    const parentObj: Record<string, unknown[]> | null = stateData[parent]?.get(parentId) as unknown as Record<string, unknown[]>;
    if (!parentObj) {
        console.log(`Tried to delete an unknown child object: ${JSON.stringify({ child, childId, parent, parentId })}`);
    } else {
        const currentChildren = parentObj[child];
        parentObj[child] = currentChildren.filter((el) => el !== childId);
        // rewrite this in the future using functions with dynamic types
        (stateData[parent] as typeof map).set(parentId, parentObj);
    }

    return { data: mergeStateData(state.data, stateData) };
};
