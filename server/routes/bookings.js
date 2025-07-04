const express = require('express');
const Booking = require('../models/Booking');
const Hall = require('../models/Hall');
const router = express.Router();
const firebaseAuth = require('../middleware/firebaseAuth');

// Create a new booking
router.post('/', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    await Hall.findByIdAndUpdate(req.body.hallId, { status: 'booked' });
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all bookings for the current user
router.get('/', firebaseAuth, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.uid });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
