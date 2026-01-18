const express = require('express');
const router = express.Router();
const {
  getNavigation,
  updateNavigation
} = require('../controllers/navigationController');
const { protect, adminOnly } = require('../middleware/auth');

// Public routes
router.get('/', getNavigation);

// Protected routes (admin only)
router.put('/', protect, adminOnly, updateNavigation);

module.exports = router;
