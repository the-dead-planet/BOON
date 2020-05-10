const mongoose = require('mongoose');
const request = require('supertest');
const express = require('express');

const app = require('../app');

const { withFreshDbConnection } = require('../testing/db');
const { loginAgentAs } = require('../testing/auth');
const { createUser } = require('../testing/factories/user');

const Comment = mongoose.model('Comment');
const Sprint = mongoose.model('Sprint');

withFreshDbConnection();

describe('sprint comment', () => {
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

        test('can delete a comment', () => {
            return Promise.resolve()
                .then(() =>
                    Comment.create({
                        body: 'comment',
                        author: user._id,
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
