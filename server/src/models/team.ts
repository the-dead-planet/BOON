import mongoose from 'mongoose';
import { UserSchema } from './user';

export interface TeamSchemaRaw {
    title: string;
    body: string;
    members: UserSchema[];
    createdBy?: string;
    created: Date;
    edited: Date;
}

export type TeamSchema = TeamSchemaRaw & mongoose.Document;

export const teamSchema = new mongoose.Schema<TeamSchema>({
    title: String,
    body: String,
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
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

export const teamModel = mongoose.model<TeamSchema>('Team', teamSchema);
