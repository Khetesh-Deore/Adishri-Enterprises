const { validationResult, body } = require('express-validator');

// Validation result handler
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  next();
};

// Login validation rules
const loginValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email'),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  handleValidation
];

// Product validation rules
const productValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Product name is required')
    .isLength({ max: 200 }).withMessage('Name cannot exceed 200 characters'),
  body('description')
    .trim()
    .notEmpty().withMessage('Description is required'),
  body('category')
    .notEmpty().withMessage('Category is required')
    .isIn(['hdpe-bottles', 'ldpe-bottles', 'jerry-cans', 'caps-closures', 'custom-moulded'])
    .withMessage('Invalid category'),
  handleValidation
];

// Hero validation rules
const heroValidation = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 200 }).withMessage('Title cannot exceed 200 characters'),
  handleValidation
];

// About validation rules
const aboutValidation = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required'),
  body('description')
    .trim()
    .notEmpty().withMessage('Description is required'),
  handleValidation
];

// User validation rules
const userValidation = [
  body('username')
    .trim()
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email'),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage('Password must contain uppercase, lowercase, and number'),
  body('role')
    .optional()
    .isIn(['admin', 'editor']).withMessage('Role must be admin or editor'),
  handleValidation
];

// Vision validation rules
const visionValidation = [
  body('cards')
    .isArray({ min: 1 }).withMessage('At least one vision card is required'),
  body('cards.*.title')
    .trim()
    .notEmpty().withMessage('Card title is required'),
  body('cards.*.description')
    .trim()
    .notEmpty().withMessage('Card description is required'),
  handleValidation
];

module.exports = {
  handleValidation,
  loginValidation,
  productValidation,
  heroValidation,
  aboutValidation,
  userValidation,
  visionValidation
};
