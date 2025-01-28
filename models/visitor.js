const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  ipAddress: { type: String, required: true, unique: true },
}, { timestamps: true });

module.exports = mongoose.model('Visitor', visitorSchema);
