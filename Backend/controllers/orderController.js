const asyncHandler = require('../middleware/asyncHandler');
const Order = require('../models/Order');
const Buyer = require('../models/Buyer');
const Farmer = require('../models/farmer');
const Product = require('../models/Product');

// Create an order (buyer)
exports.createOrder = asyncHandler(async (req, res) => {
  // req.body: { items: [{productId, quantity}], farmerId? (we can derive from product), totalPrice }
  const buyer = await Buyer.findOne({ user: req.user._id });
  if (!buyer) {
    res.status(400);
    throw new Error('Buyer profile not found');
  }

  const { items, totalPrice } = req.body;
  if (!items || items.length === 0) {
    res.status(400);
    throw new Error('No order items');
  }

  // Build items array and ensure product exists
  const orderItems = [];
  let farmerId = null;
  for (const it of items) {
    const product = await Product.findById(it.productId);
    if (!product) {
      res.status(404);
      throw new Error(`Product not found: ${it.productId}`);
    }
    // optionally ensure all items are from same farmer (marketplace could allow multi-farmer orders; this example assumes one farmer)
    if (!farmerId) farmerId = product.farmer;
    // push
    orderItems.push({ product: product._id, quantity: it.quantity, price: product.price });
  }

  const farmer = await Farmer.findById(farmerId);
  if (!farmer) {
    res.status(404);
    throw new Error('Farmer not found for order');
  }

  const order = await Order.create({
    buyer: buyer._id,
    farmer: farmer._id,
    items: orderItems,
    totalPrice,
    status: 'pending',
    paymentStatus: 'unpaid'
  });

  // Optionally add order id to buyer.pastOrders
  buyer.pastOrders.push(order._id);
  await buyer.save();

  res.status(201).json(order);
});

// Get orders for current user (buyer)
exports.getMyOrders = asyncHandler(async (req, res) => {
  // if user is buyer -> return buyer orders, if farmer -> return farmer orders
  const user = req.user;
  if (user.role === 'buyer') {
    const buyer = await Buyer.findOne({ user: user._id });
    const orders = await Order.find({ buyer: buyer._id }).populate('items.product').sort({ createdAt: -1 });
    return res.json(orders);
  }
  if (user.role === 'farmer') {
    const farmer = await Farmer.findOne({ user: user._id });
    const orders = await Order.find({ farmer: farmer._id }).populate('items.product').sort({ createdAt: -1 });
    return res.json(orders);
  }
  res.json([]);
});
