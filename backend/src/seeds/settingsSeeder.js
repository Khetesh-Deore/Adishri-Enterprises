const mongoose = require('mongoose');
const Settings = require('../models/Settings');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const settingsData = {
  siteName: 'Adishri Enterprises',
  tagline: 'Premium HDPE & LDPE Bottles & Jerry Can Manufacturer',
  description: 'Leading manufacturer of high-quality plastic bottles and jerry cans for pharmaceuticals, chemicals, food, and industrial applications.',
  logo: {
    url: '/adishri_logo3.png'
  },
  favicon: {
    url: '/adishri_logo2.jpeg'
  },
  contactEmail: 'info@adishrienterprises.com',
  contactPhone: '+91 98765 43210',
  address: 'Plot No B 33/2, Shendra MIDC, Shendra, Chh. Sambhajinagar, Maharashtra - 431007',
  socialLinks: {
    facebook: 'https://facebook.com/adishrienterprises',
    twitter: 'https://twitter.com/adishrienterprises',
    linkedin: 'https://linkedin.com/company/adishrienterprises',
    instagram: 'https://instagram.com/adishrienterprises',
    youtube: ''
  },
  seo: {
    metaTitle: 'Adishri Enterprises - Premium HDPE & LDPE Bottles Manufacturer',
    metaDescription: 'Leading manufacturer of high-quality HDPE & LDPE bottles, jerry cans, and plastic containers for pharmaceuticals, chemicals, and industrial applications.',
    metaKeywords: 'HDPE bottles, LDPE bottles, jerry cans, plastic containers, pharmaceutical bottles, chemical bottles, industrial packaging',
    ogImage: '/adishri_logo3.png'
  },
  credentials: [
    {
      name: 'ISO 9001:2015',
      description: 'Quality Management System',
      icon: 'Shield'
    },
    {
      name: 'FDA Approved',
      description: 'Food & Drug Administration',
      icon: 'FlaskConical'
    },
    {
      name: 'BIS Certified',
      description: 'Bureau of Indian Standards',
      icon: 'Award'
    },
    {
      name: 'Export Ready',
      description: 'International Standards',
      icon: 'Globe'
    }
  ],
  businessHours: {
    monday: '9:00 AM - 6:00 PM',
    tuesday: '9:00 AM - 6:00 PM',
    wednesday: '9:00 AM - 6:00 PM',
    thursday: '9:00 AM - 6:00 PM',
    friday: '9:00 AM - 6:00 PM',
    saturday: '9:00 AM - 6:00 PM',
    sunday: 'Closed'
  },
  copyrightText: '© 2024 Adishri Enterprises. All rights reserved.',
  maintenanceMode: false,
  isActive: true
};

const seedSettings = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected...');

    await Settings.deleteMany();
    console.log('Settings cleared');

    await Settings.create(settingsData);
    console.log('Settings seeded successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding settings:', error);
    process.exit(1);
  }
};

seedSettings();
