const express = require('express');
const router = express.Router();
const { 
  login, 
  getMe, 
  logout, 
  changePassword,
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  resetUserPassword
} = require('../controllers/authController');
const { protect, adminOnly } = require('../middleware/auth');
const { loginValidation, userValidation } = require('../middleware/validate');

// Public routes
router.post('/login', loginValidation, login);

// Protected routes (any authenticated user)
router.get('/me', protect, getMe);
router.post('/logout', protect, logout);
router.put('/change-password', protect, changePassword);

// Admin only routes - User Management
router.get('/users', protect, adminOnly, getUsers);
router.get('/users/:id', protect, adminOnly, getUser);
router.post('/users', protect, adminOnly, userValidation, createUser);
router.put('/users/:id', protect, adminOnly, updateUser);
router.delete('/users/:id', protect, adminOnly, deleteUser);
router.put('/users/:id/reset-password', protect, adminOnly, resetUserPassword);

module.exports = router;
