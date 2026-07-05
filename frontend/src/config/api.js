// Single source of truth for the backend URL (REST + Socket.IO).
// Override in production with a .env file: VITE_API_URL=https://api.example.com
export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';
