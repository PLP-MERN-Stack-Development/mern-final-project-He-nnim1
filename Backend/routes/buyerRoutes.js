const express = require('express');
const router = express.Router();
const { getMyProfile, updateProfile } = require('../controllers/buyerController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

router.get('/me', protect, restrictTo('buyer'), getMyProfile);
router.put('/me', protect, restrictTo('buyer'), updateProfile);

module.exports = router;
