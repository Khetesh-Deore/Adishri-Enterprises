const { About } = require('../models');
const { cloudinary } = require('../config/cloudinary');
const { asyncHandler } = require('../middleware/errorHandler');

// @desc    Get about content
// @route   GET /api/about
// @access  Public
const getAbout = asyncHandler(async (req, res) => {
  let about = await About.findOne({ isActive: true });

  // Return default if none exists
  if (!about) {
    about = {
      title: 'About Adishri Enterprises',
      subtitle: 'Excellence in Plastic Packaging',
      description: 'With over 15 years of experience, we are a leading manufacturer of HDPE & LDPE bottles.',
      mission: {
        title: 'Our Mission',
        description: 'To provide superior quality plastic packaging solutions.'
      },
      vision: {
        title: 'Our Vision',
        description: 'To become India\'s most trusted packaging manufacturer.'
      }
    };
  }

  res.status(200).json({
    success: true,
    data: about
  });
});

// @desc    Update about content
// @route   PUT /api/about
// @access  Private
const updateAbout = asyncHandler(async (req, res) => {
  const updateData = { ...req.body };

  // Handle image upload
  if (req.file) {
    const existingAbout = await About.findOne();
    if (existingAbout?.image?.publicId) {
      await cloudinary.uploader.destroy(existingAbout.image.publicId);
    }
    updateData.image = {
      url: req.file.path,
      publicId: req.file.filename
    };
  }

  const about = await About.findOneAndUpdate(
    {},
    updateData,
    { new: true, upsert: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    message: 'About section updated successfully',
    data: about
  });
});

module.exports = { getAbout, updateAbout };
