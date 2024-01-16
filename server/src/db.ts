/**
 * Database utilities.
 * TODO: expose MongoDB utils from here.
 */
import { Post, User } from './schema.ts';

const db: {
    users: { [key: string]: User };
    posts: { [key: string]: Post };
} = { users: {}, posts: {} };

export function listUsers() {
    return Object.values(db.users);
}

export function getUser(id: string) {
    return db.users[id];
}

export function addUser(id: string, name: string) {
    db.users[id] = { id, name };
}

export function listPosts() {
    return Object.values(db.posts);
}

export function getPost(id: string) {
    return db.posts[id];
}

export function addPost(id: string, content: string) {
    db.posts[id] = { id, content };
}
