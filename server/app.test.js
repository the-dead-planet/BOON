// TODO: split the backend into smaller modules, test each one separately

const mongoose = require('mongoose');
const request = require('supertest');
const express = require('express');

const app = require('./app');

describe('app', () => {
    describe('whoami', () => {
        test('returns OK status code', () => {
            return request(app)
                .get('/api/whoami')
                .then(resp => {
                    expect(resp).toMatchObject({ statusCode: 200 });
                });
        });
    });

    // This line is required to let jest finish.
    afterAll(() => mongoose.disconnect());
});
