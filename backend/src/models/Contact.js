const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
    default: 'Adishri Enterprises'
  },
  tagline: {
    type: String,
    default: 'Premium HDPE & LDPE Bottles & Jerry Can Manufacturer'
  },
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String,
    full: String
  },
  phone: {
    primary: String,
    secondary: String
  },
  whatsapp: String,
  email: {
    primary: String,
    secondary: String
  },
  workingHours: {
    type: String,
    default: 'Mon - Sat: 9:00 AM - 6:00 PM'
  },
  mapLink: String,
  mapEmbed: String,
  socialLinks: {
    facebook: String,
    twitter: String,
    linkedin: String,
    instagram: String,
    youtube: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);
