import * as argon2 from "argon2";
import type { Db, Collection } from 'mongodb';
import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';
import type {
    Comment,
    CommentResolved,
    Like,
    LikeResolved,
    Post,
    PostResolved,
    Project,
    ProjectResolved,
    Sprint,
    SprintResolved,
    Team,
    TeamResolved,
    User,
    UserResolved,
} from './schema.js';

// Fake user, until we implement proper auth.
const fakeUser: User = { _id: '0', name: 'Mr fake user', email: 'fake@user.com', password: 'fakeuser123', preferences: '{"darkMode":false}', created: new Date(), edited: null };

// Reexport for convenience.
export type Database = Db;

/**
 * Connect to database `dbName` under `uri`.
 * We only want a single app to connect to a single DB, so the raw client is hidden.
 * If it ever turns out we actually need direct access to the client instance, we
 * can just expose it directly instead.
 */
export async function connect(uri: string, dbName: string): Promise<{ db: Db; close: () => Promise<void> }> {
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        },
    });
    await client.connect();

    async function close() {
        await client.close();
    }

    const db = client.db(dbName);
    return { db, close };
}

// #region collections
// Type enriched getters for MongoDB collections.
function commentsCollection(db: Db): Collection<Comment> {
    return db.collection<Comment>('comments');
}

function likesCollection(db: Db): Collection<Like> {
    return db.collection<Like>('likes');
}

function postsCollection(db: Db): Collection<Post> {
    return db.collection<Post>('posts');
}

function sprintsCollection(db: Db): Collection<Sprint> {
    return db.collection<Sprint>('sprints');
}

function projectsCollection(db: Db): Collection<Project> {
    return db.collection<Project>('projects');
}

function teamsCollection(db: Db): Collection<Team> {
    return db.collection<Team>('teams');
}

function usersCollection(db: Db): Collection<User> {
    return db.collection<User>('users');
}
// #endregion

// #region resolve
// resolve* functions take a flat object (i.e. with links to other objects stored as raw IDs)
// and recursively replace links with resolved objects.
// For example, a flat comment object may contain 2 like ids, a resolved comment will contain
// 2 like objects.

async function resolveLike(_db: Db, like: Like): Promise<LikeResolved> {
    return { ...like, author: fakeUser };
}

async function resolveComment(db: Db, comment: Comment): Promise<CommentResolved> {
    const likeIds = (comment.likes || []).map((x) => new ObjectId(x));
    const likes = await likesCollection(db)
        .find({ _id: { $in: likeIds } })
        .toArray();
    const resolvedLikes = await Promise.all(likes.map((like) => resolveLike(db, like)));
    return { ...comment, author: fakeUser, likes: resolvedLikes };
}

async function resolvePost(db: Db, post: Post): Promise<PostResolved> {
    const likeIds = (post.likes || []).map((x) => new ObjectId(x));
    const likes = await likesCollection(db)
        .find({ _id: { $in: likeIds } })
        .toArray();
    const resolvedLikes = await Promise.all(likes.map((like) => resolveLike(db, like)));
    const commentIds = (post.comments || []).map((x) => new ObjectId(x));
    const comments = await commentsCollection(db)
        .find({ _id: { $in: commentIds } })
        .toArray();
    const resolvedComments = await Promise.all(comments.map((comment) => resolveComment(db, comment)));
    return { ...post, author: fakeUser, comments: resolvedComments, likes: resolvedLikes };
}

async function resolveSprint(db: Db, sprint: Sprint): Promise<SprintResolved> {
    const postIds = (sprint.posts || []).map((x) => new ObjectId(x));
    const posts = await postsCollection(db)
        .find({ _id: { $in: postIds } })
        .toArray();
    const resolvedPosts = await Promise.all(posts.map((post) => resolvePost(db, post)));
    const likeIds = (sprint.likes || []).map((x) => new ObjectId(x));
    const likes = await likesCollection(db)
        .find({ _id: { $in: likeIds } })
        .toArray();
    const resolvedLikes = await Promise.all(likes.map((like) => resolveLike(db, like)));
    const commentIds = (sprint.comments || []).map((x) => new ObjectId(x));
    const comments = await commentsCollection(db)
        .find({ _id: { $in: commentIds } })
        .toArray();
    const resolvedComments = await Promise.all(comments.map((comment) => resolveComment(db, comment)));
    return { ...sprint, author: fakeUser, posts: resolvedPosts, comments: resolvedComments, likes: resolvedLikes };
}

async function resolveProject(db: Db, project: Project): Promise<ProjectResolved> {
    const postIds = (project.posts || []).map((x) => new ObjectId(x));
    const posts = await postsCollection(db)
        .find({ _id: { $in: postIds } })
        .toArray();
    const resolvedPosts = await Promise.all(posts.map((post) => resolvePost(db, post)));
    return { ...project, author: fakeUser, posts: resolvedPosts };
}

async function resolveTeam(_db: Db, team: Team): Promise<TeamResolved> {
    return { ...team, members: [fakeUser] };
}

async function resolveUser(_db: Db, user: User): Promise<UserResolved> {
    return { ...user, preferences: user.preferences ? JSON.parse(user.preferences) : undefined };
}
// #region resolve

export async function listComments(db: Db): Promise<CommentResolved[]> {
    const comments = await commentsCollection(db).find().toArray();
    return Promise.all(comments.map((x) => resolveComment(db, x)));
}

export async function getComment(db: Db, id: string): Promise<CommentResolved | null> {
    const objId = new ObjectId(id);
    const maybeComment = await commentsCollection(db).findOne(objId);
    if (!maybeComment) {
        return null;
    }
    return resolveComment(db, maybeComment);
}

export async function addComment(db: Db, parent: string, comment: Comment): Promise<ObjectId> {
    const parentPostId = new ObjectId(parent);
    const { insertedId } = await commentsCollection(db).insertOne(comment);
    await postsCollection(db).updateOne({ _id: parentPostId }, { $push: { comments: insertedId.toString() } });
    return insertedId;
}

export async function listLikes(db: Db): Promise<LikeResolved[]> {
    const likes = await likesCollection(db).find().toArray();
    return Promise.all(likes.map((x) => resolveLike(db, x)));
}

export async function getLike(db: Db, id: string): Promise<LikeResolved | null> {
    const objId = new ObjectId(id);
    const maybeLike = await likesCollection(db).findOne(objId);
    if (!maybeLike) {
        return null;
    }
    return resolveLike(db, maybeLike);
}

export async function addLike(db: Db, parent: string, parentType: 'post' | 'comment', like: Like): Promise<ObjectId> {
    const parentId = new ObjectId(parent);
    const { insertedId } = await likesCollection(db).insertOne(like);
    if (parentType === 'post') {
        await postsCollection(db).updateOne({ _id: parentId }, { $push: { likes: insertedId.toString() } });
    } else if (parentType === 'comment') {
        await commentsCollection(db).updateOne({ _id: parentId }, { $push: { likes: insertedId.toString() } });
    } else {
        throw new Error(`Unknown parent type: ${parentType}`);
    }
    return insertedId;
}

export async function removeLike(db: Db, id: string): Promise<void> {
    // NOTE: it's a bit hacky, because we should also remove the reference from the parent.
    // Since we're about to move to a tree based structure anyway, let's live with this
    // hacky solution for now.
    const { deletedCount } = await likesCollection(db).deleteOne({ _id: new ObjectId(id) });
    if (!deletedCount) {
        throw new Error('Object not found');
    }
}

export async function listPosts(db: Db): Promise<PostResolved[]> {
    const posts = await postsCollection(db).find().toArray();
    return await Promise.all(posts.map((x) => resolvePost(db, x)));
}

export async function getPost(db: Db, id: string): Promise<PostResolved | null> {
    const objId = new ObjectId(id);
    const maybePost = await postsCollection(db).findOne(objId);
    if (!maybePost) {
        return null;
    }
    return resolvePost(db, maybePost);
}

export async function addPost(db: Db, post: Post): Promise<ObjectId> {
    const { insertedId } = await postsCollection(db).insertOne(post);
    return insertedId;
}

export async function listSprints(db: Db): Promise<SprintResolved[]> {
    const sprints = await sprintsCollection(db).find().toArray();
    return await Promise.all(sprints.map((x) => resolveSprint(db, x)));
}

export async function getSprint(db: Db, id: string): Promise<SprintResolved | null> {
    const objId = new ObjectId(id);
    const maybeSprint = await sprintsCollection(db).findOne(objId);
    if (!maybeSprint) {
        return null;
    }
    return resolveSprint(db, maybeSprint);
}

export async function addSprint(db: Db, sprint: Sprint): Promise<ObjectId> {
    const { insertedId } = await sprintsCollection(db).insertOne(sprint);
    return insertedId;
}

export async function listProjects(db: Db): Promise<ProjectResolved[]> {
    const projects = await projectsCollection(db).find().toArray();
    return await Promise.all(projects.map((x) => resolveProject(db, x)));
}

export async function getProject(db: Db, id: string): Promise<ProjectResolved | null> {
    const objId = new ObjectId(id);
    const maybeProject = await projectsCollection(db).findOne(objId);
    if (!maybeProject) {
        return null;
    }
    return resolveProject(db, maybeProject);
}

export async function addProject(db: Db, project: Project): Promise<ObjectId> {
    const { insertedId } = await projectsCollection(db).insertOne(project);
    return insertedId;
}

export async function listTeams(db: Db): Promise<TeamResolved[]> {
    const teams = await teamsCollection(db).find().toArray();
    return await Promise.all(teams.map((x) => resolveTeam(db, x)));
}

export async function getTeam(db: Db, id: string): Promise<TeamResolved | null> {
    const objId = new ObjectId(id);
    const maybeTeam = await teamsCollection(db).findOne(objId);
    if (!maybeTeam) {
        return null;
    }
    return resolveTeam(db, maybeTeam);
}

export async function addTeam(db: Db, team: Team): Promise<ObjectId> {
    const { insertedId } = await teamsCollection(db).insertOne(team);
    return insertedId;
}

export async function listUsers(db: Db): Promise<UserResolved[]> {
    const users = await usersCollection(db).find().toArray();
    return await Promise.all(users.map((x) => resolveUser(db, x)));
}

export function getUser(db: Db, id: string): Promise<User | null> {
    const objId = new ObjectId(id);
    return usersCollection(db).findOne(objId);
}

export async function addUser(db: Db, user: User): Promise<ObjectId> {
    const isEmailUnique = (await usersCollection(db).find({ email: user.email }).toArray()).length === 0;
    if (!isEmailUnique) {
        throw new Error('User with this e-mail already exists!');
    }
    const hashed = await argon2.hash(user.password);
    const { insertedId } = await usersCollection(db).insertOne({ ...user, password: hashed });
    return new ObjectId(insertedId);
}
