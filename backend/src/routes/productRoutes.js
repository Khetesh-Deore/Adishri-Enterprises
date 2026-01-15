const express = require('express');
const router = express.Router();
const { 
  getProducts, 
  getProduct, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} = require('../controllers/productController');
const { protect } = require('../middleware/auth');
const { upload } = require('../config/cloudinary');
const { productValidation } = require('../middleware/validate');

router.route('/')
  .get(getProducts)
  .post(protect, upload.single('image'), createProduct);

router.route('/:id')
  .get(getProduct)
  .put(protect, upload.single('image'), updateProduct)
  .delete(protect, deleteProduct);

module.exports = router;
