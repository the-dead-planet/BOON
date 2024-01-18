import * as rxjs from 'rxjs';
import { depopulate, mergeStateData, getInitialData } from './logic/StateData';
import NotificationHandler from './logic/NotificationHandler';
import * as Types from './logic/types';

export const defaultUi: Types.UI = {
    theme: 'default',
    mode: 'light'
};

export const user$ = new rxjs.BehaviorSubject<Types.User | null>(null);
export const notificationHandler =  new NotificationHandler();
export const ui$ = new rxjs.BehaviorSubject<Types.UI>(defaultUi);
export const stateData$ = new rxjs.BehaviorSubject<Types.StateData>(getInitialData());

export const clearUser = () => {
    user$.next(null);
};

export const addUser = (user: Types.User | null) => {
    const stateUsers = depopulate([user], 'users');
    const stateData = mergeStateData(stateData$.value, stateUsers);
    // TODO: Test this, something doesn't seem right:
    // const stateData = mergeStateData(state.data, { users: stateUsers });

    return { data: stateData };
};

// Add a single comment to a commentable object.
// Adds the comment object to `state.data.comments` and updates the commented object in `state.data`.
//
// To pass type checking, each commentable object (i.e. sprint / post) must implement its own method for commenting.
export const addCommentToSprint = (sprintId: string, comment: Types.Comment) => {
    const [updatedCommentData, updatedSprintData] = addCommentImpl(
        stateData$.value.sprints,
        sprintId,
        stateData$.value.comments,
        comment
    );

    return { comments: updatedCommentData, sprints: updatedSprintData };
};

export const addCommentToPost = (postId: string, comment: Types.Comment) => {
    const [updatedCommentData, updatedPostData] = addCommentImpl(
        stateData$.value.posts,
        postId,
        stateData$.value.comments,
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
    commentData: Map<string, Types.Comment>,
    comment: Types.Comment
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

/**
 * Set populated objects, such as: posts, comments, likes. Depopulate objects and store them as originally stored in mongo (with references to id's only).
 */
export const setStateData = (
    sprints: Array<Types.Sprint>,
    projects: Array<Types.Project>,
    users: Array<Types.User>
): void => {
    const stateSprints = depopulate(sprints, 'sprints');
    const stateProjects = depopulate(projects, 'projects');
    const stateUsers = depopulate(users, 'users');

    // Merge current state with updates.
    // The second argument takes precedence -> pass updates as the second argument.
    const mergedSprintsData = mergeStateData(stateData$.value, stateSprints);
    const mergedProjectsData = mergeStateData(mergedSprintsData, stateProjects);
    const mergedData = mergeStateData(mergedProjectsData, stateUsers);
    
    stateData$.next(mergedData as Types.StateData);
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
export const removeObject = ({
    child,
    parent,
    childId,
    parentId,
}: Types.RemoveObjectData) => {
    const stateData = { ...stateData$.value };

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
    const parentObj: Record<string, unknown[]> | null = parent && parentId ? stateData[parent]?.get(parentId) as unknown as Record<string, unknown[]> : null;
    if (!parentObj) {
        console.log(`Tried to delete an unknown child object: ${JSON.stringify({ child, childId, parent, parentId })}`);
    } else {
        const currentChildren = parentObj[child];
        parentObj[child] = currentChildren.filter((el) => el !== childId);
        // rewrite this in the future using functions with dynamic types
        if (parent) {
            (stateData[parent] as typeof map).set(parentId, parentObj);
        }
    }

    return { data: mergeStateData(stateData$.value, stateData) };
};
