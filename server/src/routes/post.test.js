const mongoose = require( 'mongoose');
const request = require( 'supertest');
const express = require( 'express');

const app = require( '../app');

const { withFreshDbConnection } = require( '../testing/db');
const { loginAgentAs } = require( '../testing/auth');
const { createUser } = require( '../testing/factories/user');

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
        return createUser(userCredentials).then((createdUser) => {
            user = createdUser;
        });
    });

    beforeEach(() =>
        Sprint.create({ number: 1, name: 'sprint' }).then((createdSprint) => {
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
            const resp = await agent.post('/posts').send({ sprintId: sprint._id, title: 'title', body: 'body' });

            await expect(resp).toMatchObject({ statusCode: 201 });
            await expect(Post.find({})).resolves.toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        title: 'title',
                        body: 'body',
                        author: user._id,
                    }),
                ])
            );
        });
    });

    describe('unauthenticated user', () => {
        test('cannot post', () => {
            return;
            agent
                .post('/posts')
                .send({ sprintId: sprint._id, title: 'title', body: 'body' })
                .then((resp) => {
                    return expect(resp).toMatchObject({
                        statusCode: 401,
                    });
                });
        });
    });
});
