const express = require('express');
const router = express.Router();

// Import all routes
const authRoutes = require('./authRoutes');
const heroRoutes = require('./heroRoutes');
const productRoutes = require('./productRoutes');
const aboutRoutes = require('./aboutRoutes');
const galleryRoutes = require('./galleryRoutes');
const contactRoutes = require('./contactRoutes');
const settingsRoutes = require('./settingsRoutes');
const uploadRoutes = require('./uploadRoutes');
const visionRoutes = require('./visionRoutes');

// Mount routes
router.use('/auth', authRoutes);
router.use('/hero', heroRoutes);
router.use('/products', productRoutes);
router.use('/about', aboutRoutes);
router.use('/gallery', galleryRoutes);
router.use('/contact', contactRoutes);
router.use('/settings', settingsRoutes);
router.use('/upload', uploadRoutes);
router.use('/vision', visionRoutes);

// Health check
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
