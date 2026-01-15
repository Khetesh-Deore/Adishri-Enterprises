const express = require('express');
const router = express.Router();
const { getContact, updateContact } = require('../controllers/contactController');
const { protect } = require('../middleware/auth');

router.get('/', getContact);
router.put('/', protect, updateContact);

module.exports = router;
