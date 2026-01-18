const mongoose = require('mongoose');
const CoreValue = require('../models/CoreValue');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const coreValues = [
  {
    title: 'Quality First',
    description: 'Rigorous quality control at every stage ensures our products meet the highest industry standards.',
    icon: 'Shield',
    color: 'from-blue-500 to-blue-600',
    order: 0,
    isActive: true
  },
  {
    title: 'Customer Focus',
    description: 'We prioritize customer satisfaction through responsive service and customized solutions.',
    icon: 'Users',
    color: 'from-green-500 to-green-600',
    order: 1,
    isActive: true
  },
  {
    title: 'Innovation',
    description: 'Continuous improvement and adoption of latest technology to deliver superior products.',
    icon: 'Zap',
    color: 'from-purple-500 to-purple-600',
    order: 2,
    isActive: true
  },
  {
    title: 'Integrity',
    description: 'Honest business practices and transparent communication build lasting relationships.',
    icon: 'Heart',
    color: 'from-red-500 to-red-600',
    order: 3,
    isActive: true
  }
];

const seedCoreValues = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected...');

    await CoreValue.deleteMany();
    console.log('Core Values cleared');

    await CoreValue.insertMany(coreValues);
    console.log('Core Values seeded successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding core values:', error);
    process.exit(1);
  }
};

seedCoreValues();
