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
        console.trace(`fail: ${e}`);
    }
    console.log(`< ${label}`);
}

function postRequest(body: any): { method: 'POST'; body: string } {
    return { method: 'POST', body: JSON.stringify(body) };
}

/**
 * Recursively omit `keys` from `obj`.
 */
function omit(obj: object, keys: string[]): object {
    return JSON.parse(JSON.stringify(obj, (k, v) => (keys.includes(k) ? undefined : v)));
}

// Test setup.
// At the moment, a single database is created once per test run, but shared by all test cases.
// If need be, we'll isolate test cases, too.
const now = new Date();
const testId = `TEST_${now.toISOString().replace('.', '_')}`;
console.log(`Test id: ${testId}`);

const { db, close } = await connect('mongodb://localhost:27017', testId);
const app = buildApp(db);

await test('auth', async () => {
    const resp = await app.request('/auth/whoami');
    assert.equal(resp.status, 200);
    assert.deepEqual(await resp.json(), { user: { name: 'Mr fake user' } });
});

await test('post, comment, like', async () => {
    let resp: Response | null = null;

    // Author is hardcoded.
    const author = { name: 'Mr fake user' };

    // Create a post.
    const postCreate = { title: 'Post title', content: 'Post content' };
    resp = await app.request('/posts', postRequest(postCreate));
    assert.equal(resp.status, 200);
    const postId = await resp.json();
    assert.notEqual(postId, undefined);

    // Add a comment.
    const commentCreate = { body: 'Comment body', parent: postId };
    resp = await app.request('/comments', postRequest(commentCreate));
    assert.equal(resp.status, 200);
    const commentId = await resp.json();
    assert.notEqual(commentId, undefined);

    // Like the comment.
    const likeCreate = { type: 'Heart', parent: commentId, parentType: 'comment' };
    resp = await app.request('/likes', postRequest(likeCreate));
    assert.equal(resp.status, 200);
    const likeId = await resp.json();
    assert.notEqual(likeId, undefined);

    // Read the post.
    resp = await app.request(`/posts/${postId}`);
    assert.equal(resp.status, 200);
    const post = await resp.json();
    assert.notEqual(post, undefined);
    assert.deepEqual(omit(post, ['created']), {
        _id: postId,
        author,
        title: postCreate.title,
        content: postCreate.content,
        comments: [
            {
                _id: commentId,
                author,
                body: commentCreate.body,
                likes: [{ _id: likeId, author, type: likeCreate.type }],
            },
        ],
        likes: [],
    });
});

await close();
