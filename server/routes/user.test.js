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

describe('user', () => {
    const agent = request.agent(app);

    // TODO: move common test code to a standalone module
    beforeEach(() =>
        mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    );

    afterEach(() => mongoose.disconnect());

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
});
