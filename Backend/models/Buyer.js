const mongoose = require('mongoose');

const buyerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  address: { type: String },
  preferredProducts: [{ type: String }],
  pastOrders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  profileImageUrl: { type: String, required: false },
});

module.exports = mongoose.model('Buyer', buyerSchema);
