const mongoose = require('mongoose');
const Vision = require('../models/Vision');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const visionData = {
  title: 'Our Vision & Mission',
  subtitle: 'Building a Sustainable Future in Packaging',
  vision: {
    title: 'Vision',
    description: 'To become India\'s most trusted and preferred manufacturer of plastic packaging solutions, recognized globally for quality, innovation, and environmental responsibility. We envision a future where our products set industry standards and contribute to sustainable development.',
    icon: 'Eye',
    color: 'from-blue-500 to-blue-600'
  },
  mission: {
    title: 'Mission',
    description: 'To provide superior quality plastic packaging solutions that meet international standards while maintaining competitive pricing and exceptional customer service. We are committed to continuous innovation, sustainable practices, and building long-term partnerships with our clients.',
    icon: 'Target',
    color: 'from-green-500 to-green-600'
  },
  goals: [
    {
      title: 'Quality Excellence',
      description: 'Maintain ISO 9001:2015 standards and continuously improve product quality through advanced manufacturing processes and rigorous quality control.',
      icon: 'Award',
      order: 0
    },
    {
      title: 'Customer Satisfaction',
      description: 'Achieve 100% customer satisfaction through responsive service, customized solutions, and timely delivery of products.',
      icon: 'Users',
      order: 1
    },
    {
      title: 'Innovation & Technology',
      description: 'Invest in latest technology and R&D to develop innovative packaging solutions that meet evolving market needs.',
      icon: 'Lightbulb',
      order: 2
    },
    {
      title: 'Sustainability',
      description: 'Promote eco-friendly practices, use recyclable materials, and minimize environmental impact in all operations.',
      icon: 'Leaf',
      order: 3
    },
    {
      title: 'Market Expansion',
      description: 'Expand our presence across India and enter international markets while maintaining our commitment to quality.',
      icon: 'TrendingUp',
      order: 4
    },
    {
      title: 'Employee Development',
      description: 'Foster a culture of continuous learning and provide growth opportunities for our team members.',
      icon: 'GraduationCap',
      order: 5
    }
  ],
  values: [
    {
      title: 'Integrity',
      description: 'We conduct business with honesty, transparency, and ethical practices.',
      icon: 'Shield'
    },
    {
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, from manufacturing to customer service.',
      icon: 'Star'
    },
    {
      title: 'Innovation',
      description: 'We embrace change and continuously seek innovative solutions.',
      icon: 'Zap'
    },
    {
      title: 'Responsibility',
      description: 'We take responsibility for our actions and their impact on society and environment.',
      icon: 'Heart'
    }
  ],
  futureOutlook: {
    title: 'Future Outlook',
    description: 'Looking ahead, we are committed to expanding our product range, adopting cutting-edge technology, and strengthening our position as a leader in the plastic packaging industry. We aim to achieve carbon neutrality by 2030 and contribute to a circular economy through increased use of recycled materials.',
    image: { url: '/product1.jpeg' }
  },
  isActive: true
};

const seedVision = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected...');

    await Vision.deleteMany();
    console.log('Vision cleared');

    await Vision.create(visionData);
    console.log('Vision seeded successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding vision:', error);
    process.exit(1);
  }
};

seedVision();
