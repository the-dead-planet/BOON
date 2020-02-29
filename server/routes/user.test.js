const mongoose = require('mongoose');
const request = require('supertest');
const express = require('express');

const app = require('../app');

const UserAuth = mongoose.model('UserAuth');
const User = mongoose.model('User');
const Comment = mongoose.model('Comment');
const Sprint = mongoose.model('Sprint');

const createUser = ({ email, password, team }) =>
    UserAuth.register(UserAuth({ username: email }), password).then(userAuth =>
        User.create(User({ userAuth: userAuth._id, username: email, team }))
    );

const createUsers = users => Promise.all(users.map(user => createUser(user)));

// Utility function to login the `agent` (i.e. an object maintaining the
// connection with the server, mimicking a browser) using `user`'s data.
// Note, that this is a Higher Order Function (HOF) - it takes an argument
// (`agent`),and returns a function that takes one argument (`user`) that
// produces a result. It's done for convenience - the agent will be applied
// in the test description, while the second function will be used in test's body.
// The same behaviour could be implemented with `bind`.
const loginAgentAs = agent => async (email, password) => {
    await agent
        .post('/api/auth/login')
        .send(`email=${email}`)
        .send(`password=${password}`)
        .expect(201);
    return agent;
};

describe('user', () => {
    const agent = request.agent(app);
    const loginAs = loginAgentAs(agent);

    // TODO: move common test code to a standalone module
    beforeEach(() =>
        mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    );

    afterEach(async () => {
        await User.deleteMany();
        await UserAuth.deleteMany();
        await mongoose.disconnect();
    });

    describe('get', () => {
        test('list of users', async () => {
            const [userA, userB] = await createUsers([
                { email: 'emailA', password: 'passwordA', team: 'teamA' },
                { email: 'emailB', password: 'passwordB', team: 'teamB' },
            ]);
            return agent.get('/api/users').then(resp => {
                expect(resp.statusCode).toBe(200);
                // Check the returned objects' ids only not to overfit the test.
                expect(resp.body.map(user => user._id).sort()).toEqual(expect.arrayContaining([userA.id, userB.id]));
            });
        });
    });

    describe('update', () => {
        test('self', async () => {
            const [actingUser, otherUser] = await createUsers([
                { email: 'emailA', password: 'passwordA', team: 'teamA' },
                { email: 'emailB', password: 'passwordB', team: 'teamB' },
            ]);

            await loginAs('emailA', 'passwordA');

            await agent
                .put(`/api/users/${actingUser._id}`)
                .send({ team: 'teamC' })
                .then(resp => {
                    expect(resp.statusCode).toBe(200);
                });

            // Fetch the user from DB, see if it got updated.
            await expect(User.findById(actingUser._id)).resolves.toMatchObject({ team: 'teamC' });
        });
    });
});
