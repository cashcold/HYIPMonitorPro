import express from 'express';
import path from 'path';
import fs from 'fs';
import os from 'os';
import cors from 'cors';
import { db } from './db.js';

const app = express();

// Enable CORS for cross-origin requests
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Resilient uploads directory configuration (supports both local disk and read-only serverless environments)
let uploadsDir = path.join(process.cwd(), 'uploads');
try {
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
} catch {
  uploadsDir = path.join(os.tmpdir(), 'hyip_uploads');
  try {
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
  } catch {
    // Read-only filesystem fallback
  }
}
app.use('/uploads', express.static(uploadsDir));

// Vercel path normalization middleware
app.use((req, res, next) => {
  const matchedPath = req.headers['x-matched-path'] || req.headers['x-vercel-matched-path'];
  if (matchedPath && (req.url === '/' || req.url === '/api' || req.url === '/api/index.js')) {
    req.url = matchedPath;
  }
  next();
});

// Create API Router to handle all endpoints
const apiRouter = express.Router();

// Root & Health check
apiRouter.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    serverless: true,
    platform: 'Vercel Serverless Function',
    timestamp: new Date().toISOString()
  });
});

apiRouter.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'HYIP Monitor Pro Serverless API running on Vercel',
    version: '1.0.0',
    endpoints: [
      '/api/statistics',
      '/api/projects',
      '/api/projects/:id',
      '/api/reviews',
      '/api/comments',
      '/api/votes',
      '/api/latest-payouts',
      '/api/latest-scams',
      '/api/reports',
      '/api/advertisements',
      '/api/settings',
      '/api/health'
    ]
  });
});

// 1. GET /statistics
apiRouter.get('/statistics', (req, res) => {
  try {
    const stats = db.getStats();
    res.json({ success: true, data: stats });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 2. GET /projects
apiRouter.get('/projects', (req, res) => {
  try {
    const projects = db.getProjects(req.query);
    res.json({ success: true, count: projects.length, data: projects });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3. GET /projects/:id
apiRouter.get('/projects/:id', (req, res) => {
  try {
    const project = db.getProjectById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }
    res.json({ success: true, data: project });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 4. POST /projects (Create project)
apiRouter.post('/projects', (req, res) => {
  try {
    const newProject = db.addProject(req.body);
    res.status(201).json({ success: true, data: newProject });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 4b. POST /projects/:id/approve (Admin approve pending project)
apiRouter.post('/projects/:id/approve', (req, res) => {
  try {
    const approved = db.approveProject(req.params.id, req.body.status || 'PAYING');
    if (!approved) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }
    res.json({ success: true, data: approved });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 5. PUT /projects/:id (Admin update)
apiRouter.put('/projects/:id', (req, res) => {
  try {
    const updated = db.updateProject(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 6. DELETE /projects/:id (Admin delete)
apiRouter.delete('/projects/:id', (req, res) => {
  try {
    const deleted = db.deleteProject(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }
    res.json({ success: true, data: deleted });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 7. GET /reviews
apiRouter.get('/reviews', (req, res) => {
  try {
    const reviews = db.getReviews(req.query.projectId);
    res.json({ success: true, count: reviews.length, data: reviews });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 8. POST /reviews
apiRouter.post('/reviews', (req, res) => {
  try {
    const newReview = db.addReview(req.body);
    res.status(201).json({ success: true, data: newReview });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 9. GET /comments
apiRouter.get('/comments', (req, res) => {
  try {
    const comments = db.getComments(req.query.projectId);
    res.json({ success: true, count: comments.length, data: comments });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 10. POST /comments
apiRouter.post('/comments', (req, res) => {
  try {
    const newComment = db.addComment(req.body);
    res.status(201).json({ success: true, data: newComment });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 11. POST /votes
apiRouter.post('/votes', (req, res) => {
  try {
    const { projectId, voteType } = req.body;
    const votes = db.addVote(projectId, voteType);
    if (!votes) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }
    res.json({ success: true, data: votes });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 12. GET /latest-payouts
apiRouter.get('/latest-payouts', (req, res) => {
  try {
    const payouts = db.getLatestPayouts();
    res.json({ success: true, count: payouts.length, data: payouts });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 13. GET /latest-scams
apiRouter.get('/latest-scams', (req, res) => {
  try {
    const scams = db.getLatestScams();
    res.json({ success: true, count: scams.length, data: scams });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 14. GET & POST /reports
apiRouter.get('/reports', (req, res) => {
  try {
    const reports = db.getReports();
    res.json({ success: true, data: reports });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

apiRouter.post('/reports', (req, res) => {
  try {
    const report = db.addReport(req.body);
    res.status(201).json({ success: true, data: report });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 15. GET & POST /advertisements
apiRouter.get('/advertisements', (req, res) => {
  try {
    const ads = db.getAdvertisements();
    res.json({ success: true, data: ads });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

apiRouter.post('/advertisements', (req, res) => {
  try {
    const ad = db.addAdvertisement(req.body);
    res.status(201).json({ success: true, data: ad });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 16. GET & PUT /settings
apiRouter.get('/settings', (req, res) => {
  try {
    res.json({ success: true, data: db.getSettings() });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

apiRouter.put('/settings', (req, res) => {
  try {
    const updated = db.updateSettings(req.body);
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 17. POST /upload (Safe for both disk and serverless read-only mode)
apiRouter.post('/upload', (req, res) => {
  try {
    const { imageBase64, filename } = req.body;
    if (!imageBase64) {
      return res.status(400).json({ success: false, error: 'No image provided' });
    }
    const name = filename || `upload_${Date.now()}.png`;

    try {
      const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');
      const filepath = path.join(uploadsDir, name);
      fs.writeFileSync(filepath, base64Data, 'base64');

      const protocol = req.protocol || 'https';
      const host = req.get('host') || 'localhost:3000';
      const fullUrl = `${protocol}://${host}/uploads/${name}`;

      res.json({ success: true, url: fullUrl });
    } catch {
      // In serverless environments where disk writes might be restricted,
      // return the image data URL directly so it can render seamlessly.
      res.json({ success: true, url: imageBase64 });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Mount router exclusively on '/api' so that root '/' correctly serves the Vite/React frontend
app.use('/api', apiRouter);

export { app, apiRouter };
export default app;
