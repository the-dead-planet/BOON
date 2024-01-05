import mongoose from 'mongoose';
const Comment = mongoose.model('Comment');
const Sprint = mongoose.model('Sprint');
const Post = mongoose.model('Post');
const Like = mongoose.model('Like');

const models = {
    Sprint: Sprint,
    Post: Post,
    Comment: Comment,
    Like: Like,
};

export default models;
