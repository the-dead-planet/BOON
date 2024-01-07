import mongoose from 'mongoose';
import { CommentSchema } from './comment';
import { LikeSchema } from './like';
import { UserSchema } from './user';

export interface PostSchemaRaw {
    title: string;
    body: string;
    comments: CommentSchema[];
    likes: LikeSchema[];
    author: UserSchema;
    createdBy?: string;
    created: Date;
    edited: Date;
}

export type PostSchema = PostSchemaRaw & mongoose.Document;

export const postSchema = new mongoose.Schema<PostSchema>({
    title: String,
    body: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
        },
    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like',
        },
    ],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdBy: {
        type: String,
        required: false
    },
    created: {
        type: Date,
        default: Date.now,
    },
    edited: {
        type: Date,
        default: undefined,
    },
});

export const postModel = mongoose.model<PostSchema>('Post', postSchema);
