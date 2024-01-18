import { ObjectId } from 'mongodb';

/**
 * Schemas / types of objects used throughout the app.
 * TODO: use Zod for a free parser.
 *
 * NOTE: models follow a legacy, SQLish format to make our migration easier.
 * We should prefer more tree-like schemas and avoid DB joins if possible.
 * For example, we can store likes and comments directly under each post.
 */
type Id = string;
export type Comment = {
    _id: ObjectId;
    body: string;
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
export type User = { name: string };
