const express = require('express');
const Visitor = require('../models/visitor');
const router = express.Router();

// GET visitor count and store visitor data

router.get('/visitor', async (req, res) => {

    res.send("Heelo worlds")
    try {
        // Check visitor is aleready come
        const existingVisitor = await Visitor.findOne({ ipAddress: req.ip });

        if (!existingVisitor) {
            // Create a new visitor document only if it doesn't exist
            const visitor = new Visitor({
                ipAddress: req.ip, // Track the IP address of the visitor
            });

            // Save visitor data 
            await visitor.save();
        }

        // Get the total number of unique visitors
        const visitorCount = await Visitor.countDocuments();

        res.status(200).json({  visitorCount });
    } catch (error) {
        console.error('Error storing visitor data:', error);
        res.status(500).json({ suceess:false , message: 'Error storing visitor data', error });
    }
});

// this api show visitor count
router.post('/visitor/count', async (req, res) => {
    try {
        // Get the total number of unique visitors
        const visitorCount = await Visitor.countDocuments();

        res.status(200).json({ visitorCount }); 
    } catch (error) {
        console.error('Error fetching visitor count:', error);
        res.status(500).json({ message: 'Error fetching visitor count', error });
    }
});

module.exports = router;
