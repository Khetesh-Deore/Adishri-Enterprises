const mongoose = require('mongoose');
const Gallery = require('../models/Gallery');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const galleryImages = [
  {
    title: 'Wide Mouth HDPE Bottle',
    caption: 'Pharmaceutical and chemical storage solution',
    category: 'products',
    image: { url: '/product1.jpeg' },
    order: 0,
    isActive: true
  },
  {
    title: 'LDPE Squeeze Bottle',
    caption: 'Flexible design for controlled dispensing',
    category: 'products',
    image: { url: '/product2.jpeg' },
    order: 1,
    isActive: true
  },
  {
    title: 'HDPE Jerry Can 5L',
    caption: 'Heavy-duty bulk storage solution',
    category: 'products',
    image: { url: '/product3.jpeg' },
    order: 2,
    isActive: true
  },
  {
    title: 'Narrow Mouth Bottle',
    caption: 'Precision pouring for laboratory use',
    category: 'products',
    image: { url: '/product4.jpeg' },
    order: 3,
    isActive: true
  },
  {
    title: 'LDPE Dropper Bottle',
    caption: 'Accurate liquid dispensing',
    category: 'products',
    image: { url: '/product5.jpeg' },
    order: 4,
    isActive: true
  },
  {
    title: 'HDPE Jerry Can 20L',
    caption: 'Industrial grade bulk container',
    category: 'products',
    image: { url: '/product6.jpeg' },
    order: 5,
    isActive: true
  },
  {
    title: 'HDPE Spray Bottle',
    caption: 'Multi-purpose spray application',
    category: 'products',
    image: { url: '/product7.jpeg' },
    order: 6,
    isActive: true
  },
  {
    title: 'LDPE Wash Bottle',
    caption: 'Laboratory precision rinsing',
    category: 'products',
    image: { url: '/product8.jpeg' },
    order: 7,
    isActive: true
  }
];

const seedGallery = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected...');

    await Gallery.deleteMany();
    console.log('Gallery cleared');

    await Gallery.insertMany(galleryImages);
    console.log(`${galleryImages.length} gallery images seeded successfully`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding gallery:', error);
    process.exit(1);
  }
};

seedGallery();
