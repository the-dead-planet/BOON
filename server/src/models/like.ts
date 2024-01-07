import mongoose from 'mongoose';
import { UserSchema } from './user';

export interface LikeSchemaRaw {
    type: string;
    author: UserSchema;
    created: Date;
}

export type LikeSchema = LikeSchemaRaw & mongoose.Document;

export const likeSchema = new mongoose.Schema<LikeSchema>({
    // TODO: possibly add a separate model for like type and allow selection on the front-end
    type: {
        type: String,
        default: 'Thumb up',
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    created: {
        type: Date,
        default: Date.now,
    },
});

export const likeModel = mongoose.model<LikeSchema>('Like', likeSchema);
