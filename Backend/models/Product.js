const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'Farmer', required: true },
  name: { type: String, required: true, trim: true },
  category: { type: String, enum: ['Fruits', 'Vegetables', 'Cereals', 'Animal Products', 'others'], default: 'others' },
  description: { type: String },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, default: 'kg' },
  imageUrl: { type: String, required: true },
  available: { type: Boolean, default: true },
  dateListed: { type: Date, default: Date.now }
},
  { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
