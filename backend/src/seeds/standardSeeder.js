const mongoose = require('mongoose');
const Standard = require('../models/Standard');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const standards = [
  {
    title: 'ISO 9001:2015',
    description: 'Certified quality management system ensuring consistent product excellence',
    icon: 'Shield',
    order: 0,
    isActive: true
  },
  {
    title: 'FDA Approved',
    description: 'Materials approved for food and pharmaceutical contact applications',
    icon: 'FlaskConical',
    order: 1,
    isActive: true
  },
  {
    title: 'BIS Certified',
    description: 'Compliance with Bureau of Indian Standards for plastic containers',
    icon: 'Award',
    order: 2,
    isActive: true
  },
  {
    title: 'Recyclable Materials',
    description: '100% recyclable HDPE and LDPE for sustainable packaging solutions',
    icon: 'Recycle',
    order: 3,
    isActive: true
  }
];

const seedStandards = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected...');

    await Standard.deleteMany();
    console.log('Standards cleared');

    await Standard.insertMany(standards);
    console.log('Standards seeded successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding standards:', error);
    process.exit(1);
  }
};

seedStandards();
