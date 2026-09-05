// Vercel Serverless API Function Entry Point
import app from '../server/app.js';

export default function handler(req, res) {
  const matched = req.headers['x-matched-path'] || req.headers['x-vercel-matched-path'];
  if (matched && matched.startsWith('/api')) {
    req.url = matched;
  } else if (!req.url.startsWith('/api')) {
    req.url = '/api' + (req.url.startsWith('/') ? req.url : '/' + req.url);
  }
  return app(req, res);
}
