import { promises as fs } from 'fs';
import { swaggerUI } from '@hono/swagger-ui';
import { Hono } from 'hono';
import { type Context } from 'hono';
import { logger } from 'hono/logger';
import * as db from './db.js';
import type { User } from './schema.js';

// TODO: use zod do parse request bodies.
export function buildApp(database: db.Database): Hono {
    const app = new Hono();

    // Middleware.
    app.use('*', logger());

    // Routers.
    const authApp = new Hono();
    authApp.get('/whoami', (c: Context) => {
        // TODO: actually look up the user and implement remaining auth routes.
        const fakeUser: User = { _id: '0', name: 'Mr fake user', email: 'fake@user.com', preferences: '{"darkMode":false}', created: new Date(), edited: null };
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
    likesApp.delete('/:id', async (c: Context) => {
        await db.removeLike(database, c.req.param('id'));
        return c.json(null);
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

    const sprintsApp = new Hono();
    sprintsApp.get('/', async (c: Context) => c.json(await db.listSprints(database)));
    sprintsApp.get('/:id', async (c: Context) => c.json(await db.getSprint(database, c.req.param('id'))));
    sprintsApp.post('/', async (c: Context) => {
        const body = await c.req.json();
        const sprint = { ...body, created: new Date(), posts: [], comments: [], likes: [] };
        const insertedId = await db.addSprint(database, sprint);
        return c.json(insertedId);
    });

    const projectsApp = new Hono();
    projectsApp.get('/', async (c: Context) => c.json(await db.listProjects(database)));
    projectsApp.get('/:id', async (c: Context) => c.json(await db.getProject(database, c.req.param('id'))));
    projectsApp.post('/', async (c: Context) => {
        const body = await c.req.json();
        const project = { ...body, created: new Date(), posts: [] };
        const insertedId = await db.addProject(database, project);
        return c.json(insertedId);
    });

    const teamsApp = new Hono();
    teamsApp.get('/', async (c: Context) => c.json(await db.listTeams(database)));
    teamsApp.get('/:id', async (c: Context) => c.json(await db.getTeam(database, c.req.param('id'))));
    teamsApp.post('/', async (c: Context) => {
        const body = await c.req.json();
        const team = { ...body, created: new Date() };
        const insertedId = await db.addTeam(database, team);
        return c.json(insertedId);
    });

    const usersApp = new Hono();
    usersApp.get('/', async (c: Context) => c.json(await db.listUsers(database)));
    usersApp.get('/:id', async (c: Context) => c.json(await db.getUser(database, c.req.param('id'))));
    usersApp.post('/', async (c: Context) => {
        const body = await c.req.json();
        const user = { ...body, created: new Date() };
        const insertedId = await db.addUser(database, user);
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
    app.route('/sprints', sprintsApp);
    app.route('/projects', projectsApp);
    app.route('/teams', teamsApp);
    app.route('/users', usersApp);

    return app;
}
