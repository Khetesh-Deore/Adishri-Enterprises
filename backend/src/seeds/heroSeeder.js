const mongoose = require('mongoose');
const Hero = require('../models/Hero');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const heroData = {
  title: 'Premium HDPE & LDPE Bottles',
  subtitle: 'Quality Packaging Solutions for Every Industry',
  description: 'Leading manufacturer of high-quality plastic bottles and jerry cans for pharmaceuticals, chemicals, food, and industrial applications. ISO certified with over 15 years of excellence.',
  ctaButton: {
    text: 'Explore Products',
    link: '/products'
  },
  secondaryButton: {
    text: 'Contact Us',
    link: '/contact'
  },
  backgroundImage: {
    url: '/product1.jpeg'
  },
  stats: [
    { label: 'Years Experience', value: '15+' },
    { label: 'Products Range', value: '500+' },
    { label: 'Happy Clients', value: '1000+' },
    { label: 'Quality Certified', value: 'ISO 9001' }
  ],
  isActive: true
};

const seedHero = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected...');

    await Hero.deleteMany();
    console.log('Hero cleared');

    await Hero.create(heroData);
    console.log('Hero seeded successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding hero:', error);
    process.exit(1);
  }
};

seedHero();
