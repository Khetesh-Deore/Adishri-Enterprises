const { cloudinary } = require('../config/cloudinary');
const { asyncHandler, AppError } = require('../middleware/errorHandler');

// @desc    Upload single image
// @route   POST /api/upload
// @access  Private
const uploadImage = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return next(new AppError('Please upload an image', 400));
  }

  res.status(200).json({
    success: true,
    message: 'Image uploaded successfully',
    data: {
      url: req.file.path,
      publicId: req.file.filename
    }
  });
});

// @desc    Upload multiple images
// @route   POST /api/upload/multiple
// @access  Private
const uploadMultipleImages = asyncHandler(async (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    return next(new AppError('Please upload at least one image', 400));
  }

  const images = req.files.map(file => ({
    url: file.path,
    publicId: file.filename
  }));

  res.status(200).json({
    success: true,
    message: `${images.length} images uploaded successfully`,
    data: images
  });
});

// @desc    Delete image from Cloudinary
// @route   DELETE /api/upload/:publicId
// @access  Private
const deleteImage = asyncHandler(async (req, res, next) => {
  const { publicId } = req.params;

  if (!publicId) {
    return next(new AppError('Public ID is required', 400));
  }

  const result = await cloudinary.uploader.destroy(publicId);

  if (result.result !== 'ok') {
    return next(new AppError('Failed to delete image', 400));
  }

  res.status(200).json({
    success: true,
    message: 'Image deleted successfully'
  });
});

module.exports = { uploadImage, uploadMultipleImages, deleteImage };
