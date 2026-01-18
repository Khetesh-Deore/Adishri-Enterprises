const mongoose = require('mongoose');
const Product = require('../models/Product');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const products = [
  {
    name: 'HDPE Wide Mouth Bottle - 500ml',
    description: 'High-density polyethylene bottle with wide mouth opening, perfect for pharmaceutical and chemical storage. Features leak-proof cap and durable construction.',
    category: 'HDPE Bottles',
    capacity: '500ml',
    material: 'HDPE',
    color: 'Natural/White',
    features: ['Leak-proof cap', 'Chemical resistant', 'FDA approved', 'Wide mouth opening'],
    applications: ['Pharmaceuticals', 'Chemicals', 'Food storage', 'Laboratory use'],
    specifications: {
      height: '180mm',
      diameter: '75mm',
      weight: '45g',
      neckSize: '63mm'
    },
    image: { url: '/product1.jpeg' },
    price: 25,
    inStock: true,
    featured: true,
    order: 0
  },
  {
    name: 'LDPE Squeeze Bottle - 250ml',
    description: 'Low-density polyethylene squeeze bottle ideal for liquids and semi-liquids. Flexible body with precision tip for controlled dispensing.',
    category: 'LDPE Bottles',
    capacity: '250ml',
    material: 'LDPE',
    color: 'Transparent',
    features: ['Flexible squeeze design', 'Precision tip', 'Easy to clean', 'Reusable'],
    applications: ['Condiments', 'Oils', 'Sauces', 'Laboratory reagents'],
    specifications: {
      height: '150mm',
      diameter: '60mm',
      weight: '30g',
      neckSize: '28mm'
    },
    image: { url: '/product2.jpeg' },
    price: 18,
    inStock: true,
    featured: true,
    order: 1
  },
  {
    name: 'HDPE Jerry Can - 5 Liters',
    description: 'Heavy-duty jerry can for bulk liquid storage and transportation. Stackable design with ergonomic handle for easy carrying.',
    category: 'Jerry Cans',
    capacity: '5L',
    material: 'HDPE',
    color: 'Blue',
    features: ['Heavy-duty construction', 'Stackable design', 'Ergonomic handle', 'Tamper-evident cap'],
    applications: ['Industrial chemicals', 'Lubricants', 'Water storage', 'Agricultural products'],
    specifications: {
      height: '280mm',
      width: '180mm',
      depth: '120mm',
      weight: '280g'
    },
    image: { url: '/product3.jpeg' },
    price: 85,
    inStock: true,
    featured: true,
    order: 2
  },
  {
    name: 'HDPE Narrow Mouth Bottle - 1 Liter',
    description: 'Narrow mouth bottle for precise pouring and controlled dispensing. Ideal for liquids that require careful handling.',
    category: 'HDPE Bottles',
    capacity: '1L',
    material: 'HDPE',
    color: 'Natural/White',
    features: ['Narrow mouth for precision', 'Graduated markings', 'Chemical resistant', 'Autoclavable'],
    applications: ['Laboratory chemicals', 'Reagents', 'Solvents', 'Industrial liquids'],
    specifications: {
      height: '240mm',
      diameter: '90mm',
      weight: '65g',
      neckSize: '28mm'
    },
    image: { url: '/product4.jpeg' },
    price: 35,
    inStock: true,
    featured: false,
    order: 3
  },
  {
    name: 'LDPE Dropper Bottle - 100ml',
    description: 'Precision dropper bottle for accurate liquid dispensing. Perfect for essential oils, tinctures, and laboratory applications.',
    category: 'LDPE Bottles',
    capacity: '100ml',
    material: 'LDPE',
    color: 'Amber',
    features: ['Precision dropper', 'UV protection', 'Child-resistant cap', 'Graduated markings'],
    applications: ['Essential oils', 'Tinctures', 'Eye drops', 'Laboratory samples'],
    specifications: {
      height: '110mm',
      diameter: '45mm',
      weight: '18g',
      dropperLength: '70mm'
    },
    image: { url: '/product5.jpeg' },
    price: 22,
    inStock: true,
    featured: false,
    order: 4
  },
  {
    name: 'HDPE Jerry Can - 20 Liters',
    description: 'Large capacity jerry can for industrial and commercial use. Robust construction with secure closure system.',
    category: 'Jerry Cans',
    capacity: '20L',
    material: 'HDPE',
    color: 'White',
    features: ['Large capacity', 'UN certified', 'Stackable', 'Reinforced handle'],
    applications: ['Bulk chemicals', 'Industrial oils', 'Water transport', 'Agricultural chemicals'],
    specifications: {
      height: '420mm',
      width: '280mm',
      depth: '180mm',
      weight: '850g'
    },
    image: { url: '/product6.jpeg' },
    price: 195,
    inStock: true,
    featured: true,
    order: 5
  },
  {
    name: 'HDPE Spray Bottle - 500ml',
    description: 'Multi-purpose spray bottle with adjustable nozzle. Perfect for cleaning solutions, gardening, and personal care products.',
    category: 'HDPE Bottles',
    capacity: '500ml',
    material: 'HDPE',
    color: 'Transparent',
    features: ['Adjustable spray nozzle', 'Trigger mechanism', 'Chemical resistant', 'Ergonomic design'],
    applications: ['Cleaning solutions', 'Gardening', 'Personal care', 'Disinfectants'],
    specifications: {
      height: '220mm',
      diameter: '70mm',
      weight: '55g',
      sprayPattern: 'Adjustable'
    },
    image: { url: '/product7.jpeg' },
    price: 32,
    inStock: true,
    featured: false,
    order: 6
  },
  {
    name: 'LDPE Wash Bottle - 500ml',
    description: 'Laboratory wash bottle with angled spout for precise rinsing. Ideal for distilled water, solvents, and cleaning solutions.',
    category: 'LDPE Bottles',
    capacity: '500ml',
    material: 'LDPE',
    color: 'Natural',
    features: ['Angled spout', 'One-piece molding', 'Flexible body', 'Leak-proof'],
    applications: ['Laboratory rinsing', 'Distilled water', 'Solvents', 'Cleaning'],
    specifications: {
      height: '200mm',
      diameter: '75mm',
      weight: '40g',
      spoutLength: '120mm'
    },
    image: { url: '/product8.jpeg' },
    price: 28,
    inStock: true,
    featured: false,
    order: 7
  }
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected...');

    await Product.deleteMany();
    console.log('Products cleared');

    await Product.insertMany(products);
    console.log(`${products.length} products seeded successfully`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();
