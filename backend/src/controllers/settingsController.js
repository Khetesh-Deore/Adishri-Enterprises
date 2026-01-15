const { Settings } = require('../models');
const { cloudinary } = require('../config/cloudinary');
const { asyncHandler } = require('../middleware/errorHandler');

// @desc    Get site settings
// @route   GET /api/settings
// @access  Public
const getSettings = asyncHandler(async (req, res) => {
  let settings = await Settings.findOne();

  // Return default if none exists
  if (!settings) {
    settings = {
      siteName: 'Adishri Enterprises',
      tagline: 'Premium HDPE & LDPE Bottles & Jerry Can Manufacturer',
      footerText: 'Quality packaging solutions since 2008',
      copyrightText: '© 2024 Adishri Enterprises. All rights reserved.',
      credentials: [
        { name: 'ISO 9001:2015', description: 'Quality Management' },
        { name: 'FDA Approved', description: 'Food Grade Materials' },
        { name: 'BIS Certified', description: 'Bureau of Indian Standards' }
      ]
    };
  }

  res.status(200).json({
    success: true,
    data: settings
  });
});

// @desc    Update site settings
// @route   PUT /api/settings
// @access  Private
const updateSettings = asyncHandler(async (req, res) => {
  const updateData = { ...req.body };

  // Handle logo upload
  if (req.files?.logo) {
    const existingSettings = await Settings.findOne();
    if (existingSettings?.logo?.publicId) {
      await cloudinary.uploader.destroy(existingSettings.logo.publicId);
    }
    updateData.logo = {
      url: req.files.logo[0].path,
      publicId: req.files.logo[0].filename
    };
  }

  // Handle favicon upload
  if (req.files?.favicon) {
    const existingSettings = await Settings.findOne();
    if (existingSettings?.favicon?.publicId) {
      await cloudinary.uploader.destroy(existingSettings.favicon.publicId);
    }
    updateData.favicon = {
      url: req.files.favicon[0].path,
      publicId: req.files.favicon[0].filename
    };
  }

  const settings = await Settings.findOneAndUpdate(
    {},
    updateData,
    { new: true, upsert: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    message: 'Settings updated successfully',
    data: settings
  });
});

module.exports = { getSettings, updateSettings };
