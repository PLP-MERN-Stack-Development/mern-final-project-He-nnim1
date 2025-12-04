const asyncHandler = require('../middleware/asyncHandler');
const Product = require('../models/Product');
const Farmer = require('../models/farmer');

// Create product (only farmers)
exports.createProduct = asyncHandler(async (req, res) => {
  // req.body should include name, category, price, quantity, unit, description, image
  const farmer = await Farmer.findOne({ user: req.user._id });
  if (!farmer) {
    res.status(400);
    throw new Error('No farmer profile found for this user');
  }

  const { name, category, description, price, quantity, unit } = req.body;
  const imageUrl = req.file ? req.file.path : null
  const product = await Product.create({
    farmer: farmer._id,
    name,
    category,
    description,
    price,
    quantity,
    unit,
    imageUrl
  });

  res.status(201).json(product);
});

// Get all products (public)
exports.getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ available: true }).populate({
    path: 'farmer',
    populate: { path: 'user', select: 'name email' }
  }).sort({ dateListed: -1 });
  res.json(products);
});

// Get single product
exports.getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate({
    path: 'farmer',
    populate: { path: 'user', select: 'name email' }
  });
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  res.json(product);
});

// Update product (farmer who owns it)
exports.updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  // check ownership
  const farmer = await Farmer.findOne({ user: req.user._id });
  if (!farmer || product.farmer.toString() !== farmer._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to update this product');
  }

  const { name, category, description, price, quantity, unit, image, available } = req.body;
  product.name = name || product.name;
  product.category = category || product.category;
  product.description = description || product.description;
  product.price = price ?? product.price;
  product.quantity = quantity ?? product.quantity;
  product.unit = unit || product.unit;
  product.image = image || product.image;
  if (typeof available === 'boolean') product.available = available;

  await product.save();
  res.json(product);
});

// Delete product
exports.deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  const farmer = await Farmer.findOne({ user: req.user._id });
  if (!farmer || product.farmer.toString() !== farmer._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to delete this product');
  }

  await product.remove();
  res.json({ message: 'Product removed' });
});
