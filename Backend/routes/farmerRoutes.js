const express = require('express');
const router = express.Router();
const { getMyProfile, updateProfile, getFarmerById, getAllFarmers } = require('../controllers/farmerController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

// protected farmer routes
router.get('/me', protect, restrictTo('farmer'), getMyProfile);
router.put('/me', protect, restrictTo('farmer'), updateProfile);

// public
router.get("/", getAllFarmers);
router.get('/:id', getFarmerById);

module.exports = router;
