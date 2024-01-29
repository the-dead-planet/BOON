import { promises as fs } from 'fs';
import { Hono } from 'hono';
import { type Context } from 'hono';
import { swaggerUI } from '@hono/swagger-ui';
import { logger } from 'hono/logger';
import * as db from './db.js';
import { User } from './schema.js';

// TODO: use zod do parse request bodies.
export function buildApp(database: db.Database): Hono {
    const app = new Hono();

    // Middleware.
    app.use('*', logger());

    // Routers.
    const authApp = new Hono();
    authApp.get('/whoami', (c: Context) => {
        // TODO: actually look up the user and implement remaining auth routes.
        const fakeUser: User = { name: 'Mr fake user' };
        // FIXME: wrapper in a `{ user }` object for compatibility with the old API.
        // Seems redundant, so let's remove it when we're done migrating.
        return c.json({ user: fakeUser });
    });

    const commentsApp = new Hono();
    commentsApp.get('/', async (c: Context) => c.json(await db.listComments(database)));
    commentsApp.get('/:id', async (c: Context) => c.json(await db.getComment(database, c.req.param('id'))));
    commentsApp.post('/', async (c: Context) => {
        const { parent, ...body } = await c.req.json();
        const comment = { ...body, created: new Date(), likes: [] };
        const insertedId = await db.addComment(database, parent, comment);
        return c.json(insertedId);
    });

    const likesApp = new Hono();
    likesApp.get('/', async (c: Context) => c.json(await db.listLikes(database)));
    likesApp.get('/:id', async (c: Context) => c.json(await db.getLike(database, c.req.param('id'))));
    likesApp.post('/', async (c: Context) => {
        const { parent, parentType, ...body } = await c.req.json();
        const like = { ...body, created: new Date() };
        const insertedId = await db.addLike(database, parent, parentType, like);
        return c.json(insertedId);
    });

    const postsApp = new Hono();
    postsApp.get('/', async (c: Context) => c.json(await db.listPosts(database)));
    postsApp.get('/:id', async (c: Context) => c.json(await db.getPost(database, c.req.param('id'))));
    postsApp.post('/', async (c: Context) => {
        const body = await c.req.json();
        const post = { ...body, created: new Date(), comments: [], likes: [] };
        const insertedId = await db.addPost(database, post);
        return c.json(insertedId);
    });

    // Misc.
    app.get('/docs', swaggerUI({ url: '/spec' }));
    app.get('/spec', async (c: Context) => {
        const buffer = await fs.readFile('./openapi.yaml', 'utf-8');
        return c.text(buffer);
    });
    app.get('/', (c: Context) => {
        return c.text('BOON API. Documentation is available under /docs');
    });

    // Main router.
    app.route('/auth', authApp);
    app.route('/comments', commentsApp);
    app.route('/likes', likesApp);
    app.route('/posts', postsApp);

    return app;
}
