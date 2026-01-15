require('dotenv').config();
const mongoose = require('mongoose');
const { Product } = require('../models');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

const products = [
  {
    name: "Jerry Can",
    category: "jerry-cans",
    capacity: "5L",
    image: "/product8.jpeg",
    description: "Large capacity HDPE jerry can suitable for bulk storage and transport of liquids.",
    specifications: {
      material: "HDPE",
      neckSize: "50 mm",
      height: "340 mm",
      width: "230 mm",
      weight: "380 g"
    },
    features: ["Heavy Duty", "Double Handle", "Stackable"],
    applications: ["Industrial", "Agricultural", "Automotive"],
    isActive: true,
    order: 1
  },
  {
    name: "Narrow Mouth HDPE Bottle",
    category: "hdpe-bottles",
    capacity: "4 ML-1 L",
    image: "/product2.jpeg",
    description: "Narrow mouth HDPE bottle designed for controlled and precise pouring of liquids.",
    specifications: {
      material: "HDPE",
      neckSize: "28 mm",
      height: "220 mm",
      diameter: "90 mm",
      weight: "45 g"
    },
    features: ["Precision Pouring", "Stackable", "UV Resistant"],
    applications: ["Chemicals", "Solvents", "Industrial"],
    isActive: true,
    order: 2
  },
  {
    name: "Round bottles with wide mouths",
    category: "hdpe-bottles",
    capacity: "100 ML - 5 L",
    image: "/product3.jpeg",
    description: "Strong, chemical- and UV-resistant containers ideal for chemicals, pharmaceuticals, and personal care products.",
    specifications: {
      material: "HDPE",
      neckSize: "50 mm",
      height: "280 mm",
      width: "180 mm",
      weight: "200 g"
    },
    features: ["Industrial Grade", "Strong Handle", "Leak Proof"],
    applications: ["Chemicals", "Lubricants", "Agricultural"],
    isActive: true,
    order: 3
  },
  {
    name: "LDPE Plastic Bottle",
    category: "ldpe-bottles",
    capacity: "250ml - 1L",
    image: "/product4.jpeg",
    description: "They are designed with a narrow neck and a flip-top or pull-push cap for controlled dispensing of liquids like dish soap or other household chemicals.",
    specifications: {
      material: "LDPE",
      neckSize: "45 mm",
      height: "250 mm",
      diameter: "120 mm",
      weight: "95 g"
    },
    features: ["Chemical Resistant", "Tamper Evident", "Leak Proof"],
    applications: ["Chemicals", "Solvents", "Industrial"],
    isActive: true,
    order: 4
  },
  {
    name: "Pharmaceutical HDPE Bottle",
    category: "hdpe-bottles",
    capacity: "100ml - 500ml",
    image: "/product5.jpeg",
    description: "Compact pharmaceutical-grade HDPE bottle suitable for medicines and healthcare products.",
    specifications: {
      material: "HDPE",
      neckSize: "28 mm",
      height: "140 mm",
      diameter: "60 mm",
      weight: "22 g"
    },
    features: ["FDA Approved", "Light Weight", "Leak Proof"],
    applications: ["Pharmaceuticals", "Nutraceuticals", "Healthcare"],
    isActive: true,
    order: 5
  },
  {
    name: "LDPE Squeeze Bottle",
    category: "ldpe-bottles",
    capacity: "250 ml",
    image: "/product6.jpeg",
    description: "Flexible LDPE squeeze bottle for easy and controlled dispensing.",
    specifications: {
      material: "LDPE",
      neckSize: "24 mm",
      height: "150 mm",
      diameter: "55 mm",
      weight: "18 g"
    },
    features: ["Flexible Body", "Easy Dispensing", "Food Grade"],
    applications: ["Food", "Cosmetics", "Laboratory"],
    isActive: true,
    order: 6
  },
  {
    name: "Agro Chemical HDPE Bottle",
    category: "hdpe-bottles",
    capacity: "1 L",
    image: "/product7.jpeg",
    description: "UV-stabilized HDPE bottle designed for agricultural chemicals and pesticides.",
    specifications: {
      material: "HDPE",
      neckSize: "38 mm",
      height: "210 mm",
      diameter: "95 mm",
      weight: "55 g"
    },
    features: ["UV Stabilized", "Chemical Resistant", "Strong Body"],
    applications: ["Agricultural", "Pesticides", "Fertilizers"],
    isActive: true,
    order: 7
  },
  {
    name: "Wide Mouth HDPE Bottle",
    category: "hdpe-bottles",
    capacity: "500 ml",
    image: "/product1.jpeg",
    description: "Wide mouth HDPE bottle suitable for pharmaceutical and chemical storage. Easy filling and cleaning.",
    specifications: {
      material: "HDPE",
      neckSize: "38 mm",
      height: "185 mm",
      diameter: "75 mm",
      weight: "32 g"
    },
    features: ["Chemical Resistant", "Leak Proof", "Reusable"],
    applications: ["Pharmaceuticals", "Chemicals", "Laboratory"],
    isActive: true,
    order: 8
  }
];

const seedProducts = async () => {
  try {
    await connectDB();

    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    // Insert new products
    const createdProducts = await Product.insertMany(products);
    console.log(`✅ Seeded ${createdProducts.length} products`);

    console.log('\n📦 Products seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();
