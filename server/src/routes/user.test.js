import mongoose from 'mongoose';
import request from'supertest';
import express from 'express';
import app from '../app';
import { loginAgentAs } from '../testing/auth';
import { createUsers } from '../testing/factories/user';
import { withFreshDbConnection } from '../testing/db';

const User = mongoose.model('User');
// const Comment = mongoose.model('Comment');
// const Sprint = mongoose.model('Sprint');
const Team = mongoose.model('Team');

withFreshDbConnection();

describe('user', () => {
    const agent = request.agent(app);
    const loginAs = loginAgentAs(agent);

    describe('get', () => {
        test('list of users', async () => {
            const team = await Team.create({});
            const [userA, userB] = await createUsers([
                { email: 'emailA', password: 'passwordA', team: team._id },
                { email: 'emailB', password: 'passwordB', team: team._id },
            ]);
            return agent.get('/users').then((resp) => {
                expect(resp.statusCode).toBe(200);
                // Check the returned objects' ids only not to overfit the test.
                expect(resp.body.map((user) => user._id).sort()).toEqual(expect.arrayContaining([userA.id, userB.id]));
            });
        });
    });

    describe('update', () => {
        test('self', async () => {
            const team = await Team.create({});
            const [actingUser, otherUser] = await createUsers([
                { email: 'emailA', password: 'passwordA' },
                { email: 'emailB', password: 'passwordB' },
            ]);

            await loginAs('emailA', 'passwordA');

            const newTeam = await Team.create({});
            await agent
                .put(`/users/${actingUser._id}`)
                .send({ publicName: 'updatedPublicName' })
                .then((resp) => {
                    expect(resp.statusCode).toBe(202);
                });

            // Fetch the user from DB, see if it got updated.
            await expect(User.findById(actingUser._id)).resolves.toMatchObject({ publicName: 'updatedPublicName' });
        });
    });
});
