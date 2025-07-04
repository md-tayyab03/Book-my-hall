const express = require('express');
const Hall = require('../models/Hall');
const firebaseAuth = require('../middleware/firebaseAuth');
const router = express.Router();

// Add a new hall (owner only)
router.post('/', firebaseAuth, async (req, res) => {
  const { name, address, price, images, category } = req.body;
  const hall = new Hall({ name, address, price, images, ownerId: req.user.uid, category });
  await hall.save();
  res.status(201).json(hall);
});

// Get all halls (for explore/featured)
router.get('/', async (req, res) => {
  const halls = await Hall.find();
  res.json(halls);
});

// Update a hall
router.put('/:id', firebaseAuth, async (req, res) => {
  try {
    const updatedHall = await Hall.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedHall);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const hall = await Hall.findByIdAndDelete(req.params.id);
    if (!hall) return res.status(404).json({ error: 'Hall not found' });
    res.json({ message: 'Hall deleted', hall });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;