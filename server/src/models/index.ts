import mongoose from 'mongoose';
import userSchema from './auth-role';
import commentSchema from './comment';
import likeSchema from './like';
import postSchema from './post';
import projectSchema from './project';
import sprintSchema from './sprint';
import teamSchema from './team';

const Comment = mongoose.model('Comment', commentSchema);
const Like = mongoose.model('Like', likeSchema);
const Post = mongoose.model('Post', postSchema);
const Project = mongoose.model('Project', projectSchema);
const Sprint = mongoose.model('Sprint', sprintSchema);
const Team = mongoose.model('Team', teamSchema);
const User = mongoose.model('User', userSchema);

export {
    Comment,
    Like,
    Post,
    Project,
    Sprint,
    Team,
    User
};
