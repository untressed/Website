const mongoose = require('mongoose');

const promoCodeSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true
    },
    discountPercentage: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
        enum: [10, 15, 20, 25, 30, 35, 40, 45, 50] // Only allow these percentages
    },
    isActive: {
        type: Boolean,
        default: true
    },
    expiryDate: {
        type: Date,
        default: null // null means no expiry
    },
    usageLimit: {
        type: Number,
        default: null // null means unlimited usage
    },
    usedCount: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

// Method to check if promo code is valid
promoCodeSchema.methods.isValid = function () {
    // Check if active
    if (!this.isActive) {
        return { valid: false, message: 'This promo code is no longer active' };
    }

    // Check if expired
    if (this.expiryDate && new Date() > this.expiryDate) {
        return { valid: false, message: 'This promo code has expired' };
    }

    // Check usage limit
    if (this.usageLimit !== null && this.usedCount >= this.usageLimit) {
        return { valid: false, message: 'This promo code has reached its usage limit' };
    }

    return { valid: true, discountPercentage: this.discountPercentage };
};

module.exports = mongoose.model('PromoCode', promoCodeSchema);
