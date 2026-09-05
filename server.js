import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import app from './server/app.js';

// Port configuration (Vercel/Heroku/Cloud Run or 3000 default)
const PORT = process.env.PORT || 3000;

// --- VITE MIDDLEWARE FOR DEV & STATIC SERVING FOR PRODUCTION ---
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (req, res) => {
        // Exclude API requests from fallback index.html redirect
        if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) {
          return res.status(404).json({ success: false, error: 'Route not found' });
        }
        res.sendFile(path.join(distPath, 'index.html'));
      });
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 HYIP Monitor Pro Server running on port ${PORT}`);
  });
}

startServer();

export default app;
