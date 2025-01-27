const express = require('express');
const Visitor = require('../models/visitor'); // Make sure you have a Visitor model
const router = express.Router();

// Track unique visitors and return the visitor count
router.get('/visitor', async (req, res) => {
    try {
        // Check if the visitor (based on IP) already exists
        const existingVisitor = await Visitor.findOne({ ipAddress: req.ip });

        if (!existingVisitor) {
            // If the visitor doesn't exist, create a new record for this IP
            const visitor = new Visitor({
                ipAddress: req.ip, // Track the IP address of the visitor
            });

            // Save visitor data to the database
            await visitor.save();
        }

        // Get the total number of unique visitors by counting unique documents in the Visitor collection
        const visitorCount = await Visitor.countDocuments();

        res.status(200).json({ visitorCount });
    } catch (error) {
        console.error('Error storing visitor data:', error);
        res.status(500).json({
            success: false,
            message: 'Error storing visitor data',
            error: error.message,
        });
    }
});

// This API will return the total number of unique visitors
router.get('/visitor/count', async (req, res) => {
    try {
        // Get the total number of unique visitors
        const visitorCount = await Visitor.countDocuments();

        res.status(200).json({ visitorCount });
    } catch (error) {
        console.error('Error fetching visitor count:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching visitor count',
            error: error.message,
        });
    }
});

module.exports = router;
