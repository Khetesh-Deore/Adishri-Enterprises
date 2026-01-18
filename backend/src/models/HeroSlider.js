const mongoose = require('mongoose');

const heroSlideSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Slide title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  subtitle: {
    type: String,
    required: [true, 'Slide subtitle is required'],
    trim: true,
    maxlength: [150, 'Subtitle cannot exceed 150 characters']
  },
  description: {
    type: String,
    required: [true, 'Slide description is required'],
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  image: {
    url: {
      type: String,
      required: [true, 'Image URL is required']
    },
    publicId: String
  },
  ctaText: {
    type: String,
    required: [true, 'CTA text is required'],
    default: 'Learn More'
  },
  ctaLink: {
    type: String,
    required: [true, 'CTA link is required'],
    default: '/products'
  },
  secondaryText: {
    type: String,
    default: 'Contact Us'
  },
  secondaryLink: {
    type: String,
    default: '/contact'
  },
  badge: {
    type: String,
    required: [true, 'Badge text is required'],
    maxlength: [50, 'Badge cannot exceed 50 characters']
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

// Index for ordering
heroSlideSchema.index({ order: 1 });

module.exports = mongoose.model('HeroSlider', heroSlideSchema);
