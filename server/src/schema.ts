/**
 * Schemas / types of objects used throughout the app.
 * TODO: use Zod for a free parser.
 *
 * NOTE: models follow a legacy, SQLish format to make our migration easier.
 * We should prefer more tree-like schemas and avoid DB joins if possible.
 * For example, we can store likes and comments directly under each post.
 */

import type { ObjectId } from 'mongodb';

type Id = string;
export type Comment = {
    _id: ObjectId;
    content: string;
    author: Id;
    created: Date;
    likes: Id[];
};
export type CommentResolved = Omit<Comment, 'author' | 'likes'> & { author: User; likes: LikeResolved[] };
export type Like = {
    _id: ObjectId;
    type: string;
    author: Id;
    created: Date;
};
export type LikeResolved = Omit<Like, 'author'> & { author: User };
export type Post = {
    _id: ObjectId;
    title: string;
    content: string;
    author: Id;
    created: Date;
    edited: Date | null;
    comments: Id[];
    likes: Id[];
};
export type PostResolved = Omit<Post, 'author' | 'comments' | 'likes'> & {
    _id: ObjectId;
    author: User;
    comments: CommentResolved[];
    likes: LikeResolved[];
};
export type Sprint = {
    _id: ObjectId;
    number: number;
    dateFrom: Date;
    dateTo: Date;
    title: string;
    content: string;
    posts: Id[];
    comments: Id[];
    likes: Id[];
    author: Id;
    created: Date;
    edited: Date | null;
};
export type SprintResolved = Omit<Sprint, 'author' | 'posts' | 'comments' | 'likes'> & {
    _id: ObjectId;
    number: number;
    dateFrom: Date;
    dateTo: Date;
    title: string;
    content: string;
    posts: PostResolved[];
    comments: CommentResolved[];
    likes: LikeResolved[];
    author: User;
    created: Date;
    edited: Date | null;
};
export type Project = {
    _id: ObjectId;
    title: string;
    content: string;
    posts: Id[];
    author: Id;
    created: Date;
    edited: Date | null;
};
export type ProjectResolved = Omit<Project, 'author' | 'posts'> & {
    _id: ObjectId;
    title: string;
    content: string;
    posts: PostResolved[];
    author: User;
    created: Date;
    edited: Date | null;
};
export type Team = {
    _id: ObjectId;
    title: string;
    content: string;
    members: Id[];
    created: Date;
};
export type TeamResolved = Omit<Team, 'members'> & { members: User[] };
export type User = { name: string };
