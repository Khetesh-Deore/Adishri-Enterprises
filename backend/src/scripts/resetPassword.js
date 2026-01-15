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

const resetPassword = async () => {
  try {
    await connectDB();

    const email = process.argv[2] || 'admin@adishrienterprises.com';
    const newPassword = process.argv[3] || 'Admin@123';

    const user = await User.findOne({ email });
    
    if (!user) {
      console.log(`❌ User with email ${email} not found`);
      process.exit(1);
    }

    // Reset password and unlock account
    user.password = newPassword;
    user.loginAttempts = 0;
    user.lockUntil = undefined;
    await user.save();

    console.log('\n✅ Password reset successfully!');
    console.log('\nLogin credentials:');
    console.log(`  Email:    ${email}`);
    console.log(`  Password: ${newPassword}`);
    console.log('\n✅ Account unlocked');
    console.log('✅ Login attempts cleared\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error resetting password:', error);
    process.exit(1);
  }
};

resetPassword();
