require('dotenv').config();
const mongoose = require('mongoose');
const { Gallery } = require('../models');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

const galleryImages = [
  {
    image: { url: "/product1.jpeg" },
    title: "Wide Mouth HDPE Bottle",
    caption: "Pharmaceutical and chemical storage solution",
    category: "products",
    order: 1,
    isActive: true
  },
  {
    image: { url: "/product2.jpeg" },
    title: "Narrow Mouth HDPE Bottle",
    caption: "Precision pouring for controlled dispensing",
    category: "products",
    order: 2,
    isActive: true
  },
  {
    image: { url: "/product3.jpeg" },
    title: "Round Wide Mouth Bottles",
    caption: "Industrial grade chemical containers",
    category: "products",
    order: 3,
    isActive: true
  },
  {
    image: { url: "/product4.jpeg" },
    title: "LDPE Plastic Bottle",
    caption: "Flexible dispensing for household chemicals",
    category: "products",
    order: 4,
    isActive: true
  },
  {
    image: { url: "/product5.jpeg" },
    title: "Pharmaceutical HDPE Bottle",
    caption: "FDA approved healthcare packaging",
    category: "products",
    order: 5,
    isActive: true
  },
  {
    image: { url: "/product6.jpeg" },
    title: "LDPE Squeeze Bottle",
    caption: "Food grade flexible dispensing",
    category: "products",
    order: 6,
    isActive: true
  },
  {
    image: { url: "/product7.jpeg" },
    title: "Agro Chemical HDPE Bottle",
    caption: "UV stabilized agricultural packaging",
    category: "products",
    order: 7,
    isActive: true
  },
  {
    image: { url: "/product8.jpeg" },
    title: "Jerry Can",
    caption: "Heavy duty bulk storage solution",
    category: "products",
    order: 8,
    isActive: true
  }
];

const seedGallery = async () => {
  try {
    await connectDB();

    // Clear existing gallery
    await Gallery.deleteMany({});
    console.log('🗑️  Cleared existing gallery images');

    // Insert new gallery images
    const createdImages = await Gallery.insertMany(galleryImages);
    console.log(`✅ Seeded ${createdImages.length} gallery images`);

    console.log('\n🖼️  Gallery seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding gallery:', error);
    process.exit(1);
  }
};

seedGallery();
