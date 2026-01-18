const HeroSlider = require('../models/HeroSlider');
const { uploadToCloudinary, deleteFromCloudinary } = require('../config/cloudinary');

// @desc    Get all hero slides
// @route   GET /api/hero-slider
// @access  Public
exports.getSlides = async (req, res) => {
  try {
    const slides = await HeroSlider.find({ isActive: true }).sort({ order: 1 });
    
    res.status(200).json({
      success: true,
      count: slides.length,
      data: slides
    });
  } catch (error) {
    console.error('Get slides error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch hero slides',
      error: error.message
    });
  }
};

// @desc    Get single hero slide
// @route   GET /api/hero-slider/:id
// @access  Public
exports.getSlide = async (req, res) => {
  try {
    const slide = await HeroSlider.findById(req.params.id);
    
    if (!slide) {
      return res.status(404).json({
        success: false,
        message: 'Hero slide not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: slide
    });
  } catch (error) {
    console.error('Get slide error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch hero slide',
      error: error.message
    });
  }
};

// @desc    Create hero slide
// @route   POST /api/hero-slider
// @access  Private/Admin
exports.createSlide = async (req, res) => {
  try {
    const slideData = { ...req.body };
    
    // Handle image upload
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, 'hero-slider');
      slideData.image = {
        url: result.secure_url,
        publicId: result.public_id
      };
    }
    
    const slide = await HeroSlider.create(slideData);
    
    res.status(201).json({
      success: true,
      message: 'Hero slide created successfully',
      data: slide
    });
  } catch (error) {
    console.error('Create slide error:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to create hero slide',
      error: error.message
    });
  }
};

// @desc    Update hero slide
// @route   PUT /api/hero-slider/:id
// @access  Private/Admin
exports.updateSlide = async (req, res) => {
  try {
    let slide = await HeroSlider.findById(req.params.id);
    
    if (!slide) {
      return res.status(404).json({
        success: false,
        message: 'Hero slide not found'
      });
    }
    
    const updateData = { ...req.body };
    
    // Handle image upload
    if (req.file) {
      // Delete old image from Cloudinary
      if (slide.image?.publicId) {
        await deleteFromCloudinary(slide.image.publicId);
      }
      
      const result = await uploadToCloudinary(req.file.buffer, 'hero-slider');
      updateData.image = {
        url: result.secure_url,
        publicId: result.public_id
      };
    }
    
    slide = await HeroSlider.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      message: 'Hero slide updated successfully',
      data: slide
    });
  } catch (error) {
    console.error('Update slide error:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to update hero slide',
      error: error.message
    });
  }
};

// @desc    Delete hero slide
// @route   DELETE /api/hero-slider/:id
// @access  Private/Admin
exports.deleteSlide = async (req, res) => {
  try {
    const slide = await HeroSlider.findById(req.params.id);
    
    if (!slide) {
      return res.status(404).json({
        success: false,
        message: 'Hero slide not found'
      });
    }
    
    // Delete image from Cloudinary
    if (slide.image?.publicId) {
      await deleteFromCloudinary(slide.image.publicId);
    }
    
    await slide.deleteOne();
    
    res.status(200).json({
      success: true,
      message: 'Hero slide deleted successfully'
    });
  } catch (error) {
    console.error('Delete slide error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete hero slide',
      error: error.message
    });
  }
};

// @desc    Reorder hero slides
// @route   PUT /api/hero-slider/reorder
// @access  Private/Admin
exports.reorderSlides = async (req, res) => {
  try {
    const { slides } = req.body; // Array of { id, order }
    
    if (!Array.isArray(slides)) {
      return res.status(400).json({
        success: false,
        message: 'Slides must be an array'
      });
    }
    
    // Update order for each slide
    const updatePromises = slides.map(({ id, order }) =>
      HeroSlider.findByIdAndUpdate(id, { order }, { new: true })
    );
    
    await Promise.all(updatePromises);
    
    const updatedSlides = await HeroSlider.find({ isActive: true }).sort({ order: 1 });
    
    res.status(200).json({
      success: true,
      message: 'Slides reordered successfully',
      data: updatedSlides
    });
  } catch (error) {
    console.error('Reorder slides error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reorder slides',
      error: error.message
    });
  }
};
