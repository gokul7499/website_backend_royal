const express = require('express');
const Contact = require('../models/contact');
const retry = require('async-retry');
const router = express.Router();

// POST route to submit contact form
router.post('/contact', async (req, res) => {
  const { customerName, contactNumber, emailAddress, city, dist, pincode } = req.body;

  try {
    // Validate required fields
    if (!customerName || !contactNumber || !emailAddress || !city || !dist || !pincode) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Create a new contact entry
    const contact = new Contact({
      customerName,
      contactNumber,
      emailAddress,
      city,
      dist,
      pincode,
    });

    // Retry logic to save the contact
    await retry(async () => {
      await contact.save();  // Save to database with retry logic
    }, {
      retries: 3,
      minTimeout: 1000,
      onRetry: (error, attempt) => {
        console.log(`Attempt ${attempt} failed. Retrying...`);
      },
    });

    res.status(201).json({
      success: true,
      message: 'Contact data saved successfully!',
      data: contact,
    });
  } catch (error) {
    console.error('Error saving contact data:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while saving the contact data',
      error: error.message,
    });
  }
});

// GET route to fetch contact form submissions
router.get('/contact-forms', async (req, res) => {
  try {
    const contactForms = await Contact.find();  // Fetch all contact forms
    res.status(200).json(contactForms);  // Send the contact forms as response
  } catch (error) {
    console.error('Error fetching contact forms:', error);
    res.status(500).json({ success: false, message: 'Error fetching contact forms', error: error.message });
  }
});

module.exports = router;
