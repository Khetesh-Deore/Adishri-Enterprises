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
  // Excellence section images
  excellenceImages: [{
    url: String,
    publicId: String,
    alt: String
  }],
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
  // New fields for Excellence section
  experienceYears: {
    type: String,
    default: '15'
  },
  aboutText: {
    type: String,
    default: 'With over 15 years of experience, we have established ourselves as a trusted manufacturer serving pharmaceutical, chemical, agricultural, and industrial sectors across India.'
  },
  facilityText: {
    type: String,
    default: 'Our state-of-the-art facility uses advanced blow molding technology to produce high-quality bottles ranging from 200ml to 5L capacity, meeting the diverse needs of our clients.'
  },
  capacityStats: [{
    label: String,
    value: String,
    suffix: String
  }],
  packagingFeatures: [{
    type: String
  }],
  industries: [{
    icon: String,
    name: String,
    description: String,
    color: String
  }],
  manufacturingTitle: {
    type: String,
    default: 'Manufacturing Excellence'
  },
  manufacturingDescription: {
    type: String,
    default: 'Our advanced facility operates with cutting-edge blow molding technology, ensuring high-volume production without compromising on quality.'
  },
  manufacturingStats: [{
    icon: String,
    value: String,
    label: String
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('About', aboutSchema);
