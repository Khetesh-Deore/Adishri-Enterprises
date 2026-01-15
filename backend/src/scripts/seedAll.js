require('dotenv').config();
const mongoose = require('mongoose');
const { User, Hero, About, Contact, Settings, Product, Gallery, Vision } = require('../models');
const bcrypt = require('bcryptjs');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

const seedAll = async () => {
  try {
    await connectDB();

    console.log('🌱 Starting database seeding...\n');

    // 1. Seed Admin User
    await User.deleteMany({});
    await User.create({
      username: 'admin',
      email: 'admin@adishrienterprises.com',
      password: 'Admin@123',
      role: 'admin',
      isActive: true
    });
    console.log('✅ Admin user created');

    // 2. Seed Hero Section
    await Hero.deleteMany({});
    await Hero.create({
      title: 'Premium HDPE & LDPE Bottles',
      subtitle: 'Quality Packaging Solutions',
      description: 'Industry-leading manufacturer of high-quality plastic bottles for pharmaceuticals, chemicals, and industrial applications.',
      backgroundImage: '/hero-bg.jpg',
      ctaButtons: [
        { text: 'Explore Products', link: '/products', variant: 'primary' },
        { text: 'Contact Us', link: '/contact', variant: 'secondary' }
      ]
    });
    console.log('✅ Hero section seeded');

    // 3. Seed About Section
    await About.deleteMany({});
    await About.create({
      title: 'About Adishri Enterprises',
      subtitle: 'Excellence in Plastic Packaging',
      description: 'With over 15 years of experience, we are a leading manufacturer of HDPE & LDPE bottles and jerry cans in Chhatrapati Sambhajinagar, Maharashtra. Our state-of-the-art facility produces premium quality packaging solutions for pharmaceutical, chemical, and industrial sectors.',
      image: '/about-image.jpg',
      mission: {
        title: 'Our Mission',
        description: 'To provide superior quality plastic packaging solutions that meet international standards while maintaining environmental responsibility.'
      },
      vision: {
        title: 'Our Vision',
        description: 'To become India\'s most trusted manufacturer of premium plastic packaging solutions, setting benchmarks in quality, innovation, and sustainability.'
      },
      stats: [
        { label: 'Years Experience', value: '15+' },
        { label: 'Products Delivered', value: '10M+' },
        { label: 'Happy Clients', value: '500+' },
        { label: 'Quality Assurance', value: '100%' }
      ]
    });
    console.log('✅ About section seeded');

    // 4. Seed Vision Section
    await Vision.deleteMany({});
    await Vision.create({
      subtitle: 'Our Vision',
      title: 'Shaping the Future of',
      highlight: 'Packaging',
      description: 'Driven by innovation and commitment to excellence, we\'re building tomorrow\'s packaging solutions today.',
      cards: [
        {
          icon: 'Target',
          title: 'Our Vision',
          description: 'To become India\'s most trusted manufacturer of premium plastic packaging solutions, setting benchmarks in quality and innovation.'
        },
        {
          icon: 'Rocket',
          title: 'Future Goals',
          description: 'Expand our manufacturing capacity to serve pan-India markets and achieve carbon-neutral operations by 2028.'
        },
        {
          icon: 'Globe',
          title: 'Industry Leadership',
          description: 'Lead the plastic packaging industry through continuous innovation and sustainable practices that exceed expectations.'
        },
        {
          icon: 'TrendingUp',
          title: 'Growth Strategy',
          description: 'Strategic investments in advanced blow molding technology and skilled workforce development for excellence.'
        }
      ]
    });
    console.log('✅ Vision section seeded');

    // 5. Seed Products
    await Product.deleteMany({});
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
        description: "Designed with a narrow neck and flip-top cap for controlled dispensing of liquids.",
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
        description: "Wide mouth HDPE bottle suitable for pharmaceutical and chemical storage.",
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
    await Product.insertMany(products);
    console.log(`✅ Seeded ${products.length} products`);

    // 6. Seed Gallery
    await Gallery.deleteMany({});
    const galleryImages = [
      {
        image: { url: "/product1.jpeg" },
        title: "Wide Mouth HDPE Bottle",
        caption: "Pharmaceutical and chemical storage solution",
        category: "products",
        order: 1
      },
      {
        image: { url: "/product2.jpeg" },
        title: "Narrow Mouth HDPE Bottle",
        caption: "Precision pouring for controlled dispensing",
        category: "products",
        order: 2
      },
      {
        image: { url: "/product3.jpeg" },
        title: "Round Wide Mouth Bottles",
        caption: "Industrial grade chemical containers",
        category: "products",
        order: 3
      },
      {
        image: { url: "/product4.jpeg" },
        title: "LDPE Plastic Bottle",
        caption: "Flexible dispensing for household chemicals",
        category: "products",
        order: 4
      },
      {
        image: { url: "/product5.jpeg" },
        title: "Pharmaceutical HDPE Bottle",
        caption: "FDA approved healthcare packaging",
        category: "products",
        order: 5
      },
      {
        image: { url: "/product6.jpeg" },
        title: "LDPE Squeeze Bottle",
        caption: "Food grade flexible dispensing",
        category: "products",
        order: 6
      },
      {
        image: { url: "/product7.jpeg" },
        title: "Agro Chemical HDPE Bottle",
        caption: "UV stabilized agricultural packaging",
        category: "products",
        order: 7
      },
      {
        image: { url: "/product8.jpeg" },
        title: "Jerry Can",
        caption: "Heavy duty bulk storage solution",
        category: "products",
        order: 8
      }
    ];
    await Gallery.insertMany(galleryImages);
    console.log(`✅ Seeded ${galleryImages.length} gallery images`);

    // 7. Seed Contact Info
    await Contact.deleteMany({});
    await Contact.create({
      company: 'Adishri Enterprises',
      tagline: 'Premium HDPE & LDPE Bottles & Jerry Can Manufacturer',
      address: {
        full: 'Plot No B 33/2, Shendra MIDC, Shendra, Chh. Sambhajinagar, Maharashtra - 431007',
        city: 'Chhatrapati Sambhajinagar',
        state: 'Maharashtra',
        pincode: '431007',
        country: 'India'
      },
      phone: {
        primary: '+91 98765 43210',
        secondary: '+91 98765 43211',
        whatsapp: '+919876543210'
      },
      email: {
        primary: 'info@adishrienterprises.com',
        sales: 'sales@adishrienterprises.com',
        support: 'support@adishrienterprises.com'
      },
      workingHours: 'Mon - Sat: 9:00 AM - 6:00 PM',
      socialLinks: {
        facebook: 'https://facebook.com/adishrienterprises',
        twitter: 'https://twitter.com/adishrienterprises',
        linkedin: 'https://linkedin.com/company/adishrienterprises',
        instagram: 'https://instagram.com/adishrienterprises'
      },
      mapLink: 'https://maps.google.com/?q=Shendra+MIDC+Sambhajinagar'
    });
    console.log('✅ Contact info seeded');

    // 8. Seed Settings
    await Settings.deleteMany({});
    await Settings.create({
      siteName: 'Adishri Enterprises',
      tagline: 'Premium HDPE & LDPE Bottles & Jerry Can Manufacturer',
      logo: '/adishri_logo3.png',
      favicon: '/favicon.ico',
      footerText: '© 2024 Adishri Enterprises. All rights reserved.',
      copyrightText: 'Adishri Enterprises - Premium Plastic Packaging Solutions',
      credentials: [
        { name: 'ISO 9001:2015', description: 'Quality Management System' },
        { name: 'FDA Approved', description: 'Food & Drug Administration' },
        { name: 'BIS Certified', description: 'Bureau of Indian Standards' },
        { name: 'GMP Compliant', description: 'Good Manufacturing Practice' }
      ],
      seo: {
        metaTitle: 'Adishri Enterprises - HDPE & LDPE Bottles Manufacturer',
        metaDescription: 'Leading manufacturer of premium HDPE & LDPE bottles and jerry cans in Maharashtra. ISO certified, FDA approved packaging solutions.',
        metaKeywords: 'HDPE bottles, LDPE bottles, jerry cans, plastic packaging, pharmaceutical bottles, chemical containers'
      }
    });
    console.log('✅ Settings seeded');

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log('  - 1 Admin user');
    console.log('  - 1 Hero section');
    console.log('  - 1 About section');
    console.log('  - 1 Vision section');
    console.log(`  - ${products.length} Products`);
    console.log(`  - ${galleryImages.length} Gallery images`);
    console.log('  - 1 Contact info');
    console.log('  - 1 Settings');
    console.log('\n✅ You can now login with:');
    console.log('   Email: admin@adishrienterprises.com');
    console.log('   Password: Admin@123\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedAll();
