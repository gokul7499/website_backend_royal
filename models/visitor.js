const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
    visitTime: { type: Date, default: Date.now },
    ipAddress: { type: String, required: true, unique: true }, // Ensure unique IP address
});

const Visitor = mongoose.model('Visitor', visitorSchema);
module.exports = Visitor;
