const express = require('express');
const Visitor = require('../models/visitor');
const router = express.Router();

// Store visitor data and return visitor count
router.get('/visitor', async (req, res) => {
    try {
        // Check if the visitor is already recorded by IP
        const existingVisitor = await Visitor.findOne({ ipAddress: req.ip });

        if (!existingVisitor) {
            // Create a new visitor document only if it doesn't exist
            const visitor = new Visitor({
                ipAddress: req.ip, // Track the IP address of the visitor
            });

            // Save visitor data to the database
            await visitor.save();
        }

        // Get the total number of unique visitors (count documents)
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

// This API shows the total number of visitors count (can be called on page load)
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
