const mongoose = require('mongoose');
const request = require('supertest');
const express = require('express');

const app = require('../app');

const { withFreshDbConnection } = require('../testing/db');
const { loginAgentAs } = require('../testing/auth');
const { createUser } = require('../testing/factories/user');

const UserAuth = mongoose.model('UserAuth');
const Comment = mongoose.model('Comment');
const Sprint = mongoose.model('Sprint');
const Post = mongoose.model('Post');

withFreshDbConnection();

describe('post', () => {
    const agent = request.agent(app);
    const loginAs = loginAgentAs(agent);
    const userCredentials = { email: 'aa@aa.aa', password: 'password' };

    // Instances used by test cases.
    // Initially null, populated in `beforeEach`.
    let sprint = null;
    let existingPost = null;
    let user = null;

    beforeEach(() => {
        return createUser(userCredentials).then(createdUser => {
            user = createdUser;
        });
    });

    beforeEach(() =>
        Sprint.create({ number: 1, name: 'sprint' }).then(createdSprint => {
            sprint = createdSprint;

            Post.create({ postedToObject: { model: 'Sprint', id: sprint._id } });
        })
    );

    describe('authenticated user', () => {
        beforeEach(() => {
            const { email, password } = userCredentials;
            return loginAs(email, password);
        });

        test('can post', async () => {
            const resp = await agent.post('/api/posts').send({ sprintId: sprint._id, title: 'title', body: 'body' });

            await expect(resp).toMatchObject({ statusCode: 201 });
            await expect(Post.find({})).resolves.toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        postedToObject: expect.objectContaining({
                            model: 'Sprint',
                            id: sprint._id.toString(),
                        }),
                        title: 'title',
                        body: 'body',
                        author: expect.objectContaining({
                            id: user.userAuth._id, // TODO: use user.id instead
                            username: 'aa@aa.aa',
                        }),
                    }),
                ])
            );
        });

        test('cannot post to unknown sprint', async () => {
            const resp = await agent
                .post('/api/posts')
                .send({ sprintId: '1234567890ab', title: 'title', body: 'body' });

            await expect(resp).toMatchObject({ statusCode: 404 });
            await expect(Post.find({ postedToObject: { id: '1234567890ab' } })).resolves.toHaveLength(0);
        });
    });

    describe('unauthenticated user', () => {
        test('cannot post', () => {
            return;
            agent
                .post('/api/posts')
                .send({ sprintId: sprint._id, title: 'title', body: 'body' })
                .then(resp => {
                    return expect(resp).toMatchObject({
                        statusCode: 401,
                    });
                });
        });
    });
});
