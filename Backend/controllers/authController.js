const asyncHandler = require('../middleware/asyncHandler');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Farmer = require('../models/farmer');
const Buyer = require('../models/Buyer');

// Helper to generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
};

// Register shared endpoint that branches by role
exports.register = asyncHandler(async (req, res) => {
  const { name, email, password, phone, role, farmName, farmLocation, address } = req.body;

  const existing = await User.findOne({ email });
  if (existing) {
    res.status(400);
    throw new Error('User already exists with this email');
  }

  const user = await User.create({ name, email, password, phone, role });

  if (role === 'farmer') {
    // create farmer profile
    const farmer = await Farmer.create({
      user: user._id,
      farmName: farmName || `${name}'s Farm`,
      farmLocation: farmLocation || ''
    });
    res.status(201).json({
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      farmer
    });
    return;
  }

  if (role === 'buyer') {
    const buyer = await Buyer.create({
      user: user._id,
      address: address || ''
    });
    res.status(201).json({
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      buyer
    });
    return;
  }

  // admin or other role
  res.status(201).json({ user });
});

// Login
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error('Invalid credentials');
  }
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    res.status(401);
    throw new Error('Invalid credentials');
  }

  // Return token + basic user
  res.json({
    token: generateToken(user._id),
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
});
