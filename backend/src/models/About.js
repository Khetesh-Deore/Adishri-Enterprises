const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'About title is required'],
    trim: true
  },
  subtitle: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  mission: {
    title: String,
    description: String
  },
  vision: {
    title: String,
    description: String
  },
  image: {
    url: String,
    publicId: String
  },
  features: [{
    icon: String,
    title: String,
    description: String
  }],
  stats: [{
    value: String,
    label: String,
    suffix: String
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('About', aboutSchema);
