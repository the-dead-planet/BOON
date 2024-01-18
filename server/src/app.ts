import { promises as fs } from 'fs';
import { Hono } from 'hono';
import { type Context } from 'hono';
import { swaggerUI } from '@hono/swagger-ui';
import { logger } from 'hono/logger';
import * as db from './db.ts';
import { User } from './schema.ts';

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

    const usersApp = new Hono();
    usersApp.get('/', async (c: Context) => c.json(await db.listUsers(database)));
    usersApp.get('/:id', async (c: Context) => c.json(await db.getUser(database, c.req.param('id'))));
    usersApp.post('/', async (c: Context) => {
        const { name } = await c.req.json();
        const insertedId = await db.addUser(database, { name });
        return c.json(insertedId);
    });

    const postsApp = new Hono();
    postsApp.get('/', async (c: Context) => c.json(await db.listPosts(database)));
    postsApp.get('/:id', async (c: Context) => c.json(await db.getPost(database, c.req.param('id'))));
    postsApp.post('/', async (c: Context) => {
        const { content } = await c.req.json();
        const insertedId = await db.addPost(database, { content });
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
    app.route('/users', usersApp);
    app.route('/posts', postsApp);

    return app;
}
