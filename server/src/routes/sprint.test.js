const mongoose = require('mongoose');
const request = require('supertest');
const express = require('express');

const app = require('../app');

const { withFreshDbConnection } = require('../testing/db');
const { loginAgentAs } = require('../testing/auth');
const { createUser } = require('../testing/factories/user');

const Comment = mongoose.model('Comment');
const Like = mongoose.model('Like');
const Sprint = mongoose.model('Sprint');
const Project = mongoose.model('Project');
const Post = mongoose.model('Post');

withFreshDbConnection();

describe('sprint', () => {
    const agent = request.agent(app);
    const loginAs = loginAgentAs(agent);
    const userCredentials = { email: 'aa@aa.aa', password: 'password' };

    // Instances used by test cases.
    // Initially null, populated in `beforeEach`.
    let user = null;

    beforeEach(() => {
        return createUser(userCredentials).then((createdUser) => {
            user = createdUser;
        });
    });

    describe('authenticated user', () => {
        beforeEach(() => {
            const { email, password } = userCredentials;
            return loginAs(email, password);
        });

        afterEach(() => {
            return agent.post('/auth/logout');
        });

        test('can fetch a simple object', async () => {
            await Sprint.create({ title: 'title' });

            const resp = await agent.get('/sprints');
            await expect(resp).toMatchObject({
                statusCode: 200,
                body: expect.arrayContaining([expect.objectContaining({ title: 'title' })]),
            });
        });

        test('can fetch a complex object', async () => {
            const like = await Like.create({ type: 'likeType' });
            const comment = await Comment.create({ body: 'commentBody', like: like.id });
            const post = await Post.create({ body: 'postBody' });
            await Sprint.create({ title: 'title', comments: [comment.id], posts: [post.id] });

            const resp = await agent.get('/sprints');
            await expect(resp).toMatchObject({
                statusCode: 200,
                body: expect.arrayContaining([
                    expect.objectContaining({
                        title: 'title',
                        posts: [expect.objectContaining({ body: 'postBody' })],
                        comments: [
                            expect.objectContaining({
                                body: 'commentBody',
                                likes: [
                                    /*FIXME*/
                                ],
                            }),
                        ],
                    }),
                ]),
            });
        });

        test('can create', async () => {
            const resp = await agent.post('/sprints').send({ title: 'title', body: 'body' });

            await expect(resp).toEqual(expect.objectContaining({ statusCode: 201 }));
            await expect(Sprint.find({})).resolves.toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        title: 'title',
                        body: 'body',
                        author: user._id,
                    }),
                ])
            );
        });

        test('can delete owned', async () => {
            const sprint = await Sprint.create({ title: 'title', author: user._id });

            const resp = await agent.delete(`/sprints/${sprint._id}`);

            await expect(resp).toMatchObject({ statusCode: 202 });
            await expect(Sprint.find({})).resolves.toHaveLength(0);
        });
    });

    describe('unauthenticated user', () => {
        test('cannot create', () => {
            return agent
                .post('/sprints')
                .send({ title: 'title' })
                .then((resp) => {
                    return expect(resp).toMatchObject({
                        statusCode: 401,
                    });
                });
        });
    });
});
