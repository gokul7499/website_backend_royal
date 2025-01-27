const express = require('express');
const Email = require('../models/email');
const router = express.Router();

router.post('/subscribe', async (req, res) => {
    const { email } = req.body;

    try {
        // Check if the email is already subscribed
        const existingEmail = await Email.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ success: false, message: 'Email address is already subscribed' });
        }

        // Create a new email document
        const email = new Email({ email });

        // Save the email
        await email.save();

        res.status(201).json({ success: true, message: 'Email subscribed successfully', data: email });
    } catch (error) {
        console.error('Error storing email:', error);
        res.status(500).json({ success: false, message: 'Error storing email', error });
    }
});

module.exports = router;
