const express = require('express');
const { getContactForms } = require('../controllers/contactFormController');

const router = express.Router();

// Route to get contact form data
router.get('/contact-forms', getContactForms);

module.exports = router;
