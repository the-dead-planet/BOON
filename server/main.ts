import { serve } from '@hono/node-server';
import { buildApp } from './src/app.ts';

const PORT = 3000;

const app = buildApp();

console.log(`Listening on port :${PORT}`);

serve({ fetch: app.fetch, port: PORT });
