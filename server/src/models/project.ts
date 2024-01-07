import mongoose from 'mongoose';
import { PostSchema } from './post';
import { UserSchema } from './user';

export interface ProjectSchemaRaw {
    title: string;
    body: string;
    posts: PostSchema[];
    author: UserSchema;
    createdBy?: string;
    created: Date;
    edited: Date;
}

export type ProjectSchema = ProjectSchemaRaw & mongoose.Document;

export const projectSchema = new mongoose.Schema<ProjectSchema>({
    title: String,
    body: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
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

export const projectModel = mongoose.model<ProjectSchema>('Project', projectSchema);
