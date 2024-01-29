import { serve } from '@hono/node-server';
import { buildApp } from './src/app.ts';
import { connect } from './src/db.ts';

const DB_URI = 'mongodb://localhost:27017';
const DB_NAME = process.env.PORT ?? 'boon';
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 5000;

console.log(`Connecting to MongoDB. URI=${DB_URI} DB_NAME=${DB_NAME}`);
const { db } = await connect(DB_URI, DB_NAME);
console.log('Connected to MongoDB');

console.log('Building an app');
const app = buildApp(db);

console.log(`Listening on port :${PORT}`);

serve({ fetch: app.fetch, port: PORT });
