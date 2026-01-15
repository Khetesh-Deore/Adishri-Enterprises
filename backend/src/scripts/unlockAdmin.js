require('dotenv').config();
const mongoose = require('mongoose');
const { User } = require('../models');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

const unlockAdmin = async () => {
  try {
    await connectDB();

    const admin = await User.findOne({ email: 'admin@adishrienterprises.com' });
    
    if (!admin) {
      console.log('❌ Admin user not found');
      process.exit(1);
    }

    // Reset login attempts and unlock
    admin.loginAttempts = 0;
    admin.lockUntil = undefined;
    await admin.save();

    console.log('✅ Admin account unlocked successfully!');
    console.log('\nYou can now login with:');
    console.log('  Email: admin@adishrienterprises.com');
    console.log('  Password: Admin@123\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error unlocking admin:', error);
    process.exit(1);
  }
};

unlockAdmin();
