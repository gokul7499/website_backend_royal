const ContactForm = require('../models/contactFormModel');

// Controller to fetch contact form data
const getContactForms = async (req, res) => {
  try {
    const contactForms = await ContactForm.find().sort({ createdAt: -1 }); // Sorting by latest submission
    res.json(contactForms);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contact forms', error });
  }
};

module.exports = { getContactForms };
