import mongoose from 'mongoose';
import { LikeSchema } from './like';
import { UserSchema } from './user';

export interface CommentSchemaRaw {
    body: string;
    likes: LikeSchema[];
    author: UserSchema;
    createdBy?: string;
    created: Date;
    edited: Date;
}

export type CommentSchema = CommentSchemaRaw & mongoose.Document;

export const commentSchema = new mongoose.Schema<CommentSchema>({
    body: String,
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

export const commentModel = mongoose.model<CommentSchema>('Comment', commentSchema);
