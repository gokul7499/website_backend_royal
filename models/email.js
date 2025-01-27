const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true }, // Change field to match the route
  subscribedAt: { type: Date, default: Date.now },
});

const Email = mongoose.model('Email', emailSchema);
module.exports = Email;
