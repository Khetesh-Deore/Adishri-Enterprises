const express = require('express');
const router = express.Router();
const {
  getCoreValues,
  getCoreValue,
  createCoreValue,
  updateCoreValue,
  deleteCoreValue,
  reorderCoreValues
} = require('../controllers/coreValueController');
const { protect, adminOnly } = require('../middleware/auth');

// Public routes
router.get('/', getCoreValues);
router.get('/:id', getCoreValue);

// Protected routes (admin only)
router.post('/', protect, adminOnly, createCoreValue);
router.put('/reorder', protect, adminOnly, reorderCoreValues);
router.put('/:id', protect, adminOnly, updateCoreValue);
router.delete('/:id', protect, adminOnly, deleteCoreValue);

module.exports = router;
