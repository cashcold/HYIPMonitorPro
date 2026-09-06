// API Service for HYIP Monitor Pro Frontend
import { fallbackProjects, fallbackStats } from './fallbackData.js';

// Dynamically use environment variable or fallback to relative /api
const BACKEND_URL = import.meta.env.VITE_API_URL || '';
const API_BASE = BACKEND_URL ? `${BACKEND_URL}/api` : '/api';

export async function fetchStats() {
  try {
    const res = await fetch(`${API_BASE}/statistics`);
    const contentType = res.headers.get('content-type') || '';
    if (res.ok && contentType.includes('application/json')) {
      const json = await res.json();
      if (json.data) return json.data;
    }
  } catch (err) {
    console.warn('Backend /api/statistics offline or unreachable, using default stats:', err);
  }
  return fallbackStats;
}

export async function fetchProjects(params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    const url = `${API_BASE}/projects${query ? `?${query}` : ''}`;
    const res = await fetch(url);
    const contentType = res.headers.get('content-type') || '';
    // Guard against Netlify SPA returning HTML index page on unmatched routes
    if (res.ok && contentType.includes('application/json')) {
      const json = await res.json();
      if (json.data && Array.isArray(json.data) && json.data.length > 0) {
        return json.data;
      }
    }
  } catch (err) {
    console.warn('Backend /api/projects offline or unreachable, using default projects:', err);
  }

  // Graceful fallback for static client deployments (e.g. Netlify)
  let list = [...fallbackProjects];
  if (params.status) {
    list = list.filter(p => p.status.toUpperCase() === params.status.toUpperCase());
  }
  if (params.category) {
    list = list.filter(p => p.category.toLowerCase().includes(params.category.toLowerCase()));
  }
  if (params.q) {
    const q = params.q.toLowerCase();
    list = list.filter(p => p.name.toLowerCase().includes(q) || p.domain.toLowerCase().includes(q));
  }
  return list;
}

export async function fetchProjectById(id) {
  try {
    const res = await fetch(`${API_BASE}/projects/${id}`);
    const contentType = res.headers.get('content-type') || '';
    if (res.ok && contentType.includes('application/json')) {
      const json = await res.json();
      if (json.success && json.data) return json.data;
    }
  } catch (err) {
    console.warn(`Could not fetch project ${id} from API, checking fallback list:`, err);
  }
  const found = fallbackProjects.find(p => p.id === id);
  if (found) return found;
  throw new Error('Project not found');
}

export async function createProject(projectData) {
  const res = await fetch(`${API_BASE}/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(projectData)
  });
  const json = await res.json();
  return json.data;
}

export async function approveProjectApi(id, status = 'PAYING') {
  const res = await fetch(`${API_BASE}/projects/${id}/approve`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  });
  const json = await res.json();
  return json.data;
}

export async function updateProject(id, projectData) {
  const res = await fetch(`${API_BASE}/projects/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(projectData)
  });
  const json = await res.json();
  return json.data;
}

export async function deleteProject(id) {
  const res = await fetch(`${API_BASE}/projects/${id}`, {
    method: 'DELETE'
  });
  const json = await res.json();
  return json;
}

export async function submitVote(projectId, voteType) {
  const res = await fetch(`${API_BASE}/votes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ projectId, voteType })
  });
  const json = await res.json();
  return json.data;
}

export async function submitReview(reviewData) {
  const res = await fetch(`${API_BASE}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reviewData)
  });
  const json = await res.json();
  return json.data;
}

export async function fetchReviews(projectId) {
  try {
    const res = await fetch(`${API_BASE}/reviews?projectId=${projectId}`);
    const contentType = res.headers.get('content-type') || '';
    if (res.ok && contentType.includes('application/json')) {
      const json = await res.json();
      return json.data || [];
    }
  } catch {
    // fallback empty
  }
  return [];
}

export async function submitComment(commentData) {
  const res = await fetch(`${API_BASE}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(commentData)
  });
  const json = await res.json();
  return json.data;
}

export async function fetchComments(projectId) {
  try {
    const res = await fetch(`${API_BASE}/comments?projectId=${projectId}`);
    const contentType = res.headers.get('content-type') || '';
    if (res.ok && contentType.includes('application/json')) {
      const json = await res.json();
      return json.data || [];
    }
  } catch {
    // fallback empty
  }
  return [];
}

export async function fetchLatestPayouts() {
  try {
    const res = await fetch(`${API_BASE}/latest-payouts`);
    const contentType = res.headers.get('content-type') || '';
    if (res.ok && contentType.includes('application/json')) {
      const json = await res.json();
      return json.data || [];
    }
  } catch {
    // fallback
  }
  return fallbackProjects.filter(p => p.status === 'PAYING').map(p => ({
    id: `pay_${p.id}`,
    projectName: p.name,
    amount: (p.ourInvestment * 0.05).toFixed(2),
    currency: 'USDT',
    batch: `TXN${Math.floor(10000000 + Math.random() * 90000000)}`,
    time: p.lastPayoutDate || 'Today'
  }));
}

export async function fetchLatestScams() {
  try {
    const res = await fetch(`${API_BASE}/latest-scams`);
    const contentType = res.headers.get('content-type') || '';
    if (res.ok && contentType.includes('application/json')) {
      const json = await res.json();
      return json.data || [];
    }
  } catch {
    // fallback
  }
  return fallbackProjects.filter(p => p.status === 'SCAM' || p.status === 'PROBLEM');
}

export async function submitReport(reportData) {
  const res = await fetch(`${API_BASE}/reports`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reportData)
  });
  const json = await res.json();
  return json.data;
}

export async function fetchReports() {
  try {
    const res = await fetch(`${API_BASE}/reports`);
    const contentType = res.headers.get('content-type') || '';
    if (res.ok && contentType.includes('application/json')) {
      const json = await res.json();
      return json.data || [];
    }
  } catch {
    // fallback
  }
  return [];
}

export async function fetchAdvertisements() {
  try {
    const res = await fetch(`${API_BASE}/advertisements`);
    const contentType = res.headers.get('content-type') || '';
    if (res.ok && contentType.includes('application/json')) {
      const json = await res.json();
      return json.data || [];
    }
  } catch {
    // fallback
  }
  return [];
}

export async function createAdvertisement(adData) {
  const res = await fetch(`${API_BASE}/advertisements`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(adData)
  });
  const json = await res.json();
  return json.data;
}

export async function fetchSettings() {
  try {
    const res = await fetch(`${API_BASE}/settings`);
    const contentType = res.headers.get('content-type') || '';
    if (res.ok && contentType.includes('application/json')) {
      const json = await res.json();
      return json.data;
    }
  } catch {
    // fallback
  }
  return null;
}

export async function updateSettings(settings) {
  const res = await fetch(`${API_BASE}/settings`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(settings)
  });
  const json = await res.json();
  return json.data;
}

export async function uploadImage(base64, filename) {
  const res = await fetch(`${API_BASE}/upload`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imageBase64: base64, filename })
  });
  const json = await res.json();
  return json.url.startsWith('http') ? json.url : `${BACKEND_URL}${json.url}`;
}
