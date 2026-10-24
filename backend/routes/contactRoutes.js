const express = require('express');
const router = express.Router();
const { submitContact } = require('../controllers/contactController');
const { apiLimiter } = require('../middleware/securityMiddleware');
const { validateContact } = require('../middleware/validationMiddleware');

router.post('/', apiLimiter, validateContact, submitContact);

module.exports = router;
