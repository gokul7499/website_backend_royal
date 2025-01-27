const express = require('express');
const Visitor = require('../models/visitor'); // Mongoose Visitor Model
const router = express.Router();

// Increment visitor count on every new visit
router.post('/visitor', async (req, res) => {
  try {
    const ip = req.ip; // Get the visitor's IP address
    const existingVisitor = await Visitor.findOne({ ipAddress: ip });

    if (!existingVisitor) {
      const newVisitor = new Visitor({ ipAddress: ip });
      await newVisitor.save();
    }

    const visitorCount = await Visitor.countDocuments();
    res.status(200).json({ visitorCount });
  } catch (error) {
    console.error('Error incrementing visitor count:', error);
    res.status(500).json({ message: 'Error incrementing visitor count', error });
  }
});

// Get the current visitor count
router.get('/visitor/count', async (req, res) => {
  try {
    const visitorCount = await Visitor.countDocuments();
    res.status(200).json({ visitorCount });
  } catch (error) {
    console.error('Error fetching visitor count:', error);
    res.status(500).json({ message: 'Error fetching visitor count', error });
  }
});

module.exports = router;
