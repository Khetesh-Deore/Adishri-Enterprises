const express = require('express');
const router = express.Router();

// Import all routes
const authRoutes = require('./authRoutes');
const heroRoutes = require('./heroRoutes');
const heroSliderRoutes = require('./heroSliderRoutes');
const productRoutes = require('./productRoutes');
const aboutRoutes = require('./aboutRoutes');
const galleryRoutes = require('./galleryRoutes');
const contactRoutes = require('./contactRoutes');
const settingsRoutes = require('./settingsRoutes');
const uploadRoutes = require('./uploadRoutes');
const visionRoutes = require('./visionRoutes');
const coreValueRoutes = require('./coreValueRoutes');
const standardRoutes = require('./standardRoutes');
const navigationRoutes = require('./navigationRoutes');

// Mount routes
router.use('/auth', authRoutes);
router.use('/hero', heroRoutes);
router.use('/hero-slider', heroSliderRoutes);
router.use('/products', productRoutes);
router.use('/about', aboutRoutes);
router.use('/gallery', galleryRoutes);
router.use('/contact', contactRoutes);
router.use('/settings', settingsRoutes);
router.use('/upload', uploadRoutes);
router.use('/vision', visionRoutes);
router.use('/core-values', coreValueRoutes);
router.use('/standards', standardRoutes);
router.use('/navigation', navigationRoutes);

// Health check
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
