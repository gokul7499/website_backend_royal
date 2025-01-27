const express = require('express');
const router = express.Router();
const Subscriber = require('../models/email'); // Import the email model

// Subscription Route
router.post('/subscribe', async (req, res) => {
  const { email } = req.body; // Extract email from request body

  // Validate email presence
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    // Check if the email is already subscribed
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).json({ message: 'Email is already subscribed' });
    }

    // Save the new email to the database
    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    res.status(200).json({ message: 'Subscribed successfully!' });
  } catch (error) {
    console.error('Error subscribing email:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
