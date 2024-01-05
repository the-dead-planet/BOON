import mongoose from 'mongoose';
import request from 'supertest';
import express from 'express';

import app from '../app';

import { withFreshDbConnection } from '../testing/db';
import { loginAgentAs } from'../testing/auth';
import { createUser } from '../testing/factories/user';

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
        return createUser(userCredentials).then((createdUser) => {
            user = createdUser;
        });
    });

    beforeEach(() =>
        Sprint.create({ number: 1, name: 'sprint' }).then((createdSprint) => {
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
            return agent.post('/auth/logout');
        });

        test('can comment', async () => {
            const resp = await agent
                .post('/comments')
                .send({ id: sprint._id, model: 'Sprint', comment: 'comment text' });

            expect(resp).toEqual(
                expect.objectContaining({
                    statusCode: 201,
                })
            );

            const createdCommentId = resp.body._id;

            // Fetch the object from the database to make sure its properties are updated.
            const updatedSprint = await Sprint.findById(sprint._id);
            expect(updatedSprint.comments).toHaveLength(1);
            expect(updatedSprint.comments).toContainEqual(expect.toMatchMongooseId(createdCommentId));
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
                .then((comment) => agent.delete(`/comments/${comment._id}`))
                .then((resp) => {
                    return expect(resp).toMatchObject({
                        statusCode: 202,
                    });
                });
        });
    });

    describe('unauthenticated user', () => {
        test('cannot comment', () => {
            return agent
                .post('/comments')
                .send({ sprintId: sprint._id, comment: 'comment text' })
                .then((resp) => {
                    return expect(resp).toMatchObject({
                        statusCode: 401,
                    });
                });
        });
    });
});
