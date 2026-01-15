const { Vision } = require('../models');
const { asyncHandler, AppError } = require('../middleware/errorHandler');

// @desc    Get vision content
// @route   GET /api/vision
// @access  Public
const getVision = asyncHandler(async (req, res) => {
  let vision = await Vision.findOne({ isActive: true });
  
  // Create default if none exists
  if (!vision) {
    vision = await Vision.create({});
  }

  res.status(200).json({
    success: true,
    data: vision
  });
});

// @desc    Update vision content
// @route   PUT /api/vision
// @access  Private
const updateVision = asyncHandler(async (req, res) => {
  const { subtitle, title, highlight, description, cards } = req.body;

  let vision = await Vision.findOne({ isActive: true });

  if (!vision) {
    vision = await Vision.create({
      subtitle,
      title,
      highlight,
      description,
      cards
    });
  } else {
    vision = await Vision.findByIdAndUpdate(
      vision._id,
      { subtitle, title, highlight, description, cards },
      { new: true, runValidators: true }
    );
  }

  res.status(200).json({
    success: true,
    message: 'Vision content updated successfully',
    data: vision
  });
});

module.exports = { getVision, updateVision };
