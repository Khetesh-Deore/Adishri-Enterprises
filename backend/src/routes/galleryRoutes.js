const express = require('express');
const router = express.Router();
const { 
  getGallery, 
  addGalleryImage, 
  deleteGalleryImage, 
  reorderGallery 
} = require('../controllers/galleryController');
const { protect } = require('../middleware/auth');
const { upload } = require('../config/cloudinary');

router.route('/')
  .get(getGallery)
  .post(protect, upload.single('image'), addGalleryImage);

router.put('/reorder', protect, reorderGallery);
router.delete('/:id', protect, deleteGalleryImage);

module.exports = router;
