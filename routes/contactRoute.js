const express = require('express');
const Contact = require('../models/contact');
const router = express.Router();

router.post('/contact', async (req, res) => {
    const {
        customerName,
        contactNumber,
        emailAddress,
        city,
        dist,
        pincode,
    } = req.body;

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

        // Save to database
        await contact.save();

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

module.exports = router;
