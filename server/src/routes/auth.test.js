import mongoose from 'mongoose';
import request from 'supertest';
import express from 'express';

// `app` must be one of the first imports. It triggers model registration on load.
import app from '../app';

import { withFreshDbConnection } from '../testing/db';
import { loginAgentAs } from '../testing/auth';
import { createUser } from '../testing/factories/user';

const User = mongoose.model('User');
const Team = mongoose.model('Team');

withFreshDbConnection();

describe('app', () => {
    const agent = request.agent(app);
    const loginAs = loginAgentAs(agent);
    const userCredentials = { email: 'aa@aa.aa', password: 'password' };

    beforeEach(() =>
        // Register a user before each test. Useful for testing username conflicts.
        createUser(userCredentials)
    );

    describe('login', () => {
        test('logs an existing user in', () => {
            return agent
                .post('/auth/login')
                .send(`email=${userCredentials.email}`)
                .send(`password=${userCredentials.password}`)
                .then((resp) => {
                    expect(resp).toMatchObject({
                        statusCode: 200,
                        body: { user: { username: userCredentials.email } },
                    });
                });
        });

        test('rejects invalid password', () => {
            return agent
                .post('/auth/login')
                .send(`email=${userCredentials.email}`)
                .send(`password=wrong_password`)
                .expect(401);
        });

        test('rejects invalid email', () => {
            return agent
                .post('/auth/login')
                .send(`email=wrong@email.com`)
                .send(`password=${userCredentials.password}`)
                .expect(401);
        });
    });

    describe('register', () => {
        test('creates a new user object', async () => {
            const team = await Team.create({});

            // Note, that field named `email` is saved in the `username` field.
            // TODO: rename fields to make it a bit less confusing.
            const username = 'username';
            const email = 'some@email.com';

            return agent
                .post('/auth/register')
                .send(`email=${email}`)
                .send(`password=password`)
                .send(`team=${team._id}`)
                .send(`username=${username}`)
                .then((resp) => {
                    return expect(resp).toMatchObject({
                        statusCode: 201,
                        body: { user: { username: email } },
                    });
                })
                .then(() => {
                    // Check if a new User object has been saved in the database.
                    return expect(User.find({ username: email })).resolves.toHaveLength(1);
                });
        });

        test('rejects a duplicate email', () => {
            return agent
                .post('/auth/register')
                .send(`email=${userCredentials.email}`)
                .send(`password=password`)
                .send(`team=team`)
                .send(`username=username`)
                .expect(500);
        });
    });

    describe('whoami', () => {
        test('handles unauthenticated users', () => {
            return agent.get('/auth/whoami').then((resp) => {
                expect(resp).toMatchObject({ statusCode: 200, body: { user: null } });
            });
        });

        test('handles authenticated users', () => {
            return loginAs(userCredentials.email, userCredentials.password).then(() =>
                agent.get('/auth/whoami').then((resp) => {
                    expect(resp).toMatchObject({
                        statusCode: 200,
                        body: { user: { username: userCredentials.email } },
                    });
                })
            );
        });
    });
});
