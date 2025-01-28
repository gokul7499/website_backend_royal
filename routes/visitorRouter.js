const express = require('express');
const Visitor = require('../models/visitor');
const router = express.Router();

// Time limit for considering a new visit (24 hours)
const TIME_LIMIT = 24 * 60 * 60 * 1000;

// Save Visitor and Get Updated Visitor Count
router.get('/visitor', async (req, res) => {
    try {
        const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

        // Check if visitor exists within the last 24 hours
        const existingVisitor = await Visitor.findOne({
            ipAddress,
            visitTime: { $gt: new Date(Date.now() - TIME_LIMIT) }, // Check if visited in the last 24 hours
        });

        if (!existingVisitor) {
            // Add a new visitor if it doesn't exist in the last 24 hours
            const newVisitor = new Visitor({
                ipAddress,
                visitTime: new Date(),
            });
            await newVisitor.save();
        }

        // Get the total unique visitor count
        const visitorCount = await Visitor.countDocuments();
        res.status(200).json({ visitorCount });
    } catch (error) {
        console.error('Error handling visitor data:', error);
        res.status(500).json({ success: false, message: 'Error handling visitor data', error });
    }
});

// Fetch Visitor Count Only
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
