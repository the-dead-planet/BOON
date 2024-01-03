import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
    title: String,
    body: String,
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    created: {
        type: Date,
        default: Date.now,
    },
    edited: {
        type: Date,
        default: undefined,
    },
});

export default teamSchema;