const CoreValue = require('../models/CoreValue');
const { asyncHandler, AppError } = require('../middleware/errorHandler');

// @desc    Get all core values
// @route   GET /api/core-values
// @access  Public
exports.getCoreValues = asyncHandler(async (req, res) => {
  const coreValues = await CoreValue.find({ isActive: true }).sort({ order: 1 });
  
  res.status(200).json({
    success: true,
    data: coreValues
  });
});

// @desc    Get single core value
// @route   GET /api/core-values/:id
// @access  Public
exports.getCoreValue = asyncHandler(async (req, res, next) => {
  const coreValue = await CoreValue.findById(req.params.id);
  
  if (!coreValue) {
    return next(new AppError('Core value not found', 404));
  }
  
  res.status(200).json({
    success: true,
    data: coreValue
  });
});

// @desc    Create core value
// @route   POST /api/core-values
// @access  Private/Admin
exports.createCoreValue = asyncHandler(async (req, res) => {
  const coreValue = await CoreValue.create(req.body);
  
  res.status(201).json({
    success: true,
    data: coreValue
  });
});

// @desc    Update core value
// @route   PUT /api/core-values/:id
// @access  Private/Admin
exports.updateCoreValue = asyncHandler(async (req, res, next) => {
  let coreValue = await CoreValue.findById(req.params.id);
  
  if (!coreValue) {
    return next(new AppError('Core value not found', 404));
  }
  
  coreValue = await CoreValue.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  
  res.status(200).json({
    success: true,
    data: coreValue
  });
});

// @desc    Delete core value
// @route   DELETE /api/core-values/:id
// @access  Private/Admin
exports.deleteCoreValue = asyncHandler(async (req, res, next) => {
  const coreValue = await CoreValue.findById(req.params.id);
  
  if (!coreValue) {
    return next(new AppError('Core value not found', 404));
  }
  
  await coreValue.deleteOne();
  
  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Reorder core values
// @route   PUT /api/core-values/reorder
// @access  Private/Admin
exports.reorderCoreValues = asyncHandler(async (req, res) => {
  const { items } = req.body;
  
  const updatePromises = items.map((item, index) =>
    CoreValue.findByIdAndUpdate(item.id, { order: index })
  );
  
  await Promise.all(updatePromises);
  
  const coreValues = await CoreValue.find().sort({ order: 1 });
  
  res.status(200).json({
    success: true,
    data: coreValues
  });
});
