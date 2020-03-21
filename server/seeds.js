var mongodb = require('mongodb');
var mongoose = require('mongoose');
var ObjectId = mongodb.ObjectID;
var Sprint = require('./models/Sprint');
var Post = require('./models/Post');
var Project = require('./models/Project');
var UserAuth = require('./models/UserAuth');
var User = require('./models/User');
var Team = require('./models/Team');
const data = require('./seeds-data');

const schemas = [Sprint, Post, Project, Team, User, UserAuth];

// TODO: add generate teams
const seedDB = () =>
    removeData()
        .then(res => createTeams(data.teams))
        .then(teams => createUsers(data.users, teams))
        .then(users =>
            createProjects(data.projects, users).then(projects => createSprints(data.sprints, projects, users))
        )
        .then(sprints =>
            [
                { parentObject: Sprint, childObject: Post, parentPropName: 'posts', childPropName: 'sprint' },
                { parentObject: Project, childObject: Post, parentPropName: 'posts', childPropName: 'project' },
                { parentObject: Team, childObject: User, parentPropName: 'users', childPropName: 'team' },
            ].map(obj => updateIdReferences(obj.parentObject, obj.childObject, obj.parentPropName, obj.childPropName))
        );

// Remove data from all schemas
const removeData = () =>
    Promise.all(
        schemas.map(schema =>
            schema
                .deleteMany({})
                .then(res => console.log(res))
                .catch(err => console.log(err))
        )
    );

// Create one team
const createTeam = teamData =>
    Team.create({
        title: teamData.title,
        body: teamData.body,
    }).then(team => {
        console.log(`Team ${team.title} created`);
        return team;
    });

// Create all teams
const createTeams = teamsData => Promise.all(teamsData.map(teamData => createTeam(teamData)));

// Create one user
const createUser = (user, teams) =>
    UserAuth.register(new UserAuth({ username: user.email }), user.password).then(userAuth =>
        User.create(
            new User({
                userAuth: userAuth._id,
                username: user.username,
                role: user.role,
                team: generateObject(teams)._id,
                country: user.country,
                joined: user.joined,
                left: user.left,
                skills: user.skills,
                auth: user.auth,
            })
        ).then(user => {
            console.log(`User ${user.username} created`);
            return user;
        })
    );

// Create all users
const createUsers = (users, teams) => Promise.all(users.map(user => createUser(user, teams)));

// Create one project
const createProject = (projectData, users) =>
    Project.create({
        title: projectData.title,
        body: projectData.body,
        author: generateAuthor(users),
    }).then(project => {
        console.log(`Project ${project.title} created`);
        return project;
    });

// Create projects and assign a random user as the author
const createProjects = (projectsData, users) =>
    Promise.all(projectsData.map(projectData => createProject(projectData, users)));

// Create one sprint
// Assign to a random user
// Create all posts associated with the sprint
const createSprint = (sprintData, projects, users) =>
    Sprint.create({
        number: sprintData.number,
        dateFrom: sprintData.dateFrom,
        dateTo: sprintData.dateTo,
        title: sprintData.title,
        body: sprintData.body,
        author: generateAuthor(users),
    }).then(sprint =>
        createPosts(sprint, sprintData.posts, projects, users).then(posts =>
            sprint.save().then(sprint => {
                console.log(`Sprint ${sprint.number} and related posts created`);
                return sprint;
            })
        )
    );

// Create all sprints with their associated posts
const createSprints = (sprintsData, projects, users) =>
    Promise.all(sprintsData.map(sprintData => createSprint(sprintData, projects, users)));

// Create one post
// Assign to a random user (author)
// Assign to a random project
// Add its ID to sprint.posts array
const createPost = (sprint, postData, projects, users) => {
    Post.create({
        sprint: sprint._id,
        project: generateObject(projects)._id,
        title: postData.title,
        body: postData.body,
        author: generateAuthor(users),
    }).then(post => {
        console.log(`Post ${post.title} created`);
        return post;
    });
};

// Create all posts related to one sprint
const createPosts = (sprint, postsData, projects, users) =>
    Promise.all(postsData.map(postData => createPost(sprint, postData, projects, users)));

// TODO: add the same for teams-users
// Add references to post ID's in project objects.
// Handling this in a separate method due to parallel save error: can't save() the same doc multiple times
const updateIdReferences = (parentObject, childObject, parentPropName, childPropName) => {
    return parentObject.find({}).then(parents =>
        childObject.find({}).then(children =>
            Promise.all(
                parents.map(parent => {
                    children
                        .filter(child => child[childPropName].equals(parent._id))
                        .map(child => parent[parentPropName].push(child._id));

                    parent.save();
                    return parent;
                })
            )
        )
    );
};

const generateAuthor = users => {
    let user = users[Math.floor(Math.random() * users.length)];
    let author = {
        id: user.userAuth,
        username: user.username,
    };

    return author;
};

const generateObject = objects => {
    let object = objects[Math.floor(Math.random() * objects.length)];
    return object;
};

module.exports = seedDB;
