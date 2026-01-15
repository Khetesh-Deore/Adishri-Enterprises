const express = require('express');
const router = express.Router();
const { getHero, updateHero } = require('../controllers/heroController');
const { protect } = require('../middleware/auth');
const { upload } = require('../config/cloudinary');
const { heroValidation } = require('../middleware/validate');

router.get('/', getHero);
router.put('/', protect, upload.single('backgroundImage'), updateHero);

module.exports = router;
