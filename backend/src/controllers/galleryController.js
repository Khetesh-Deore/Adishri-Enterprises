const { Gallery } = require('../models');
const { cloudinary } = require('../config/cloudinary');
const { asyncHandler, AppError } = require('../middleware/errorHandler');

// @desc    Get all gallery images
// @route   GET /api/gallery
// @access  Public
const getGallery = asyncHandler(async (req, res) => {
  const { category } = req.query;
  
  const filter = { isActive: true };
  if (category) filter.category = category;

  const images = await Gallery.find(filter).sort({ order: 1, createdAt: -1 });

  res.status(200).json({
    success: true,
    count: images.length,
    data: images
  });
});

// @desc    Add gallery image
// @route   POST /api/gallery
// @access  Private
const addGalleryImage = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return next(new AppError('Please upload an image', 400));
  }

  const imageData = {
    title: req.body.title || '',
    caption: req.body.caption || '',
    category: req.body.category || 'general',
    image: {
      url: req.file.path,
      publicId: req.file.filename
    }
  };

  const image = await Gallery.create(imageData);

  res.status(201).json({
    success: true,
    message: 'Image added to gallery',
    data: image
  });
});

// @desc    Delete gallery image
// @route   DELETE /api/gallery/:id
// @access  Private
const deleteGalleryImage = asyncHandler(async (req, res, next) => {
  const image = await Gallery.findById(req.params.id);

  if (!image) {
    return next(new AppError('Image not found', 404));
  }

  // Delete from Cloudinary
  if (image.image?.publicId) {
    await cloudinary.uploader.destroy(image.image.publicId);
  }

  await Gallery.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Image deleted successfully'
  });
});

// @desc    Reorder gallery images
// @route   PUT /api/gallery/reorder
// @access  Private
const reorderGallery = asyncHandler(async (req, res, next) => {
  const { images } = req.body; // Array of { id, order }

  if (!images || !Array.isArray(images)) {
    return next(new AppError('Please provide images array with id and order', 400));
  }

  // Update order for each image
  const updatePromises = images.map(({ id, order }) =>
    Gallery.findByIdAndUpdate(id, { order })
  );

  await Promise.all(updatePromises);

  res.status(200).json({
    success: true,
    message: 'Gallery reordered successfully'
  });
});

module.exports = { getGallery, addGalleryImage, deleteGalleryImage, reorderGallery };
