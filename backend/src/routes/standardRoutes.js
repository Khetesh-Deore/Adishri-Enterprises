const express = require('express');
const router = express.Router();
const {
  getStandards,
  getStandard,
  createStandard,
  updateStandard,
  deleteStandard,
  reorderStandards
} = require('../controllers/standardController');
const { protect, adminOnly } = require('../middleware/auth');

// Public routes
router.get('/', getStandards);
router.get('/:id', getStandard);

// Protected routes (admin only)
router.post('/', protect, adminOnly, createStandard);
router.put('/reorder', protect, adminOnly, reorderStandards);
router.put('/:id', protect, adminOnly, updateStandard);
router.delete('/:id', protect, adminOnly, deleteStandard);

module.exports = router;
