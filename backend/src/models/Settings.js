const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  siteName: {
    type: String,
    default: 'Adishri Enterprises'
  },
  tagline: String,
  logo: {
    url: String,
    publicId: String
  },
  favicon: {
    url: String,
    publicId: String
  },
  footerText: String,
  copyrightText: String,
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String],
    ogImage: {
      url: String,
      publicId: String
    }
  },
  credentials: [{
    name: String,
    description: String
  }],
  analytics: {
    googleAnalyticsId: String,
    facebookPixelId: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
