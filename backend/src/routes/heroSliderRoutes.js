const express = require('express');
const router = express.Router();
const {
  getSlides,
  getSlide,
  createSlide,
  updateSlide,
  deleteSlide,
  reorderSlides
} = require('../controllers/heroSliderController');
const { protect } = require('../middleware/auth');
const { upload } = require('../config/cloudinary');

// Public routes
router.get('/', getSlides);
router.get('/:id', getSlide);

// Protected routes (Admin only)
router.post('/', protect, upload.single('image'), createSlide);
router.put('/reorder', protect, reorderSlides);
router.put('/:id', protect, upload.single('image'), updateSlide);
router.delete('/:id', protect, deleteSlide);

module.exports = router;
