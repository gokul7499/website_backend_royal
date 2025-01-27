const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
    ipAddress: { type: String, required: true, unique: true }, // Unique IP address
    visitTime: { type: Date, default: Date.now }, // Last visit time
});

const Visitor = mongoose.model('Visitor', visitorSchema);
module.exports = Visitor;
