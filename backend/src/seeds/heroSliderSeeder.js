const HeroSlider = require('../models/HeroSlider');

const heroSlides = [
  {
    title: 'Future of Packaging',
    subtitle: 'Innovation in Every Bottle',
    description: 'Leading manufacturer of premium HDPE & LDPE bottles for pharmaceutical, chemical, and industrial applications',
    image: {
      url: '/product8.jpeg',
      publicId: null
    },
    ctaText: 'Explore Products',
    ctaLink: '/products',
    secondaryText: 'Get Quote',
    secondaryLink: '/contact',
    badge: '🚀 Innovation Leader',
    order: 0,
    isActive: true
  },
  {
    title: 'Sustainable Manufacturing',
    subtitle: 'Eco-Friendly Solutions',
    description: 'Committed to sustainable practices with recyclable materials and energy-efficient production processes',
    image: {
      url: '/product1.jpeg',
      publicId: null
    },
    ctaText: 'Our Standards',
    ctaLink: '/vision',
    secondaryText: 'Learn More',
    secondaryLink: '/about',
    badge: '♻️ Eco-Friendly',
    order: 1,
    isActive: true
  },
  {
    title: 'Manufacturing Excellence',
    subtitle: '15+ Years of Trust',
    description: 'State-of-the-art facilities producing 10,000+ units daily with ISO certified quality standards',
    image: {
      url: '/product3.jpeg',
      publicId: null
    },
    ctaText: 'View Gallery',
    ctaLink: '/gallery',
    secondaryText: 'Contact Us',
    secondaryLink: '/contact',
    badge: '🏆 Quality Certified',
    order: 2,
    isActive: true
  }
];

async function seedHeroSlider() {
  try {
    // Clear existing slides
    await HeroSlider.deleteMany({});
    console.log('Cleared existing hero slides');
    
    // Insert new slides
    const slides = await HeroSlider.insertMany(heroSlides);
    console.log(`✅ Seeded ${slides.length} hero slides`);
    
    return slides;
  } catch (error) {
    console.error('❌ Error seeding hero slides:', error);
    throw error;
  }
}

module.exports = { seedHeroSlider };
