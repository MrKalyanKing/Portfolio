// Single source of truth for the backend URL (REST + Socket.IO).
// In production (Netlify) VITE_API_URL is "/", which normalizes to "" here:
// requests become same-origin relative URLs and netlify.toml proxies them
// to the backend. In local dev it falls back to the local backend.
const raw = import.meta.env.VITE_API_URL || 'http://localhost:3000';
export const API_BASE = raw.replace(/\/+$/, '');
