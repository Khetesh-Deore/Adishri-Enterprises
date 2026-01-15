const mongoose = require('mongoose');

const visionCardSchema = new mongoose.Schema({
  icon: {
    type: String,
    required: true,
    enum: ['Target', 'Rocket', 'Globe', 'TrendingUp', 'Lightbulb', 'Award', 'Users', 'Shield'],
    default: 'Target'
  },
  title: {
    type: String,
    required: [true, 'Card title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Card description is required'],
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  }
});

const visionSchema = new mongoose.Schema({
  subtitle: {
    type: String,
    default: 'Our Vision',
    trim: true
  },
  title: {
    type: String,
    default: 'Shaping the Future of',
    trim: true
  },
  highlight: {
    type: String,
    default: 'Packaging',
    trim: true
  },
  description: {
    type: String,
    default: 'Driven by innovation and commitment to excellence, we\'re building tomorrow\'s packaging solutions today.',
    trim: true
  },
  cards: {
    type: [visionCardSchema],
    validate: {
      validator: function(v) {
        return v.length >= 1 && v.length <= 8;
      },
      message: 'Vision must have between 1 and 8 cards'
    },
    default: [
      {
        icon: 'Target',
        title: 'Our Vision',
        description: 'To become India\'s most trusted manufacturer of premium plastic packaging solutions.'
      },
      {
        icon: 'Rocket',
        title: 'Future Goals',
        description: 'Expand our manufacturing capacity and achieve carbon-neutral operations by 2028.'
      },
      {
        icon: 'Globe',
        title: 'Industry Leadership',
        description: 'Lead the plastic packaging industry through continuous innovation and sustainable practices.'
      },
      {
        icon: 'TrendingUp',
        title: 'Growth Strategy',
        description: 'Strategic investments in advanced blow molding technology and skilled workforce development.'
      }
    ]
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Vision', visionSchema);
