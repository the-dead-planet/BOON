var mongodb = require('mongodb');
var Sprint = require('../models/Sprint');
var Post = require('../models/Post');
var Project = require('../models/Project');
var User = require('../models/User');
var Team = require('../models/Team');
var Comment = require('../models/Comment');
var Like = require('../models/Like');
const generateData = require('./seeds-data');

const seedDB = (password) => {
    const data = generateData(password);

    return removeData([Sprint, Post, Project, Team, Comment, Like, User])
        .then((res) => createTeams(data.teams))
        .then((teams) => createUsers(data.users, teams))
        .then((users) =>
            createProjects(data.projects, users)
                .then(() => createSprints(data.sprints, users))
                .then(() => createPosts(data.posts, users))
                .then(() => createComments(data.comments, users, [Sprint, Post]))
                .then(() => createLikes(data.likes, users, [Sprint, Post, Comment]))
        )
        .then(() => addIdReferences(Team, User, 'members'))
        .then(() => addIdReferences(Sprint, Post, 'posts'))
        .then(() => addIdReferences(Project, Post, 'posts'))
        .then(() => console.log('Finished creating data'));
};

// Remove data from all models
const removeData = (models) =>
    Promise.all(
        models.map((model) =>
            model
                .deleteMany({})
                .then((res) => console.log(res))
                .catch((err) => console.log(err))
        )
    );

// Create object based on seed data
const createObject = (model, data) =>
    model.create(data).then((object) => {
        // console.log(model, "created");
        return object;
    });

// Generic function to create all objects in one schema as promise.all
const createObjects = (create, data, ...args) => Promise.all(data.map((datum) => create(datum, ...args)));

// Create one team
const createTeam = (datum) =>
    createObject(Team, {
        title: datum.title,
        body: datum.body,
    });

// Create all teams
const createTeams = (data) => createObjects(createTeam, data);

// Create one user
const createUser = (datum) =>
    User.register(
        new User({
            username: datum.email,
            publicName: datum.publicName,
            role: datum.role,
            country: datum.country,
            joined: datum.joined,
            left: datum.left,
            skills: datum.skills,
            auth: datum.auth,
        }),
        datum.password
    );

// Create all users
const createUsers = (data) => createObjects(createUser, data);

// Create one project
const createProject = (datum, users) =>
    createObject(Project, {
        title: datum.title,
        body: datum.body,
        author: generateRandom(users)._id,
    });

// Create projects and assign a random user as the author
const createProjects = (data, users) => createObjects(createProject, data, users);

// Create one sprint
// Assign to a random user
// Create all posts associated with the sprint
const createSprint = (datum, users) =>
    createObject(Sprint, {
        number: datum.number,
        dateFrom: datum.dateFrom,
        dateTo: datum.dateTo,
        title: datum.title,
        body: datum.body,
        author: generateRandom(users)._id,
    });

// Create all sprints with their associated posts
const createSprints = (data, users) => createObjects(createSprint, data, users);

// Create one post
// Assign to a random user (author)
// Assign to a random project
// Add its ID to sprint.posts array
const createPost = (datum, users) =>
    createObject(Post, {
        title: datum.title,
        body: datum.body,
        author: generateRandom(users)._id,
    });

// Create all posts related to one sprint
const createPosts = (data, users) => createObjects(createPost, data, users);

// Create Comments
const createComment = (datum, users) =>
    createObject(Comment, {
        body: datum.body,
        author: generateRandom(users)._id,
    });

// Create comments and randomly add to sprints and posts .comments array
// One user can add multiple comments to multiple or the same object
const createComments = (data, users, models) =>
    Promise.all(
        models.map((model) =>
            model
                .find({})
                .then((objects) =>
                    objects.map((object) =>
                        Promise.all(
                            Array.from({ length: random(10) }, () => 1).map(() =>
                                createComment(data[random(data.length)], users).then((comment) =>
                                    object.comments.push(comment._id)
                                )
                            )
                        ).then(() => object.save())
                    )
                )
        )
    ).then(() => Comment.find({})); // TODO: workaround, without this likes were not populating for Comment schema

// Create Likes
const createLike = (datum, user) =>
    createObject(Like, {
        type: datum.type,
        author: user._id,
    });

// Create random likes and add to selected sprints and posts
// Max. one like per user-post or user-sprint combination
// Not all users have to give likes, not all objects need to receive likes
const createLikes = (data, users, models) =>
    models.map((model) =>
        model.find({}).then((objects) =>
            objects.map((object) =>
                Promise.all(
                    users
                        .filter((user, i) => i % random(users.length) === 0)
                        .map((user) =>
                            // console.log("Creating like in model", model, "for object", object.title)
                            createLike(data[random(data.length)], user).then((like) => object.likes.push(like._id))
                        )
                ).then(() => object.save())
            )
        )
    );

// Add ID references (only) to parent objects, e.g. project.posts, sprint.posts
// Distribute children evenly among all parent objects
const addIdReferences = (parentModel, childModel, attrName) =>
    parentModel.find({}).then((parents) =>
        childModel.find({}).then((children) =>
            parents.map((parent, parentInd) => {
                children
                    .filter((child, childInd) => parentInd === childInd % parents.length)
                    .map((child) => {
                        // console.log(`parent `, parentModel, ` adding child`, childModel)
                        return parent[attrName].push(child._id);
                    });
                return parent.save();
            })
        )
    );

const generateRandom = (objects) => {
    let object = objects[random(objects.length)];
    return object;
};

const random = (n) => Math.floor(Math.random() * n);

module.exports = seedDB;
