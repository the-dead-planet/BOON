/**
 * A trivial testing "framework" and all tests. Simple, but it does the trick.
 *
 * I got tired of trying to make existing, fancy frameworks work with Typescript, ES modules, etc.
 */

// @ts-ignore
import { strict as assert } from 'node:assert';
import { buildApp } from './src/app.js';

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

test('posts', async () => {
    const app = buildApp();
    const res = await app.request('/posts');
    assert.equal(res.status, 200);
    assert.deepEqual(await res.json(), []);
});
