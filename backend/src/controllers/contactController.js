const { Contact } = require('../models');
const { asyncHandler } = require('../middleware/errorHandler');

// @desc    Get contact info
// @route   GET /api/contact
// @access  Public
const getContact = asyncHandler(async (req, res) => {
  let contact = await Contact.findOne();

  // Return default if none exists
  if (!contact) {
    contact = {
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
      email: { primary: 'info@adishrienterprises.com' },
      workingHours: 'Mon - Sat: 9:00 AM - 6:00 PM'
    };
  }

  res.status(200).json({
    success: true,
    data: contact
  });
});

// @desc    Update contact info
// @route   PUT /api/contact
// @access  Private
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findOneAndUpdate(
    {},
    req.body,
    { new: true, upsert: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    message: 'Contact info updated successfully',
    data: contact
  });
});

module.exports = { getContact, updateContact };
