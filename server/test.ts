/**
 * A trivial testing "framework" and all tests. Simple, but it does the trick.
 *
 * I got tired of trying to make existing, fancy frameworks work with Typescript, ES modules, etc.
 */

// @ts-ignore
import { strict as assert } from 'node:assert';
import { buildApp } from './src/app';
import { connect } from './src/db';

async function test(label: string, f: () => Promise<void>) {
    console.log(`> ${label}`);
    try {
        await f();
        console.log('pass');
    } catch (e) {
        console.log(`fail: ${e}`);
    }
    console.log(`< ${label}`);
}

function postRequest(body: any): { method: 'POST'; body: string } {
    return { method: 'POST', body: JSON.stringify(body) };
}

// Test setup.
// At the moment, a single database is created once per test run, but shared by all test cases.
// If need be, we'll isolate test cases, too.
const now = new Date();
const testId = `TEST_${now.toISOString().replace('.', '_')}`;
console.log(`Test id: ${testId}`);

const { db, close } = await connect('mongodb://localhost:27017', testId);
const app = buildApp(db);

await test('posts', async () => {
    let resp: Response | null = null;

    // Create posts and store their ids.
    const posts = Array(2)
        .fill(null)
        .map((_, i) => ({ content: `Post ${i} content` }));
    let postIds: string[] = [];

    for (const post of posts) {
        resp = await app.request('/posts', postRequest(post));
        assert.equal(resp.status, 200);
        const postId = await resp.json();
        assert.notEqual(postId, undefined);
        postIds.push(postId);
    }

    // List posts.
    resp = await app.request('/posts');
    assert.equal(resp.status, 200);
    assert.deepEqual(
        await resp.json(),
        posts.map((post, i) => ({ ...post, _id: postIds[i] }))
    );

    // Get a specific post.
    resp = await app.request(`/posts/${postIds[0]}`);
    assert.equal(resp.status, 200);
    assert.deepEqual(await resp.json(), { ...posts[0], _id: postIds[0] });
});

await test('users', async () => {
    let resp: Response | null = null;

    // Create users and store their ids.
    const users = Array(2)
        .fill(null)
        .map((_, i) => ({ name: `User-${i}` }));
    let userIds: string[] = [];

    for (const user of users) {
        resp = await app.request('/users', postRequest(user));
        assert.equal(resp.status, 200);
        const userId = await resp.json();
        assert.notEqual(userId, undefined);
        userIds.push(userId);
    }

    // List users.
    resp = await app.request('/users');
    assert.equal(resp.status, 200);
    assert.deepEqual(
        await resp.json(),
        users.map((user, i) => ({ ...user, _id: userIds[i] }))
    );

    // Get a specific user.
    resp = await app.request(`/users/${userIds[0]}`);
    assert.equal(resp.status, 200);
    assert.deepEqual(await resp.json(), { ...users[0], _id: userIds[0] });
});

await close();
