import serverless from 'serverless-http';
import express from 'express';
import { apiRouter } from '../../server/app.js';

// Create a lightweight Express wrapper dedicated for Netlify Functions
const netlifyApp = express();

// Parse json & urlencoded bodies
netlifyApp.use(express.json({ limit: '10mb' }));
netlifyApp.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Mount the api router at both '/.netlify/functions/api' and '/api' and root '/'
// to handle all redirect styles cleanly
netlifyApp.use(['/.netlify/functions/api', '/api', '/'], apiRouter);

const handler = serverless(netlifyApp);

export { handler };
