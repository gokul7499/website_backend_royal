const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
    emailAddress: { type: String, unique: true, required: true },
    subscribedAt: { type: Date, default: Date.now },
});

const Email = mongoose.model('Email', emailSchema);
module.exports = Email;
