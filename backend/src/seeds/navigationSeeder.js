const mongoose = require('mongoose');
const Navigation = require('../models/Navigation');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const navigationData = {
  navLinks: [
    { id: 'home', name: 'Home', href: '/', order: 0 },
    { id: 'about', name: 'About', href: '/about', order: 1 },
    { id: 'products', name: 'Products', href: '/products', order: 2 },
    { id: 'vision', name: 'Vision', href: '/vision', order: 3 },
    { id: 'contact', name: 'Contact', href: '/contact', order: 4 }
  ],
  footerQuickLinks: [
    { name: 'Home', href: '/', order: 0 },
    { name: 'About Us', href: '/about', order: 1 },
    { name: 'Products', href: '/products', order: 2 },
    { name: 'Vision', href: '/vision', order: 3 },
    { name: 'Contact', href: '/contact', order: 4 }
  ],
  footerResources: [
    { name: 'Privacy Policy', href: '/privacy', order: 0 },
    { name: 'Terms of Service', href: '/terms', order: 1 },
    { name: 'FAQ', href: '/faq', order: 2 },
    { name: 'Support', href: '/support', order: 3 }
  ],
  socialLinks: {
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com'
  },
  whatsapp: {
    number: '919876543210',
    message: 'Hello! I would like to inquire about your products.'
  }
};

const seedNavigation = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected...');

    await Navigation.deleteMany();
    console.log('Navigation cleared');

    await Navigation.create(navigationData);
    console.log('Navigation seeded successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding navigation:', error);
    process.exit(1);
  }
};

seedNavigation();
