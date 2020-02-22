const mongoose = require('mongoose');
const request = require('supertest');
const express = require('express');

const app = require('../app');

const UserAuth = mongoose.model('UserAuth');
const Comment = mongoose.model('Comment');
const Sprint = mongoose.model('Sprint');

describe('sprint comment', () => {
    const agent = request.agent(app);
    const userCredentials = { email: 'aa@aa.aa', password: 'password' };

    // Instances used by test cases.
    // Initially null, populated in `beforeEach`.
    let sprint = null;
    let userAuth = null;

    beforeAll(() => {
        // Connect to a temporary database.
        // Will clean all data after each test run.
        const dbPromise = mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Register a user.
        const userPromise = dbPromise.then(() =>
            UserAuth.register(UserAuth({ username: userCredentials.email }), userCredentials.password).then(
                createdUserAuth => {
                    userAuth = createdUserAuth;
                }
            )
        );

        return userPromise;
    });

    afterAll(() =>
        UserAuth.deleteOne({ username: userCredentials.email })
            .exec()
            .then(() => mongoose.disconnect())
    );

    beforeEach(() =>
        Sprint.create({ number: 1, name: 'sprint' }).then(createdSprint => {
            // Expose the crated variable to all test cases.
            sprint = createdSprint;
        })
    );

    describe('authenticated user', () => {
        beforeEach(() => {
            // Log the user in before each test case.
            return agent
                .post('/login')
                .send(`email=${userCredentials.email}`)
                .send(`password=${userCredentials.password}`)
                .then(resp => {
                    expect(resp).toMatchObject({
                        statusCode: 201,
                        body: { user: { username: userCredentials.email } },
                    });
                });
        });

        afterEach(() => {
            return agent.post('/logout');
        });

        test('can comment', () => {
            return agent
                .post('/api/comments')
                .send({ id: sprint._id, model: 'Sprint', comment: 'comment text' })
                .then(resp => {
                    return expect(resp).toMatchObject({
                        statusCode: 201,
                    });
                });
        });

        test('unknown sprintId', () => {
            return agent
                .post('/api/comments')
                .send({ id: '1234567890ab', model: 'Sprint', comment: 'comment text' })
                .then(resp => {
                    return expect(resp).toMatchObject({
                        statusCode: 404,
                        body: { detail: {} },
                    });
                });
        });

        test('can delete a comment', () => {
            return Promise.resolve()
                .then(() =>
                    Comment.create({
                        body: 'comment',
                        author: { id: userAuth._id },
                        commentedObject: { model: 'Sprint', id: sprint._id },
                    })
                )
                .then(comment => agent.delete(`/api/comments/${comment._id}`))
                .then(resp => {
                    return expect(resp).toMatchObject({
                        statusCode: 202,
                    });
                });
        });
    });

    describe('unauthenticated user', () => {
        test('cannot comment', () => {
            return agent
                .post('/api/comments')
                .send({ sprintId: sprint._id, comment: 'comment text' })
                .then(resp => {
                    return expect(resp).toMatchObject({
                        statusCode: 401,
                    });
                });
        });
    });
});
