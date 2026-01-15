const { Hero } = require('../models');
const { cloudinary } = require('../config/cloudinary');
const { asyncHandler, AppError } = require('../middleware/errorHandler');

// @desc    Get hero content
// @route   GET /api/hero
// @access  Public
const getHero = asyncHandler(async (req, res) => {
  let hero = await Hero.findOne({ isActive: true });

  // Return default if none exists
  if (!hero) {
    hero = {
      title: 'Premium HDPE & LDPE Bottles',
      subtitle: 'Quality Packaging Solutions',
      description: 'Leading manufacturer of high-quality plastic bottles and jerry cans.',
      ctaButton: { text: 'Get Quote', link: '/contact' }
    };
  }

  res.status(200).json({
    success: true,
    data: hero
  });
});

// @desc    Update hero content
// @route   PUT /api/hero
// @access  Private
const updateHero = asyncHandler(async (req, res) => {
  const updateData = { ...req.body };

  // Handle image upload
  if (req.file) {
    // Find existing hero to delete old image
    const existingHero = await Hero.findOne();
    if (existingHero?.backgroundImage?.publicId) {
      await cloudinary.uploader.destroy(existingHero.backgroundImage.publicId);
    }
    updateData.backgroundImage = {
      url: req.file.path,
      publicId: req.file.filename
    };
  }

  // Upsert - update if exists, create if not
  const hero = await Hero.findOneAndUpdate(
    {},
    updateData,
    { new: true, upsert: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    message: 'Hero section updated successfully',
    data: hero
  });
});

module.exports = { getHero, updateHero };
