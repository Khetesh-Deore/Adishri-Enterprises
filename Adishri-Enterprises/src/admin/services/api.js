import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  logout: () => api.post('/auth/logout'),
  changePassword: (data) => api.put('/auth/change-password', data)
};

// Hero API
export const heroAPI = {
  get: () => api.get('/hero'),
  update: (data) => api.put('/hero', data)
};

// Products API
export const productsAPI = {
  getAll: (params) => api.get('/products', { params }),
  getOne: (id) => api.get(`/products/${id}`),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`)
};

// About API
export const aboutAPI = {
  get: () => api.get('/about'),
  update: (data) => api.put('/about', data)
};

// Gallery API
export const galleryAPI = {
  getAll: (params) => api.get('/gallery', { params }),
  add: (data) => api.post('/gallery', data),
  delete: (id) => api.delete(`/gallery/${id}`),
  reorder: (data) => api.put('/gallery/reorder', data)
};

// Contact API
export const contactAPI = {
  get: () => api.get('/contact'),
  update: (data) => api.put('/contact', data)
};

// Settings API
export const settingsAPI = {
  get: () => api.get('/settings'),
  update: (data) => api.put('/settings', data)
};

// Upload API
export const uploadAPI = {
  single: (file) => {
    const formData = new FormData();
    formData.append('image', file);
    return api.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  multiple: (files) => {
    const formData = new FormData();
    files.forEach(file => formData.append('images', file));
    return api.post('/upload/multiple', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  delete: (publicId) => api.delete(`/upload/${publicId}`)
};

// Core Values API
export const coreValuesAPI = {
  getAll: () => api.get('/core-values'),
  getOne: (id) => api.get(`/core-values/${id}`),
  create: (data) => api.post('/core-values', data),
  update: (id, data) => api.put(`/core-values/${id}`, data),
  delete: (id) => api.delete(`/core-values/${id}`),
  reorder: (data) => api.put('/core-values/reorder', data)
};

// Standards API
export const standardsAPI = {
  getAll: () => api.get('/standards'),
  getOne: (id) => api.get(`/standards/${id}`),
  create: (data) => api.post('/standards', data),
  update: (id, data) => api.put(`/standards/${id}`, data),
  delete: (id) => api.delete(`/standards/${id}`),
  reorder: (data) => api.put('/standards/reorder', data)
};

// Navigation API
export const navigationAPI = {
  get: () => api.get('/navigation'),
  update: (data) => api.put('/navigation', data)
};

// Vision API
export const visionAPI = {
  get: () => api.get('/vision'),
  update: (data) => api.put('/vision', data)
};

// Users API
export const usersAPI = {
  getAll: (params) => api.get('/auth/users', { params }),
  getOne: (id) => api.get(`/auth/users/${id}`),
  create: (data) => api.post('/auth/users', data),
  update: (id, data) => api.put(`/auth/users/${id}`, data),
  delete: (id) => api.delete(`/auth/users/${id}`),
  resetPassword: (id, data) => api.put(`/auth/users/${id}/reset-password`, data)
};

export default api;
