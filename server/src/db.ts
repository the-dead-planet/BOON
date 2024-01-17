/**
 * Database utilities.
 */
import { Db, MongoClient, ServerApiVersion, WithId, ObjectId, Collection } from 'mongodb';
import { Post, User } from './schema.ts';

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
        serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
    });
    await client.connect();

    async function close() {
        await client.close();
    }

    const db = client.db(dbName);
    return { db, close };
}

function users(db: Db): Collection<User> {
    return db.collection<User>('users');
}

function posts(db: Db): Collection<Post> {
    return db.collection<Post>('posts');
}

export function listUsers(db: Db): Promise<WithId<User>[]> {
    return users(db).find().toArray();
}

export function getUser(db: Db, id: string): Promise<WithId<User> | null> {
    const objId = new ObjectId(id);
    return users(db).findOne(objId);
}

export async function addUser(db: Db, user: User): Promise<ObjectId> {
    const { insertedId } = await users(db).insertOne(user);
    return insertedId;
}

export function listPosts(db: Db): Promise<WithId<Post>[]> {
    return posts(db).find().toArray();
}

export function getPost(db: Db, id: string): Promise<WithId<Post> | null> {
    const objId = new ObjectId(id);
    return posts(db).findOne(objId);
}

export async function addPost(db: Db, post: Post): Promise<ObjectId> {
    const { insertedId } = await posts(db).insertOne(post);
    return insertedId;
}
