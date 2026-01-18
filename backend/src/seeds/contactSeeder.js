const mongoose = require('mongoose');
const Contact = require('../models/Contact');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const contactData = {
  company: 'Adishri Enterprises',
  tagline: 'Premium HDPE & LDPE Bottles & Jerry Can Manufacturer',
  address: {
    street: 'Plot No B 33/2, Shendra MIDC',
    area: 'Shendra',
    city: 'Chh. Sambhajinagar',
    state: 'Maharashtra',
    pincode: '431007',
    country: 'India',
    full: 'Plot No B 33/2, Shendra MIDC, Shendra, Chh. Sambhajinagar, Maharashtra - 431007'
  },
  phone: {
    primary: '+91 98765 43210',
    secondary: '+91 98765 43211',
    landline: '0240-1234567'
  },
  email: {
    primary: 'info@adishrienterprises.com',
    sales: 'sales@adishrienterprises.com',
    support: 'support@adishrienterprises.com'
  },
  workingHours: {
    weekdays: 'Monday - Saturday: 9:00 AM - 6:00 PM',
    weekend: 'Sunday: Closed',
    full: 'Mon - Sat: 9:00 AM - 6:00 PM'
  },
  whatsapp: '919876543210',
  socialLinks: {
    facebook: 'https://facebook.com/adishrienterprises',
    twitter: 'https://twitter.com/adishrienterprises',
    linkedin: 'https://linkedin.com/company/adishrienterprises',
    instagram: 'https://instagram.com/adishrienterprises'
  },
  mapLocation: {
    latitude: 19.9078,
    longitude: 75.3436,
    embedUrl: 'https://maps.google.com/maps?q=19.9078,75.3436&z=15&output=embed'
  },
  isActive: true
};

const seedContact = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected...');

    await Contact.deleteMany();
    console.log('Contact cleared');

    await Contact.create(contactData);
    console.log('Contact seeded successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding contact:', error);
    process.exit(1);
  }
};

seedContact();
