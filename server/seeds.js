var mongodb = require("mongodb");
var mongoose = require('mongoose');
var ObjectId = mongodb.ObjectID;
var Sprint = require('./models/Sprint');
var Post = require('./models/Post');
const data = require('./seeds-data');

const seedDB = () => {
    data.forEach(seed => {
        let newSprint = {
            number: seed.number,
            dateFrom: seed.dateFrom,
            dateTo: seed.dateTo,
            title: seed.title,
            body: seed.body,
            author: {
                id: ObjectId("5e109cf282b7142980345127"),
                username: 'kx',
            },
        };

        Sprint.create(newSprint)
            .then(sprint => {
                createSprintPosts(sprint, seed.posts);
            })
            .catch(err => console.log({ type: 'Error creating new sprint.', error: err }));
    })
}

const createSprintPosts = async (sprint, posts) => {

    for (const post of posts) {
        let newPost = {
            postedToObject: {
                model: 'Sprint',
                id: sprint._id,
            },
            title: post.title,
            body: post.body,
            author: {
                id: ObjectId("5e109cf282b7142980345127"),
                username: 'kx',
            },
        };

        await Post.create(newPost)
            .then(post => {
                sprint.posts.push(post._id);
            })
            .catch(err => console.log({ type: 'Error creating new post.', error: err }));
    }

    sprint.save().then(() => console.log(`Sprint ${sprint.number} created successfully.`));
}

module.exports = seedDB;