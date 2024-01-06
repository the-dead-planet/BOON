import mongoose from 'mongoose';
import { LikeSchema } from './like';
import { UserSchema } from './user';

export type CommentSchema = mongoose.Document & {
    body: string;
    likes: LikeSchema[];
    author: UserSchema;
    created: Date;
    edited: Date;
}

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
