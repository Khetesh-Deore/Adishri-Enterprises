require('dotenv').config();
const mongoose = require('mongoose');
const { User, Contact, Settings } = require('../models');

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists:', existingAdmin.email);
    } else {
      // Create admin user
      const admin = await User.create({
        username: process.env.ADMIN_USERNAME || 'admin',
        email: process.env.ADMIN_EMAIL || 'admin@adishrienterprises.com',
        password: process.env.ADMIN_PASSWORD || 'Admin@123',
        role: 'admin'
      });
      console.log('✅ Admin user created:', admin.email);
    }

    // Seed default contact info
    const existingContact = await Contact.findOne();
    if (!existingContact) {
      await Contact.create({
        company: 'Adishri Enterprises',
        tagline: 'Premium HDPE & LDPE Bottles & Jerry Can Manufacturer',
        address: {
          street: 'Plot No B 33/2, Shendra MIDC',
          city: 'Chhatrapati Sambhajinagar',
          state: 'Maharashtra',
          pincode: '431007',
          full: 'Plot No B 33/2, Shendra MIDC, Shendra, Chh. Sambhajinagar, Maharashtra - 431007'
        },
        phone: { primary: '+91 98765 43210' },
        whatsapp: '919876543210',
        email: { primary: 'info@adishrienterprises.com' },
        workingHours: 'Mon - Sat: 9:00 AM - 6:00 PM',
        socialLinks: {
          facebook: 'https://facebook.com',
          instagram: 'https://instagram.com',
          linkedin: 'https://linkedin.com'
        }
      });
      console.log('✅ Default contact info created');
    }

    // Seed default settings
    const existingSettings = await Settings.findOne();
    if (!existingSettings) {
      await Settings.create({
        siteName: 'Adishri Enterprises',
        tagline: 'Premium HDPE & LDPE Bottles & Jerry Can Manufacturer',
        footerText: 'Quality packaging solutions since 2008',
        copyrightText: '© 2024 Adishri Enterprises. All rights reserved.',
        credentials: [
          { name: 'ISO 9001:2015', description: 'Quality Management' },
          { name: 'FDA Approved', description: 'Food Grade Materials' },
          { name: 'BIS Certified', description: 'Bureau of Indian Standards' },
          { name: 'GMP Compliant', description: 'Good Manufacturing Practice' }
        ]
      });
      console.log('✅ Default settings created');
    }

    console.log('\n🎉 Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error.message);
    process.exit(1);
  }
};

seedAdmin();
