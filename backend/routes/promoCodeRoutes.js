const express = require('express');
const router = express.Router();
const {
    validatePromoCode,
    getAllPromoCodes,
    createPromoCode,
    updatePromoCode,
    deletePromoCode
} = require('../controllers/promoCodeController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public route - validate promo code
router.post('/validate', validatePromoCode);

// Admin routes - manage promo codes
router.route('/')
    .get(protect, admin, getAllPromoCodes)
    .post(protect, admin, createPromoCode);

router.route('/:id')
    .put(protect, admin, updatePromoCode)
    .delete(protect, admin, deletePromoCode);

module.exports = router;
