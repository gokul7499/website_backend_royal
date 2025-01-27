const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true }, // Ensure uniqueness
  subscribedAt: { type: Date, default: Date.now }, // Track subscription time
});

const Email = mongoose.model('Subscriber', emailSchema); // Collection name will be 'subscribers'
module.exports = Email;
