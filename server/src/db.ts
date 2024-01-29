/**
 * Database utilities.
 */
import { Db, MongoClient, ServerApiVersion, ObjectId, Collection } from 'mongodb';
import { Comment, CommentResolved, Like, LikeResolved, Post, PostResolved, User } from './schema.js';

// Fake user, until we implement proper auth.
const fakeUser: User = { name: 'Mr fake user' };

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

export function getUser(db: Db, id: string): Promise<User | null> {
    const objId = new ObjectId(id);
    return usersCollection(db).findOne(objId);
}
