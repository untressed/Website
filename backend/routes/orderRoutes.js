const express = require('express');
const router = express.Router();
const {
    addOrderItems,
    getMyOrders,
    verifyPayment
} = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
const { orderLimiter } = require('../middleware/securityMiddleware');
const { validateOrder } = require('../middleware/validationMiddleware');

// Public route with rate limiting and validation
router.route('/').post(orderLimiter, validateOrder, addOrderItems);

// Verify payment
router.route('/verify').post(verifyPayment);

// Protected route - must come before /:id if you have that
router.route('/myorders').get(protect, getMyOrders);

module.exports = router;
