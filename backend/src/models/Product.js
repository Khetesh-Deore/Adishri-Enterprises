const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Product description is required']
  },
  shortDescription: {
    type: String,
    maxlength: [200, 'Short description cannot exceed 200 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['hdpe-bottles', 'ldpe-bottles', 'jerry-cans', 'caps-closures', 'custom-moulded']
  },
  capacity: {
    type: String,
    trim: true
  },
  image: {
    url: String,
    publicId: String
  },
  gallery: [{
    url: String,
    publicId: String
  }],
  features: [String],
  specifications: [{
    key: String,
    value: String
  }],
  order: {
    type: Number,
    default: 0
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

// Index for sorting and filtering
productSchema.index({ category: 1, order: 1 });
productSchema.index({ isFeatured: 1 });

module.exports = mongoose.model('Product', productSchema);
