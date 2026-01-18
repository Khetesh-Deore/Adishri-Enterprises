const mongoose = require('mongoose');

const coreValueSchema = new mongoose.Schema({
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
    enum: ['Shield', 'Users', 'Zap', 'Heart', 'Award', 'Target', 'TrendingUp', 'CheckCircle'],
    default: 'Shield'
  },
  color: {
    type: String,
    required: [true, 'Color gradient is required'],
    default: 'from-blue-500 to-blue-600'
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
coreValueSchema.index({ order: 1 });

module.exports = mongoose.model('CoreValue', coreValueSchema);
