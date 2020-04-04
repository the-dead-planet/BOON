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
        projects: {},
        sprints: {},
        posts: {},
        comments: {},
        teams: {},
        users: {},
        likes: {},
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
    // TODO: Pewnie wymyslisz ladniejszy sposob niz te ponizej heh ale chyba o to chodzilo z tym depopulatem?
    // TODO: Czy to moze isc synchronicznie, czy wykombinujemy promises?

    // const posts = [].concat.apply([], sprints.map(sprint => sprint.posts));
    const posts = depopulatePosts(sprints.map(sprint => sprint.posts).flat());

    // Comments are given to sprints and posts
    const comments = sprints
        .map(sprint => {
            const sprintComments = depopulateComments(sprint.comments);
            const sprintPostsComments = depopulateComments(sprint.posts.map(post => post.comments).flat());

            return [...sprintComments, ...sprintPostsComments];
        })
        .flat();

    // Likes are given to sprints, posts and comments
    const likes = sprints
        .map(sprint => {
            const sprintLikes = depopulateLikes(sprint.likes);
            const sprintPostsLikes = depopulateLikes(sprint.posts.map(post => post.likes).flat());
            const sprintCommentsLikes = depopulateLikes(sprint.comments.map(comment => comment.likes).flat());

            return [...sprintLikes, ...sprintPostsLikes, ...sprintCommentsLikes];
        })
        .flat();

    // Set state for depopulated objects extracted from Sprints
    // FIXME: this is not working...
    setPosts(posts);
    setComments(comments);
    setLikes(likes);

    return { sprints };
    // TODO: Adjust components according to new state logic - currently components still read data from populated sprint
    // return { depopulateSprints(sprints) }
};

const setPosts = state => posts => ({ posts });
const setLikes = state => likes => ({ likes });
const setComments = state => Comments => ({ Comments });

// Depopulate methodss
const depopulateSprints = sprints =>
    sprints.map(({ author, posts, comments, likes, ...args }) => ({
        author: author._id,
        posts: posts.map(post => post._id),
        comments: comments.map(comment => comment._id),
        likes: likes.map(like => like._id),
        ...args,
    }));

const depopulatePosts = posts =>
    posts.map(({ author, likes, comments, ...args }) => ({
        author: author._id,
        comments: comments.map(comment => comment._id),
        likes: likes.map(like => like._id),
        ...args,
    }));

const depopulateLikes = likes =>
    likes.map(({ author, ...args }) => ({
        author: author._id,
        ...args,
    }));

const depopulateComments = comments =>
    comments.map(({ author, likes, ...args }) => ({
        author: author._id,
        likes: likes.map(like => like._id),
        ...args,
    }));
