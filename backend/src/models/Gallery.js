const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true
  },
  caption: {
    type: String,
    trim: true,
    maxlength: [300, 'Caption cannot exceed 300 characters']
  },
  image: {
    url: { type: String, required: true },
    publicId: String
  },
  category: {
    type: String,
    enum: ['products', 'factory', 'team', 'events', 'general'],
    default: 'general'
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

gallerySchema.index({ category: 1, order: 1 });

module.exports = mongoose.model('Gallery', gallerySchema);
