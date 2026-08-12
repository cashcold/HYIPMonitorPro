// API Service for HYIP Monitor Pro Frontend

// Dynamically use Netlify environment variable, Heroku backend, or fallback
const BACKEND_URL = import.meta.env.VITE_API_URL || 'https://hyipmonitorpro-6ddf03571b92.herokuapp.com';
const API_BASE = `${BACKEND_URL}/api`;

export async function fetchStats() {
  const res = await fetch(`${API_BASE}/statistics`);
  const json = await res.json();
  return json.data;
}

export async function fetchProjects(params = {}) {
  const query = new URLSearchParams(params).toString();
  const url = `${API_BASE}/projects${query ? `?${query}` : ''}`;
  const res = await fetch(url);
  const json = await res.json();
  return json.data || [];
}

export async function fetchProjectById(id) {
  const res = await fetch(`${API_BASE}/projects/${id}`);
  const json = await res.json();
  if (!json.success) throw new Error(json.error);
  return json.data;
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
  return json.success;
}

export async function fetchReviews(projectId = '') {
  const url = projectId ? `${API_BASE}/reviews?projectId=${projectId}` : `${API_BASE}/reviews`;
  const res = await fetch(url);
  const json = await res.json();
  return json.data || [];
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

export async function fetchComments(projectId) {
  const res = await fetch(`${API_BASE}/comments?projectId=${projectId}`);
  const json = await res.json();
  return json.data || [];
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

export async function submitVote(projectId, voteType) {
  const res = await fetch(`${API_BASE}/votes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ projectId, voteType })
  });
  const json = await res.json();
  return json.data;
}

export async function fetchLatestPayouts() {
  const res = await fetch(`${API_BASE}/latest-payouts`);
  const json = await res.json();
  return json.data || [];
}

export async function fetchLatestScams() {
  const res = await fetch(`${API_BASE}/latest-scams`);
  const json = await res.json();
  return json.data || [];
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
  const res = await fetch(`${API_BASE}/reports`);
  const json = await res.json();
  return json.data || [];
}

export async function fetchAdvertisements() {
  const res = await fetch(`${API_BASE}/advertisements`);
  const json = await res.json();
  return json.data || [];
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
  const res = await fetch(`${API_BASE}/settings`);
  const json = await res.json();
  return json.data;
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