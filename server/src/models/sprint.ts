import mongoose from 'mongoose';
import { PostSchema } from './post';
import { CommentSchema } from './comment';
import { LikeSchema } from './like';
import { UserSchema } from './user';

export interface SprintSchemaRaw {
    number: number;
    dateFrom: Date;
    dateTo: Date;
    title: string;
    body: string;
    posts: PostSchema[];
    comments: CommentSchema[];
    likes: LikeSchema[];
    author: UserSchema;
    createdBy?: string;
    created: Date;
    edited: Date;
}

export type SprintSchema = SprintSchemaRaw & mongoose.Document;

export const sprintSchema = new mongoose.Schema<SprintSchema>({
    number: Number,
    dateFrom: {
        type: Date,
        default: Date.now(),
    },
    dateTo: {
        type: Date,
        default: Date.now(),
    },
    title: String,
    body: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
        },
    ],
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

export const sprintModel = mongoose.model<SprintSchema>('Sprint', sprintSchema);
