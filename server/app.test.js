// TODO: split the backend into smaller modules, test each one separately

const mongoose = require('mongoose');
const request = require('supertest');
const express = require('express');

const app = require('./app');

const UserAuth = mongoose.model('UserAuth');

describe('app', () => {
    const userCredentials = { email: 'aa@aa.aa', password: 'password' };

    beforeAll(() => {
        // Connect to a temporary database.
        // Will clean all data after each test run.
        const dbPromise = mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Register a user.
        const userPromise = dbPromise.then(() =>
            UserAuth.register(UserAuth({ username: userCredentials.email }), userCredentials.password)
        );

        return userPromise;
    });

    afterAll(() => mongoose.disconnect());

    describe('login', () => {
        test('logs an existing user in', () => {
            return request(app)
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

        test('rejects invalid password', () => {
            return request(app)
                .post('/login')
                .send(`email=${userCredentials.email}`)
                .send(`password=wrong_password`)
                .expect(401);
        });

        test('rejects invalid email', () => {
            return request(app)
                .post('/login')
                .send(`email=wrong@email.com`)
                .send(`password=${userCredentials.password}`)
                .expect(401);
        });
    });

    describe('whoami', () => {
        // Use an `agent` instead of `request` to persist state across requests.
        // This approach allows accessing the API as a logged in user.
        const agent = request.agent(app);

        const authenticate = () =>
            agent
                .post('/login')
                .send(`email=${userCredentials.email}`)
                .send(`password=${userCredentials.password}`)
                .then(resp => {
                    if (resp.statusCode !== 201) {
                        return Promise.reject(`Authentication failed: ${resp.statusCode}`);
                    }
                });

        test('handles unauthenticated users', () => {
            return agent.get('/api/whoami').then(resp => {
                expect(resp).toMatchObject({ statusCode: 200, body: {} });
            });
        });

        test('handles authenticated users', () => {
            return authenticate().then(() =>
                agent.get('/api/whoami').then(resp => {
                    expect(resp).toMatchObject({ statusCode: 200, body: { username: userCredentials.email } });
                })
            );
        });
    });
});
