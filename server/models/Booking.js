const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  hallId: { type: String, required: true },
  userId: { type: String, required: true },
  guestFirstName: { type: String, required: true },
  guestLastName: { type: String, required: true },
  guestEmail: { type: String, required: true },
  guestMobile: { type: String, required: true },
  guestsCount: { type: Number, required: true },
  checkInDate: { type: String, required: true },
  checkInTime: { type: String, required: true },
  status: { type: String, default: 'confirmed' }
});

module.exports = mongoose.model('Booking', BookingSchema);