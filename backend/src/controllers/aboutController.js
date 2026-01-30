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
  try {
    const updateData = {};

    // Parse FormData fields
    Object.keys(req.body).forEach(key => {
      const value = req.body[key];
      
      // Try to parse JSON strings (arrays and objects)
      if (typeof value === 'string' && (value.startsWith('[') || value.startsWith('{'))) {
        try {
          updateData[key] = JSON.parse(value);
        } catch (e) {
          updateData[key] = value;
        }
      } else {
        updateData[key] = value;
      }
    });

    // Handle image upload
    if (req.file) {
      const existingAbout = await About.findOne();
      if (existingAbout?.image?.publicId) {
        try {
          await cloudinary.uploader.destroy(existingAbout.image.publicId);
        } catch (deleteError) {
          console.error('Error deleting old image:', deleteError);
          // Continue even if delete fails
        }
      }
      updateData.image = {
        url: req.file.path,
        publicId: req.file.filename
      };
    }

    console.log('Updating about with data:', JSON.stringify(updateData, null, 2));

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
  } catch (error) {
    console.error('Update about error:', error);
    throw error;
  }
});

module.exports = { getAbout, updateAbout };
