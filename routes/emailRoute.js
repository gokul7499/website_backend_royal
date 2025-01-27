const express = require('express');
const router = express.Router();
const Subscriber = require('../models/email'); // MongoDB model

router.post('/subscribe', async (req, res) => {
  const { email } = req.body; // Extract email from request body

  if (!email) {
    return res.status(400).json({ message: 'Email is required' }); // Validation
  }

  try {
    // Check if email is already in the database
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).json({ message: 'Email is already subscribed' });
    }

    // Save email to database
    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    res.status(200).json({ message: 'Subscribed successfully!' });
  } catch (error) {
    console.error('Error subscribing email:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
