const mongoose = require('mongoose');

const contactFormSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    contactNumber: { type: String, required: true },
    emailAddress: { type: String, required: true },
    city: { type: String, required: true },
    dist: { type: String, required: true },
    pincode: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const ContactForm = mongoose.model('ContactForm', contactFormSchema);

module.exports = ContactForm;
