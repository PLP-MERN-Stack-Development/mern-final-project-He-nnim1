const mongoose = require('mongoose');

const farmerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  farmName: { type: String, required: true },
  farmLocation: { type: String, required: true },
  farmSize: { type: String }, // e.g., "5 acres"
  farmType: { type: String, enum: ['Fruits', 'Vegetables', 'Cereals', 'Animal Products'], default: 'Vegetables' },
  bio: { type: String },
  profileImageUrl: { type: String, required: false },
  rating: { type: Number, default: 0 },
  numberOfRatings: { type: Number, default: 0 }
});

module.exports = mongoose.model('Farmer', farmerSchema);
