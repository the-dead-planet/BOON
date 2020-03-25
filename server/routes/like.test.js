const mongoose = require('mongoose');
const request = require('supertest');
const express = require('express');

const app = require('../app');

const { withFreshDbConnection } = require('../testing/db');
const { loginAgentAs } = require('../testing/auth');
const { createUser } = require('../testing/factories/user');

const Comment = mongoose.model('Comment');
const Sprint = mongoose.model('Sprint');
const Like = mongoose.model('Like');

withFreshDbConnection();

// TODO - extract common pieces to testing/
// TODO - define top level tests using a base scenario and variations, e.g.
//  - base scenario: post request
//  - variations: login or lack thereof, duplicates, nonexistent dependencies
describe('sprint like', () => {
    const agent = request.agent(app);
    const loginAs = loginAgentAs(agent);
    const userCredentials = { email: 'aa@aa.aa', password: 'password' };

    // Instances used by test cases.
    // Initially null, populated in `beforeEach`.
    let sprint = null;
    let user = null;

    beforeEach(() => {
        // Register a user.
        return createUser(userCredentials).then(createdUser => {
            user = createdUser;
        });
    });

    beforeEach(() =>
        Sprint.create({ number: 1, name: 'sprint' }).then(createdSprint => {
            // Expose the crated variable to all test cases.
            sprint = createdSprint;
        })
    );

    describe('authenticated user', () => {
        beforeEach(() => {
            const { email, password } = userCredentials;
            return loginAs(email, password);
        });

        afterEach(() => {
            return agent.post('/api/auth/logout');
        });

        test('can like', async () => {
            const resp = await agent.post('/api/likes').send({ id: sprint._id, model: 'Sprint', type: 'likeType' });

            await expect(resp).toMatchObject({ statusCode: 201 });
            await expect(Like.find({})).resolves.toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        type: 'likeType',
                    }),
                ])
            );
        });

        test.skip('cannot like unknown sprint', async () => {
            const resp = await agent.post('/api/likes').send({ id: '1234567890ab', model: 'Sprint', type: 'likeType' });
            console.log(resp);

            await expect(resp).toMatchObject({ statusCode: 404 });
            await expect(Like.find({})).resolves.toHaveLength(0);
        });
    });

    describe('unauthenticated user', () => {
        test('cannot like', () => {
            return agent
                .post('/api/likes')
                .send({ id: sprint._id, model: 'Sprint', type: 'likeType' })
                .then(resp => {
                    return expect(resp).toMatchObject({
                        statusCode: 401,
                    });
                });
        });
    });
});
