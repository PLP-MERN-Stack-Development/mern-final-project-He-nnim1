const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Register (role in body: 'farmer' or 'buyer' or 'admin')
router.post('/register', register);

// Login
router.post('/login', login);

module.exports = router;
