const mongoose = require('mongoose');

const VisitorSchema = new mongoose.Schema({
  ipAddress: { type: String, required: true, unique: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Visitor', VisitorSchema);
