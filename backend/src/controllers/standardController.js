const Standard = require('../models/Standard');
const { asyncHandler, AppError } = require('../middleware/errorHandler');

// @desc    Get all standards
// @route   GET /api/standards
// @access  Public
exports.getStandards = asyncHandler(async (req, res) => {
  const standards = await Standard.find({ isActive: true }).sort({ order: 1 });
  
  res.status(200).json({
    success: true,
    data: standards
  });
});

// @desc    Get single standard
// @route   GET /api/standards/:id
// @access  Public
exports.getStandard = asyncHandler(async (req, res, next) => {
  const standard = await Standard.findById(req.params.id);
  
  if (!standard) {
    return next(new AppError('Standard not found', 404));
  }
  
  res.status(200).json({
    success: true,
    data: standard
  });
});

// @desc    Create standard
// @route   POST /api/standards
// @access  Private/Admin
exports.createStandard = asyncHandler(async (req, res) => {
  const standard = await Standard.create(req.body);
  
  res.status(201).json({
    success: true,
    data: standard
  });
});

// @desc    Update standard
// @route   PUT /api/standards/:id
// @access  Private/Admin
exports.updateStandard = asyncHandler(async (req, res, next) => {
  let standard = await Standard.findById(req.params.id);
  
  if (!standard) {
    return next(new AppError('Standard not found', 404));
  }
  
  standard = await Standard.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  
  res.status(200).json({
    success: true,
    data: standard
  });
});

// @desc    Delete standard
// @route   DELETE /api/standards/:id
// @access  Private/Admin
exports.deleteStandard = asyncHandler(async (req, res, next) => {
  const standard = await Standard.findById(req.params.id);
  
  if (!standard) {
    return next(new AppError('Standard not found', 404));
  }
  
  await standard.deleteOne();
  
  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Reorder standards
// @route   PUT /api/standards/reorder
// @access  Private/Admin
exports.reorderStandards = asyncHandler(async (req, res) => {
  const { items } = req.body;
  
  const updatePromises = items.map((item, index) =>
    Standard.findByIdAndUpdate(item.id, { order: index })
  );
  
  await Promise.all(updatePromises);
  
  const standards = await Standard.find().sort({ order: 1 });
  
  res.status(200).json({
    success: true,
    data: standards
  });
});
