const mongoose = require('mongoose');
const About = require('../models/About');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const aboutData = {
  title: 'About Adishri Enterprises',
  subtitle: 'Excellence in Plastic Packaging Manufacturing',
  description: 'Adishri Enterprises is a leading manufacturer of high-quality HDPE and LDPE bottles, jerry cans, and plastic containers. With over 15 years of industry experience, we have established ourselves as a trusted name in the packaging industry.',
  mission: {
    title: 'Our Mission',
    description: 'To provide superior quality plastic packaging solutions that meet international standards while maintaining competitive pricing and exceptional customer service. We are committed to innovation, sustainability, and customer satisfaction.'
  },
  vision: {
    title: 'Our Vision',
    description: 'To become India\'s most trusted and preferred manufacturer of plastic packaging solutions, recognized for quality, innovation, and environmental responsibility. We aim to expand our reach globally while maintaining our commitment to excellence.'
  },
  story: {
    title: 'Our Story',
    content: 'Founded in 2009, Adishri Enterprises began with a vision to revolutionize the plastic packaging industry in India. Starting with a small manufacturing unit, we have grown into a state-of-the-art facility equipped with modern machinery and technology. Our journey has been marked by continuous innovation, quality improvement, and customer-centric approach.'
  },
  achievements: [
    {
      title: 'ISO 9001:2015 Certified',
      description: 'Quality management system certification',
      year: '2015'
    },
    {
      title: 'FDA Approved Materials',
      description: 'Food and pharmaceutical grade certification',
      year: '2017'
    },
    {
      title: '1000+ Satisfied Clients',
      description: 'Serving diverse industries across India',
      year: '2023'
    },
    {
      title: 'Export Ready',
      description: 'International quality standards compliance',
      year: '2024'
    }
  ],
  team: {
    title: 'Our Team',
    description: 'Our success is driven by a dedicated team of professionals with expertise in manufacturing, quality control, and customer service. We invest in continuous training and development to ensure our team stays ahead of industry trends.'
  },
  facilities: {
    title: 'Manufacturing Facilities',
    description: 'Our state-of-the-art manufacturing facility is located in Shendra MIDC, Aurangabad, equipped with advanced blow molding machines, quality testing equipment, and automated production lines. We maintain strict quality control at every stage of production.'
  },
  isActive: true
};

const seedAbout = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected...');

    await About.deleteMany();
    console.log('About cleared');

    await About.create(aboutData);
    console.log('About seeded successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding about:', error);
    process.exit(1);
  }
};

seedAbout();
