var mongodb = require('mongodb');
var mongoose = require('mongoose');
var ObjectId = mongodb.ObjectID;
var Sprint = require('./models/Sprint');
var Post = require('./models/Post');
const data = require('./seeds-data');

const author = {
    id: '5e109cf282b7142980345126',
    username: 'kx@kx.com',
};

const seedDB = () => {
    // Remove all sprints and posts
    Sprint.remove({}, err => console.log({ err: 'Error removing sprints' })).then(
        Post.remove({}, err => console.log({ err: 'Error removing posts' }))
    );

    // Create new data
    data.forEach(seed => {
        let newSprint = {
            number: seed.number,
            dateFrom: seed.dateFrom,
            dateTo: seed.dateTo,
            title: seed.title,
            body: seed.body,
            author: author,
        };

        Sprint.create(newSprint)
            .then(sprint => {
                createSprintPosts(sprint, seed.posts);
            })
            .catch(err => console.log({ type: 'Error creating new sprint.', error: err }));
    });
};

const createSprintPosts = async (sprint, posts) => {
    for (const post of posts) {
        let newPost = {
            postedToObject: {
                model: 'Sprint',
                id: sprint._id,
            },
            title: post.title,
            body: post.body,
            author: author,
        };

        await Post.create(newPost)
            .then(post => {
                sprint.posts.push(post._id);
            })
            .catch(err => console.log({ type: 'Error creating new post.', error: err }));
    }

    sprint.save().then(() => console.log(`Sprint ${sprint.number} created successfully.`));
};

module.exports = seedDB;
