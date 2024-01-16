import { Hono } from 'hono';
import { type Context } from 'hono';
import { logger } from 'hono/logger';
import * as db from './db.ts';

export function buildApp() {
    const app = new Hono();

    // Middleware.
    app.use('*', logger());

    // Routers.
    const usersApp = new Hono();
    usersApp.get('/', (c: Context) => c.json(db.listUsers()));
    usersApp.get('/:id', (c: Context) => c.json(db.getUser(c.req.param('id'))));
    usersApp.post('/', async (c: Context) => {
        const { id, name } = await c.req.json();
        db.addUser(id, name);
        return c.text('OK');
    });

    const postsApp = new Hono();
    postsApp.get('/', (c: Context) => c.json(db.listPosts()));
    postsApp.get('/:id', (c: Context) => c.json(db.getPost(c.req.param('id'))));
    postsApp.post('/', async (c: Context) => {
        const { id, content } = await c.req.json();
        db.addPost(id, content);
        return c.text('OK');
    });

    app.get('/', (c: Context) => {
        return c.text('Henlo!');
    });

    // Main router.
    app.route('/users', usersApp);
    app.route('/posts', postsApp);

    return app;
}
