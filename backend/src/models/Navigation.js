const mongoose = require('mongoose');

const navigationSchema = new mongoose.Schema({
  // Main Navigation Links
  navLinks: [{
    id: String,
    name: String,
    href: String,
    order: { type: Number, default: 0 }
  }],
  
  // Footer Quick Links
  footerQuickLinks: [{
    name: String,
    href: String,
    order: { type: Number, default: 0 }
  }],
  
  // Footer Resources
  footerResources: [{
    name: String,
    href: String,
    order: { type: Number, default: 0 }
  }],
  
  // Social Links
  socialLinks: {
    facebook: { type: String, default: '' },
    twitter: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    instagram: { type: String, default: '' }
  },
  
  // WhatsApp Configuration
  whatsapp: {
    number: { type: String, default: '' },
    message: { type: String, default: 'Hello! I would like to inquire about your products.' }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Navigation', navigationSchema);
