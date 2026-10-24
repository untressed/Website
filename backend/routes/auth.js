const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { authLimiter } = require('../middleware/securityMiddleware');
const { validateRegistration, validateLogin } = require('../middleware/validationMiddleware');

// Apply rate limiting to auth routes
router.post('/register', authLimiter, validateRegistration, registerUser);
router.post('/login', authLimiter, validateLogin, loginUser);
router.get('/me', protect, getMe);

module.exports = router;
