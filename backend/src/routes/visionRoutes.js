const express = require('express');
const router = express.Router();
const { getVision, updateVision } = require('../controllers/visionController');
const { protect } = require('../middleware/auth');
const { visionValidation } = require('../middleware/validate');

router.get('/', getVision);
router.put('/', protect, updateVision);

module.exports = router;
