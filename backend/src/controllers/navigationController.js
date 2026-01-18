const Navigation = require('../models/Navigation');
const { asyncHandler } = require('../middleware/errorHandler');

// @desc    Get navigation data
// @route   GET /api/navigation
// @access  Public
exports.getNavigation = asyncHandler(async (req, res) => {
  let navigation = await Navigation.findOne();
  
  // If no navigation exists, create default
  if (!navigation) {
    navigation = await Navigation.create({
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
        { name: 'Terms of Service', href: '/terms', order: 1 },
        { name: 'FAQ', href: '/faq', order: 2 }
      ],
      socialLinks: {
        facebook: '',
        twitter: '',
        linkedin: '',
        instagram: ''
      },
      whatsapp: {
        number: '919876543210',
        message: 'Hello! I would like to inquire about your products.'
      }
    });
  }
  
  res.status(200).json({
    success: true,
    data: navigation
  });
});

// @desc    Update navigation data
// @route   PUT /api/navigation
// @access  Private/Admin
exports.updateNavigation = asyncHandler(async (req, res) => {
  let navigation = await Navigation.findOne();
  
  if (!navigation) {
    navigation = await Navigation.create(req.body);
  } else {
    navigation = await Navigation.findByIdAndUpdate(
      navigation._id,
      req.body,
      { new: true, runValidators: true }
    );
  }
  
  res.status(200).json({
    success: true,
    data: navigation
  });
});
