const express = require('express');
const Visitor = require('../models/visitor');
const router = express.Router();

// Save Visitor and Get Updated Visitor Count
router.get('/visitor', async (req, res) => {
    try {
        const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

        // Check if the visitor already exists
        const existingVisitor = await Visitor.findOne({ ipAddress });

        if (!existingVisitor) {
            const visitor = new Visitor({ ipAddress });
            await visitor.save();
        }

        // Get total unique visitor count
        const visitorCount = await Visitor.countDocuments();
        res.status(200).json({ visitorCount });
    } catch (error) {
        console.error('Error storing visitor data:', error);
        res.status(500).json({ success: false, message: 'Error storing visitor data', error });
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
