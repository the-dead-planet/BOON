import { Hono } from 'hono';
import { type Context } from 'hono';
import { logger } from 'hono/logger';
import * as db from './db.ts';

export function buildApp(database: db.Database): Hono {
    const app = new Hono();

    // Middleware.
    app.use('*', logger());

    // Routers.
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

    app.get('/', (c: Context) => {
        return c.text('Henlo!');
    });

    // Main router.
    app.route('/users', usersApp);
    app.route('/posts', postsApp);

    return app;
}
