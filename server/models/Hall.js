const mongoose = require('mongoose');

const HallSchema = new mongoose.Schema({
  name: String,
  address: String,
  price: Number,
  images: [String], // You can store image URLs or file paths
  status: { type: String, default: 'available' },
  ownerId: String,   // This will be the Firebase UID of the hall owner
  category: { type: String, required: true }
});

module.exports = mongoose.model('Hall', HallSchema);