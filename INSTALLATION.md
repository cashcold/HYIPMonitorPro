# HYIP Monitor Pro - Installation Guide

## Step-by-Step Setup Instructions

### 1. Requirements
- Node.js >= 18.0.0
- npm >= 9.0.0
- MongoDB instance (Optional - App includes full auto-seeded in-memory store if MONGODB_URI is absent)

### 2. Environment Setup
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Configure your environment variables in `.env`:
```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/hyip_monitor_pro
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Running the Project
- **Development**: `npm run dev` (Runs Node + Express + Vite dev server on port 3000)
- **Production Build**: `npm run build` (Bundles frontend static files into `dist/` and compiles server to `dist/server.cjs`)
- **Start Production**: `npm start` (Launches `node dist/server.cjs`)

### 5. Deploying to Vercel (Serverless API & SPA)

This application is ready for 1-click Vercel deployment:
- **Root Directory**: `./`
- **Framework Preset**: `Vite`
- **Build Command**: `npm run build` or `vite build`
- **Output Directory**: `dist`
- **Serverless Functions**: Automatically detected in `/api` (configured via `vercel.json`)
- **Environment Variables**:
  - `NODE_ENV=production`
  - `MONGODB_URI` (optional: connect your cloud MongoDB Atlas database, or leave blank to use the in-memory database with preloaded sample data)

### 6. Accessing the Admin Panel
1. Click **Admin Panel** in the top navigation header.
2. Manage Projects, approve reviews, review scam reports, update banner ads, or configure site settings.
