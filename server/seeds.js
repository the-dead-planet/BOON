var mongodb = require('mongodb');
var mongoose = require('mongoose');
var ObjectId = mongodb.ObjectID;
var Sprint = require('./models/Sprint');
var Post = require('./models/Post');
var Project = require('./models/Project');
var UserAuth = require('./models/UserAuth');
var User = require('./models/User');
const data = require('./seeds-data');

// TODO: review again async behavior
const seedDB = () => {
    removeData();
    createUsers(data.users).then(users => {
        createProjects(data.projects, users).then(projects => {
            createSprintsPosts(data.sprints, users, projects);
        });
    });
};

// Remove data from all schemas
const removeData = () => {
    Sprint.deleteMany({}, err => console.log(err ? { err: err } : 'Sprints deleted'));
    Post.deleteMany({}, err => console.log(err ? { err: err } : 'Posts deleted'));
    Project.deleteMany({}, err => console.log(err ? { err: err } : 'Projects deleted'));
    User.deleteMany({}, err => console.log(err ? { err: err } : 'Users deleted'));
    UserAuth.deleteMany({}, err => console.log(err ? { err: err } : 'UserAuths deleted'));
};

// Create userauths and users
const createUsers = async users => {
    console.log('Start creating users');
    let newUsers = [];

    for (const user of users) {
        const userAuth = await UserAuth.register(
            new UserAuth({
                username: user.email,
            }),
            user.password
        );

        // TODO: Add check if username also already exists or not
        newUsers.push(
            await User.create(
                new User({
                    userAuth: userAuth._id,
                    username: user.username,
                    role: user.role,
                    team: user.team,
                    country: user.country,
                    joined: user.joined,
                    left: user.left,
                    skills: user.skills,
                    auth: user.auth,
                })
            )
        );
        console.log(`User ${user.username} created`);
    }

    console.log('Finished creating users');
    return newUsers;
};

// Create projects and assign a random user as the author
const createProjects = async (projects, users) => {
    console.log('Start creating projects');
    let newProjects = [];

    for (const project of projects) {
        let author = generateAuthor(users);

        newProjects.push(
            await Project.create({
                title: project.title,
                body: project.body,
                author: author,
            })
        );
        console.log(`Project ${project.title} created`);
    }

    console.log('Finished creating projects');
    return newProjects;
};

// Create new data for sprints and posts and assign random user to each single sprint and post
// Assign random project to each post
const createSprintsPosts = async (sprints, users, projects) => {
    console.log('Start creating sprints');
    let newSprints = [];

    for (const sprint of sprints) {
        let author = generateAuthor(users);

        const newSprint = await Sprint.create({
            number: sprint.number,
            dateFrom: sprint.dateFrom,
            dateTo: sprint.dateTo,
            title: sprint.title,
            body: sprint.body,
            author: author,
        });

        newSprints.push(newSprint);
        createPosts(newSprint, sprint.posts, projects, users);
    }

    console.log('Finished creating sprints');
    return newSprints;
};

// Assign random user (as author) and random project to each post
const createPosts = async (sprint, posts, projects, users) => {
    console.log(`Start creating posts in sprint ${sprint.number}`);

    for (const post of posts) {
        let author = generateAuthor(users);

        await Post.create({
            postedToObject: {
                model: 'Sprint',
                id: sprint._id,
            },
            project: generateProjectId(projects),
            title: post.title,
            body: post.body,
            author: author,
        })
            .then(post => {
                sprint.posts.push(post._id);
            })
            .catch(err => console.log({ type: 'Error creating new post.', error: err }));
    }

    sprint.save().then(() => console.log(`Sprint ${sprint.number} and related posts are created successfully.`));
};

const generateAuthor = users => {
    let user = users[Math.floor(Math.random() * users.length)];
    let author = {
        id: user.userAuth,
        username: user.username,
    };

    return author;
};

const generateProjectId = projects => {
    let project = projects[Math.floor(Math.random() * projects.length)];

    return project._id;
};

module.exports = seedDB;
