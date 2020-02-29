const mongoose = require('mongoose');
const request = require('supertest');
const express = require('express');

const app = require('../app');

const { loginAgentAs } = require('../testing/auth');
const { createUsers } = require('../testing/factories/user');
const { withFreshDbConnection } = require('../testing/db');

const UserAuth = mongoose.model('UserAuth');
const User = mongoose.model('User');
const Comment = mongoose.model('Comment');
const Sprint = mongoose.model('Sprint');

withFreshDbConnection();

describe('user', () => {
    const agent = request.agent(app);
    const loginAs = loginAgentAs(agent);

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
