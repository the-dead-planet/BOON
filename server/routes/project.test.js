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
const Project = mongoose.model('Project');

withFreshDbConnection();

describe('project', () => {
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

    describe('authenticated user', () => {
        beforeEach(() => {
            const { email, password } = userCredentials;
            return loginAs(email, password);
        });

        afterEach(() => {
            return agent.post('/api/auth/logout');
        });

        test('can fetch projects', async () => {
            await Project.create({ title: 'oldProject' });

            const resp = await agent.get('/api/projects');
            await expect(resp).toMatchObject({
                statusCode: 200,
                body: expect.arrayContaining([expect.objectContaining({ title: 'oldProject' })]),
            });
        });

        test('can create a project', async () => {
            const resp = await agent.post('/api/projects').send({ title: 'title', body: 'body' });

            await expect(resp).toMatchObject({ statusCode: 201 });
            await expect(Project.find({})).resolves.toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
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

        test('can delete owned project', async () => {
            const project = await Project.create({ title: 'title', author: { id: user.userAuth._id } });

            const resp = await agent.delete(`/api/projects/${project._id}`);

            await expect(resp).toMatchObject({ statusCode: 202 });
            await expect(Project.find({})).resolves.toHaveLength(0);
        });
    });

    describe('unauthenticated user', () => {
        test('cannot create a project', () => {
            return agent
                .post('/api/projects')
                .send({ title: 'title', body: 'body' })
                .then(resp => {
                    return expect(resp).toMatchObject({
                        statusCode: 401,
                    });
                });
        });
    });
});
