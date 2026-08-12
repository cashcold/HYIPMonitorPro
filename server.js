import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { db } from './server/db.js';

const app = express();
const PORT = 3000;

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Ensure /uploads directory exists
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));

// --- REST API ENDPOINTS ---

// 1. GET /api/statistics
app.get('/api/statistics', (req, res) => {
  try {
    const stats = db.getStats();
    res.json({ success: true, data: stats });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 2. GET /api/projects
app.get('/api/projects', (req, res) => {
  try {
    const projects = db.getProjects(req.query);
    res.json({ success: true, count: projects.length, data: projects });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3. GET /api/projects/:id
app.get('/api/projects/:id', (req, res) => {
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

// 4. POST /api/projects (Create project - pending by default unless admin)
app.post('/api/projects', (req, res) => {
  try {
    const newProject = db.addProject(req.body);
    res.status(201).json({ success: true, data: newProject });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 4b. POST /api/projects/:id/approve (Admin approve pending project)
app.post('/api/projects/:id/approve', (req, res) => {
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

// 5. PUT /api/projects/:id (Admin update)
app.put('/api/projects/:id', (req, res) => {
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

// 6. DELETE /api/projects/:id (Admin delete)
app.delete('/api/projects/:id', (req, res) => {
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

// 7. GET /api/reviews
app.get('/api/reviews', (req, res) => {
  try {
    const reviews = db.getReviews(req.query.projectId);
    res.json({ success: true, count: reviews.length, data: reviews });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 8. POST /api/reviews
app.post('/api/reviews', (req, res) => {
  try {
    const newReview = db.addReview(req.body);
    res.status(201).json({ success: true, data: newReview });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 9. GET /api/comments
app.get('/api/comments', (req, res) => {
  try {
    const comments = db.getComments(req.query.projectId);
    res.json({ success: true, count: comments.length, data: comments });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 10. POST /api/comments
app.post('/api/comments', (req, res) => {
  try {
    const newComment = db.addComment(req.body);
    res.status(201).json({ success: true, data: newComment });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 11. POST /api/votes
app.post('/api/votes', (req, res) => {
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

// 12. GET /api/latest-payouts
app.get('/api/latest-payouts', (req, res) => {
  try {
    const payouts = db.getLatestPayouts();
    res.json({ success: true, count: payouts.length, data: payouts });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 13. GET /api/latest-scams
app.get('/api/latest-scams', (req, res) => {
  try {
    const scams = db.getLatestScams();
    res.json({ success: true, count: scams.length, data: scams });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 14. GET /api/reports & POST /api/reports
app.get('/api/reports', (req, res) => {
  try {
    const reports = db.getReports();
    res.json({ success: true, data: reports });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/reports', (req, res) => {
  try {
    const report = db.addReport(req.body);
    res.status(201).json({ success: true, data: report });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 15. GET /api/advertisements & POST /api/advertisements
app.get('/api/advertisements', (req, res) => {
  try {
    const ads = db.getAdvertisements();
    res.json({ success: true, data: ads });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/advertisements', (req, res) => {
  try {
    const ad = db.addAdvertisement(req.body);
    res.status(201).json({ success: true, data: ad });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 16. GET /api/settings & PUT /api/settings
app.get('/api/settings', (req, res) => {
  try {
    res.json({ success: true, data: db.getSettings() });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.put('/api/settings', (req, res) => {
  try {
    const updated = db.updateSettings(req.body);
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 17. POST /api/upload
app.post('/api/upload', (req, res) => {
  try {
    const { imageBase64, filename } = req.body;
    if (!imageBase64) {
      return res.status(400).json({ success: false, error: 'No image provided' });
    }
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');
    const name = filename || `upload_${Date.now()}.png`;
    const filepath = path.join(uploadsDir, name);
    fs.writeFileSync(filepath, base64Data, 'base64');
    res.json({ success: true, url: `/uploads/${name}` });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});


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
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 HYIP Monitor Pro Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
