const mongoose = require('mongoose');
const request = require('supertest');
const express = require('express');

// `app` must be one of the first imports. It triggers model registration on
// load.
const app = require('../app');

const { withFreshDbConnection } = require('../testing/db');
const { loginAgentAs } = require('../testing/auth');
const { createUser } = require('../testing/factories/user');

const UserAuth = mongoose.model('UserAuth');

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
                .post('/api/auth/login')
                .send(`email=${userCredentials.email}`)
                .send(`password=${userCredentials.password}`)
                .then(resp => {
                    expect(resp).toMatchObject({
                        statusCode: 200,
                        body: { user: { username: userCredentials.email } },
                    });
                });
        });

        test('rejects invalid password', () => {
            return agent
                .post('/api/auth/login')
                .send(`email=${userCredentials.email}`)
                .send(`password=wrong_password`)
                .expect(401);
        });

        test('rejects invalid email', () => {
            return agent
                .post('/api/auth/login')
                .send(`email=wrong@email.com`)
                .send(`password=${userCredentials.password}`)
                .expect(401);
        });
    });

    describe('register', () => {
        test('creates a new user object', () => {
            const username = 'username';
            return agent
                .post('/api/auth/register')
                .send(`email=some@email.com`)
                .send(`password=password`)
                .send(`team=team`)
                .send(`username=${username}`)
                .then(resp => {
                    expect(resp).toMatchObject({
                        statusCode: 201,
                        body: { user: { username } },
                    });
                })
                .then(() => {
                    // Check if a new User object has been saved in the database.
                    expect(User.find({ username })).resolves.toHaveLength(1);
                });
        });

        test('rejects a duplicate email', () => {
            return agent
                .post('/api/auth/register')
                .send(`email=${userCredentials.email}`)
                .send(`password=password`)
                .send(`team=team`)
                .send(`username=username`)
                .expect(500);
        });
    });

    describe('whoami', () => {
        test('handles unauthenticated users', () => {
            return agent.get('/api/auth/whoami').then(resp => {
                expect(resp).toMatchObject({ statusCode: 200, body: { user: null } });
            });
        });

        test('handles authenticated users', () => {
            return loginAs(userCredentials.email, userCredentials.password).then(() =>
                agent.get('/api/auth/whoami').then(resp => {
                    expect(resp).toMatchObject({
                        statusCode: 200,
                        body: { user: { username: userCredentials.email } },
                    });
                })
            );
        });
    });
});
