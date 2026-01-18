// This script seeds data directly to the cloud MongoDB
const mongoose = require('mongoose');

// Cloud MongoDB URI
const CLOUD_MONGODB_URI = 'mongodb+srv://khetesh:Khetesh%40123@adishri.zybxdok.mongodb.net/adishri-db?retryWrites=true&w=majority';

// Import all models
const Hero = require('../models/Hero');
const About = require('../models/About');
const Vision = require('../models/Vision');
const Product = require('../models/Product');
const Gallery = require('../models/Gallery');
const Contact = require('../models/Contact');
const Settings = require('../models/Settings');
const CoreValue = require('../models/CoreValue');
const Standard = require('../models/Standard');
const Navigation = require('../models/Navigation');
const User = require('../models/User');

// Seed Data (same as masterSeeder.js)
const heroData = {
  title: 'Premium HDPE & LDPE Bottles',
  subtitle: 'Quality Packaging Solutions for Every Industry',
  description: 'Leading manufacturer of high-quality plastic bottles and jerry cans for pharmaceuticals, chemicals, food, and industrial applications. ISO certified with over 15 years of excellence.',
  ctaButton: { text: 'Explore Products', link: '/products' },
  secondaryButton: { text: 'Contact Us', link: '/contact' },
  backgroundImage: { url: '/product1.jpeg' },
  stats: [
    { label: 'Years Experience', value: '15+' },
    { label: 'Products Range', value: '500+' },
    { label: 'Happy Clients', value: '1000+' },
    { label: 'Quality Certified', value: 'ISO 9001' }
  ],
  isActive: true
};

const aboutData = {
  title: 'About Adishri Enterprises',
  subtitle: 'Excellence in Plastic Packaging Manufacturing',
  description: 'Adishri Enterprises is a leading manufacturer of high-quality HDPE and LDPE bottles, jerry cans, and plastic containers. With over 15 years of industry experience, we have established ourselves as a trusted name in the packaging industry.',
  mission: {
    title: 'Our Mission',
    description: 'To provide superior quality plastic packaging solutions that meet international standards while maintaining competitive pricing and exceptional customer service.'
  },
  vision: {
    title: 'Our Vision',
    description: 'To become India\'s most trusted and preferred manufacturer of plastic packaging solutions, recognized for quality, innovation, and environmental responsibility.'
  },
  isActive: true
};

const visionData = {
  title: 'Our Vision & Mission',
  subtitle: 'Building a Sustainable Future in Packaging',
  vision: {
    title: 'Vision',
    description: 'To become India\'s most trusted manufacturer of plastic packaging solutions, recognized globally for quality and innovation.',
    icon: 'Eye',
    color: 'from-blue-500 to-blue-600'
  },
  mission: {
    title: 'Mission',
    description: 'To provide superior quality plastic packaging solutions that meet international standards while maintaining competitive pricing.',
    icon: 'Target',
    color: 'from-green-500 to-green-600'
  },
  isActive: true
};

const productsData = [
  {
    name: 'HDPE Wide Mouth Bottle - 500ml',
    description: 'High-density polyethylene bottle with wide mouth opening, perfect for pharmaceutical and chemical storage.',
    category: 'hdpe-bottles',
    capacity: '500ml',
    features: ['Leak-proof cap', 'Chemical resistant', 'FDA approved', 'Wide mouth opening'],
    specifications: [
      { key: 'Material', value: 'HDPE' },
      { key: 'Color', value: 'Natural/White' },
      { key: 'Applications', value: 'Pharmaceuticals, Chemicals, Food storage' }
    ],
    image: { url: '/product1.jpeg' },
    order: 0,
    isFeatured: true,
    isActive: true
  },
  {
    name: 'LDPE Squeeze Bottle - 250ml',
    description: 'Low-density polyethylene squeeze bottle ideal for liquids and semi-liquids.',
    category: 'ldpe-bottles',
    capacity: '250ml',
    features: ['Flexible squeeze design', 'Precision tip', 'Easy to clean', 'Reusable'],
    specifications: [
      { key: 'Material', value: 'LDPE' },
      { key: 'Color', value: 'Transparent' },
      { key: 'Applications', value: 'Condiments, Oils, Sauces' }
    ],
    image: { url: '/product2.jpeg' },
    order: 1,
    isFeatured: true,
    isActive: true
  },
  {
    name: 'HDPE Jerry Can - 5 Liters',
    description: 'Heavy-duty jerry can for bulk liquid storage and transportation.',
    category: 'jerry-cans',
    capacity: '5L',
    features: ['Heavy-duty construction', 'Stackable design', 'Ergonomic handle', 'Tamper-evident cap'],
    specifications: [
      { key: 'Material', value: 'HDPE' },
      { key: 'Color', value: 'Blue' },
      { key: 'Applications', value: 'Industrial chemicals, Lubricants, Water storage' }
    ],
    image: { url: '/product3.jpeg' },
    order: 2,
    isFeatured: true,
    isActive: true
  },
  {
    name: 'HDPE Narrow Mouth Bottle - 1 Liter',
    description: 'Narrow mouth bottle for precise pouring and controlled dispensing.',
    category: 'hdpe-bottles',
    capacity: '1L',
    features: ['Narrow mouth for precision', 'Graduated markings', 'Chemical resistant', 'Autoclavable'],
    specifications: [
      { key: 'Material', value: 'HDPE' },
      { key: 'Color', value: 'Natural/White' },
      { key: 'Applications', value: 'Laboratory chemicals, Reagents, Solvents' }
    ],
    image: { url: '/product4.jpeg' },
    order: 3,
    isFeatured: false,
    isActive: true
  },
  {
    name: 'LDPE Dropper Bottle - 100ml',
    description: 'Precision dropper bottle for accurate liquid dispensing.',
    category: 'ldpe-bottles',
    capacity: '100ml',
    features: ['Precision dropper', 'UV protection', 'Child-resistant cap', 'Graduated markings'],
    specifications: [
      { key: 'Material', value: 'LDPE' },
      { key: 'Color', value: 'Amber' },
      { key: 'Applications', value: 'Essential oils, Tinctures, Eye drops' }
    ],
    image: { url: '/product5.jpeg' },
    order: 4,
    isFeatured: false,
    isActive: true
  },
  {
    name: 'HDPE Jerry Can - 20 Liters',
    description: 'Large capacity jerry can for industrial and commercial use.',
    category: 'jerry-cans',
    capacity: '20L',
    features: ['Large capacity', 'UN certified', 'Stackable', 'Reinforced handle'],
    specifications: [
      { key: 'Material', value: 'HDPE' },
      { key: 'Color', value: 'White' },
      { key: 'Applications', value: 'Bulk chemicals, Industrial oils, Water transport' }
    ],
    image: { url: '/product6.jpeg' },
    order: 5,
    isFeatured: true,
    isActive: true
  },
  {
    name: 'HDPE Spray Bottle - 500ml',
    description: 'Multi-purpose spray bottle with adjustable nozzle.',
    category: 'hdpe-bottles',
    capacity: '500ml',
    features: ['Adjustable spray nozzle', 'Trigger mechanism', 'Chemical resistant', 'Ergonomic design'],
    specifications: [
      { key: 'Material', value: 'HDPE' },
      { key: 'Color', value: 'Transparent' },
      { key: 'Applications', value: 'Cleaning solutions, Gardening, Personal care' }
    ],
    image: { url: '/product7.jpeg' },
    order: 6,
    isFeatured: false,
    isActive: true
  },
  {
    name: 'LDPE Wash Bottle - 500ml',
    description: 'Laboratory wash bottle with angled spout for precise rinsing.',
    category: 'ldpe-bottles',
    capacity: '500ml',
    features: ['Angled spout', 'One-piece molding', 'Flexible body', 'Leak-proof'],
    specifications: [
      { key: 'Material', value: 'LDPE' },
      { key: 'Color', value: 'Natural' },
      { key: 'Applications', value: 'Laboratory rinsing, Distilled water, Solvents' }
    ],
    image: { url: '/product8.jpeg' },
    order: 7,
    isFeatured: false,
    isActive: true
  }
];

const galleryData = [
  { title: 'Wide Mouth HDPE Bottle', caption: 'Pharmaceutical and chemical storage solution', category: 'products', image: { url: '/product1.jpeg' }, order: 0, isActive: true },
  { title: 'LDPE Squeeze Bottle', caption: 'Flexible design for controlled dispensing', category: 'products', image: { url: '/product2.jpeg' }, order: 1, isActive: true },
  { title: 'HDPE Jerry Can 5L', caption: 'Heavy-duty bulk storage solution', category: 'products', image: { url: '/product3.jpeg' }, order: 2, isActive: true },
  { title: 'Narrow Mouth Bottle', caption: 'Precision pouring for laboratory use', category: 'products', image: { url: '/product4.jpeg' }, order: 3, isActive: true },
  { title: 'LDPE Dropper Bottle', caption: 'Accurate liquid dispensing', category: 'products', image: { url: '/product5.jpeg' }, order: 4, isActive: true },
  { title: 'HDPE Jerry Can 20L', caption: 'Industrial grade bulk container', category: 'products', image: { url: '/product6.jpeg' }, order: 5, isActive: true },
  { title: 'HDPE Spray Bottle', caption: 'Multi-purpose spray application', category: 'products', image: { url: '/product7.jpeg' }, order: 6, isActive: true },
  { title: 'LDPE Wash Bottle', caption: 'Laboratory precision rinsing', category: 'products', image: { url: '/product8.jpeg' }, order: 7, isActive: true }
];

const contactData = {
  company: 'Adishri Enterprises',
  tagline: 'Premium HDPE & LDPE Bottles & Jerry Can Manufacturer',
  address: {
    street: 'Plot No B 33/2, Shendra MIDC',
    city: 'Chh. Sambhajinagar',
    state: 'Maharashtra',
    pincode: '431007',
    full: 'Plot No B 33/2, Shendra MIDC, Shendra, Chh. Sambhajinagar, Maharashtra - 431007'
  },
  phone: {
    primary: '+91 98765 43210',
    secondary: '+91 98765 43211'
  },
  email: {
    primary: 'info@adishrienterprises.com',
    secondary: 'sales@adishrienterprises.com'
  },
  workingHours: 'Mon - Sat: 9:00 AM - 6:00 PM',
  whatsapp: '919876543210',
  socialLinks: {
    facebook: '',
    twitter: '',
    linkedin: '',
    instagram: ''
  },
  mapLink: 'https://maps.google.com/?q=19.9078,75.3436',
  mapEmbed: 'https://maps.google.com/maps?q=19.9078,75.3436&z=15&output=embed'
};

const settingsData = {
  siteName: 'Adishri Enterprises',
  tagline: 'Premium HDPE & LDPE Bottles & Jerry Can Manufacturer',
  logo: { url: '/adishri_logo3.png' },
  contactEmail: 'info@adishrienterprises.com',
  contactPhone: '+91 98765 43210',
  credentials: [
    { name: 'ISO 9001:2015', icon: 'Shield' },
    { name: 'FDA Approved', icon: 'FlaskConical' },
    { name: 'BIS Certified', icon: 'Award' }
  ],
  copyrightText: '© 2024 Adishri Enterprises. All rights reserved.',
  isActive: true
};

const coreValuesData = [
  { title: 'Quality First', description: 'Rigorous quality control at every stage ensures our products meet the highest industry standards.', icon: 'Shield', color: 'from-blue-500 to-blue-600', order: 0, isActive: true },
  { title: 'Customer Focus', description: 'We prioritize customer satisfaction through responsive service and customized solutions.', icon: 'Users', color: 'from-green-500 to-green-600', order: 1, isActive: true },
  { title: 'Innovation', description: 'Continuous improvement and adoption of latest technology to deliver superior products.', icon: 'Zap', color: 'from-purple-500 to-purple-600', order: 2, isActive: true },
  { title: 'Integrity', description: 'Honest business practices and transparent communication build lasting relationships.', icon: 'Heart', color: 'from-red-500 to-red-600', order: 3, isActive: true }
];

const standardsData = [
  { title: 'ISO 9001:2015', description: 'Certified quality management system ensuring consistent product excellence', icon: 'Shield', order: 0, isActive: true },
  { title: 'FDA Approved', description: 'Materials approved for food and pharmaceutical contact applications', icon: 'FlaskConical', order: 1, isActive: true },
  { title: 'BIS Certified', description: 'Compliance with Bureau of Indian Standards for plastic containers', icon: 'Award', order: 2, isActive: true },
  { title: 'Recyclable Materials', description: '100% recyclable HDPE and LDPE for sustainable packaging solutions', icon: 'Recycle', order: 3, isActive: true }
];

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
    { name: 'Contact', href: '/contact', order: 3 }
  ],
  footerResources: [
    { name: 'Privacy Policy', href: '/privacy', order: 0 },
    { name: 'Terms of Service', href: '/terms', order: 1 }
  ],
  socialLinks: {},
  whatsapp: { number: '919876543210', message: 'Hello! I would like to inquire about your products.' }
};

const seedCloud = async () => {
  try {
    console.log('🌱 Starting cloud database seeding...\n');
    console.log('🔗 Connecting to:', CLOUD_MONGODB_URI.replace(/:[^:@]+@/, ':****@'));
    
    await mongoose.connect(CLOUD_MONGODB_URI);
    console.log('✅ Cloud MongoDB Connected\n');

    console.log('🗑️  Clearing existing data...');
    await Promise.all([
      Hero.deleteMany(),
      About.deleteMany(),
      Vision.deleteMany(),
      Product.deleteMany(),
      Gallery.deleteMany(),
      Contact.deleteMany(),
      Settings.deleteMany(),
      CoreValue.deleteMany(),
      Standard.deleteMany(),
      Navigation.deleteMany()
    ]);
    console.log('✅ All collections cleared\n');

    console.log('📝 Seeding data...\n');

    await Settings.create(settingsData);
    console.log('✅ Settings seeded');

    await Navigation.create(navigationData);
    console.log('✅ Navigation seeded');

    await Hero.create(heroData);
    console.log('✅ Hero seeded');

    await About.create(aboutData);
    console.log('✅ About seeded');

    await Vision.create(visionData);
    console.log('✅ Vision seeded');

    await CoreValue.insertMany(coreValuesData);
    console.log(`✅ ${coreValuesData.length} Core Values seeded`);

    await Standard.insertMany(standardsData);
    console.log(`✅ ${standardsData.length} Standards seeded`);

    await Product.insertMany(productsData);
    console.log(`✅ ${productsData.length} Products seeded`);

    await Gallery.insertMany(galleryData);
    console.log(`✅ ${galleryData.length} Gallery images seeded`);

    await Contact.create(contactData);
    console.log('✅ Contact seeded');

    const adminExists = await User.findOne({ email: 'admin@adishrienterprises.com' });
    if (!adminExists) {
      await User.create({
        username: 'admin',
        email: 'admin@adishrienterprises.com',
        password: 'Admin@123',
        role: 'admin'
      });
      console.log('✅ Admin user created');
    } else {
      console.log('ℹ️  Admin user already exists');
    }

    console.log('\n🎉 Cloud database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - Settings: 1`);
    console.log(`   - Navigation: 1`);
    console.log(`   - Hero: 1`);
    console.log(`   - About: 1`);
    console.log(`   - Vision: 1`);
    console.log(`   - Core Values: ${coreValuesData.length}`);
    console.log(`   - Standards: ${standardsData.length}`);
    console.log(`   - Products: ${productsData.length}`);
    console.log(`   - Gallery: ${galleryData.length}`);
    console.log(`   - Contact: 1`);
    console.log(`   - Admin User: 1\n`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding cloud database:', error);
    process.exit(1);
  }
};

seedCloud();
