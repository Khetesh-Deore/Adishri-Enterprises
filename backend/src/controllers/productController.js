const { Product } = require('../models');
const { cloudinary } = require('../config/cloudinary');
const { asyncHandler, AppError } = require('../middleware/errorHandler');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const { category, featured, active } = req.query;
  
  const filter = {};
  if (category) filter.category = category;
  if (featured === 'true') filter.isFeatured = true;
  if (active !== 'false') filter.isActive = true;

  const products = await Product.find(filter).sort({ order: 1, createdAt: -1 });

  res.status(200).json({
    success: true,
    count: products.length,
    data: products
  });
});

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new AppError('Product not found', 404));
  }

  res.status(200).json({
    success: true,
    data: product
  });
});

// @desc    Create product
// @route   POST /api/products
// @access  Private
const createProduct = asyncHandler(async (req, res) => {
  const productData = { ...req.body };

  // Handle image upload
  if (req.file) {
    productData.image = {
      url: req.file.path,
      publicId: req.file.filename
    };
  }

  const product = await Product.create(productData);

  res.status(201).json({
    success: true,
    message: 'Product created successfully',
    data: product
  });
});

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private
const updateProduct = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new AppError('Product not found', 404));
  }

  const updateData = { ...req.body };

  // Handle new image upload
  if (req.file) {
    // Delete old image from Cloudinary
    if (product.image?.publicId) {
      await cloudinary.uploader.destroy(product.image.publicId);
    }
    updateData.image = {
      url: req.file.path,
      publicId: req.file.filename
    };
  }

  product = await Product.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    message: 'Product updated successfully',
    data: product
  });
});

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private
const deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new AppError('Product not found', 404));
  }

  // Delete image from Cloudinary
  if (product.image?.publicId) {
    await cloudinary.uploader.destroy(product.image.publicId);
  }

  // Delete gallery images
  if (product.gallery?.length > 0) {
    for (const img of product.gallery) {
      if (img.publicId) {
        await cloudinary.uploader.destroy(img.publicId);
      }
    }
  }

  await Product.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Product deleted successfully'
  });
});

module.exports = { getProducts, getProduct, createProduct, updateProduct, deleteProduct };
