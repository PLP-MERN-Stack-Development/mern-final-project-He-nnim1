const asyncHandler = require('../middleware/asyncHandler');
const Buyer = require('../models/Buyer');

// Get buyer profile
exports.getMyProfile = asyncHandler(async (req, res) => {
  const buyer = await Buyer.findOne({ user: req.user._id }).populate('user', 'name email phone');
  if (!buyer) {
    res.status(404);
    throw new Error('Buyer profile not found');
  }
  res.json(buyer);
});

exports.updateProfile = asyncHandler(async (req, res) => {
  const buyer = await Buyer.findOne({ user: req.user._id });
  if (!buyer) {
    res.status(404);
    throw new Error('Buyer profile not found');
  }
  const { address, preferredProducts, profileImage } = req.body;
  buyer.address = address || buyer.address;
  if (preferredProducts) buyer.preferredProducts = preferredProducts;
  buyer.profileImageUrl = profileImageUrl || buyer.profileImageUrl;
  await buyer.save();
  res.json(buyer);
});
