const mongoose = require('mongoose');

const standardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  icon: {
    type: String,
    required: [true, 'Icon is required'],
    enum: ['Shield', 'FlaskConical', 'Award', 'Recycle', 'CheckCircle', 'Leaf', 'Factory', 'Package'],
    default: 'Shield'
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for sorting
standardSchema.index({ order: 1 });

module.exports = mongoose.model('Standard', standardSchema);
