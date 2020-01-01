// TODO: split the backend into smaller modules, test each one separately

const mongoose = require('mongoose');
const request = require('supertest');
const express = require('express');

const app = require('./app');

describe('app', () => {
    // Connect to a temporary database.
    // Will clean all data after each test.
    beforeAll(() =>
        mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    );

    afterAll(() => mongoose.disconnect());

    describe('whoami', () => {
        test('returns OK status code', () => {
            return request(app)
                .get('/api/whoami')
                .then(resp => {
                    expect(resp).toMatchObject({ statusCode: 200 });
                });
        });
    });
});
