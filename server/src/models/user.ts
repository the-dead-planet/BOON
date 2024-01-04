import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

export interface UserSchema extends mongoose.Document {
    _id: string;
    username: string;
    password: string;
    active: boolean;
    publicName: string;
    role: string;
    country: string;
    skills: string[];
    joined: Date;
    left: Date;
    created: Date;
    edited: Date;
    auth: string;
}

const userSchema = new mongoose.Schema({
    // Auth.
    username: String, // User's email. Passport expects the field to be named this way.
    password: String,

    // Active / Inactive (deleted)
    active: {
        type: Boolean,
        default: true,
    },

    // Other
    publicName: String, // Custom name displayed to other users.
    role: String,
    country: String,
    skills: [String],
    joined: {
        type: Date,
        default: undefined,
    },
    left: {
        type: Date,
        default: undefined,
    },
    created: {
        type: Date,
        default: Date.now,
    },
    edited: {
        type: Date,
        default: undefined,
    },
    // TODO: think how to store this attribute. Values: admin, standard user etc
    auth: String,
});

// Add methods from passport-local-mongoose (authenticate, register etc)
// Allow using also the public name to authenticate
userSchema.plugin(passportLocalMongoose, { usernameQueryFields: ['publicName'] });

export default userSchema;
