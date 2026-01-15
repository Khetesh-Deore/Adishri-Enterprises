// Public API Service - For fetching content on the public website
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance for public API
const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000
});

// Hero API
export const heroAPI = {
  get: () => api.get('/hero')
};

// Products API
export const productsAPI = {
  getAll: (params) => api.get('/products', { params }),
  getOne: (id) => api.get(`/products/${id}`)
};

// About API
export const aboutAPI = {
  get: () => api.get('/about')
};

// Gallery API
export const galleryAPI = {
  getAll: (params) => api.get('/gallery', { params })
};

// Contact API
export const contactAPI = {
  get: () => api.get('/contact')
};

// Settings API
export const settingsAPI = {
  get: () => api.get('/settings')
};

// Vision API
export const visionAPI = {
  get: () => api.get('/vision')
};

export default api;
