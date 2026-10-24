const PromoCode = require('../models/PromoCode');

// @desc    Validate promo code
// @route   POST /api/promo/validate
// @access  Public
const validatePromoCode = async (req, res) => {
    try {
        const { code } = req.body;

        if (!code) {
            return res.status(400).json({
                success: false,
                message: 'Promo code is required'
            });
        }

        // Find promo code (case-insensitive)
        const promoCode = await PromoCode.findOne({
            code: code.toUpperCase()
        });

        if (!promoCode) {
            return res.status(404).json({
                success: false,
                message: 'Invalid promo code'
            });
        }

        // Check if valid using model method
        const validation = promoCode.isValid();

        if (!validation.valid) {
            return res.status(400).json({
                success: false,
                message: validation.message
            });
        }

        console.log(`✅ Promo code validated: ${code} - ${validation.discountPercentage}% discount`);

        res.json({
            success: true,
            code: promoCode.code,
            discountPercentage: validation.discountPercentage,
            description: promoCode.description
        });

    } catch (error) {
        console.error('❌ Promo code validation error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while validating promo code'
        });
    }
};

// @desc    Get all promo codes
// @route   GET /api/promo
// @access  Private/Admin
const getAllPromoCodes = async (req, res) => {
    try {
        const promoCodes = await PromoCode.find({}).sort({ createdAt: -1 });

        res.json({
            success: true,
            count: promoCodes.length,
            promoCodes
        });
    } catch (error) {
        console.error('❌ Error fetching promo codes:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// @desc    Create new promo code
// @route   POST /api/promo
// @access  Private/Admin
const createPromoCode = async (req, res) => {
    try {
        const { code, discountPercentage, description, expiryDate, usageLimit } = req.body;

        // Validate required fields
        if (!code || !discountPercentage) {
            return res.status(400).json({
                success: false,
                message: 'Code and discount percentage are required'
            });
        }

        // Check if code already exists
        const existingCode = await PromoCode.findOne({
            code: code.toUpperCase()
        });

        if (existingCode) {
            return res.status(400).json({
                success: false,
                message: 'Promo code already exists'
            });
        }

        // Create promo code
        const promoCode = await PromoCode.create({
            code: code.toUpperCase(),
            discountPercentage,
            description: description || '',
            expiryDate: expiryDate || null,
            usageLimit: usageLimit || null
        });

        console.log(`✅ Promo code created: ${promoCode.code} - ${promoCode.discountPercentage}%`);

        res.status(201).json({
            success: true,
            promoCode
        });

    } catch (error) {
        console.error('❌ Error creating promo code:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};

// @desc    Update promo code
// @route   PUT /api/promo/:id
// @access  Private/Admin
const updatePromoCode = async (req, res) => {
    try {
        const promoCode = await PromoCode.findById(req.params.id);

        if (!promoCode) {
            return res.status(404).json({
                success: false,
                message: 'Promo code not found'
            });
        }

        // Update fields
        const { discountPercentage, description, expiryDate, usageLimit, isActive } = req.body;

        if (discountPercentage !== undefined) promoCode.discountPercentage = discountPercentage;
        if (description !== undefined) promoCode.description = description;
        if (expiryDate !== undefined) promoCode.expiryDate = expiryDate;
        if (usageLimit !== undefined) promoCode.usageLimit = usageLimit;
        if (isActive !== undefined) promoCode.isActive = isActive;

        const updatedPromoCode = await promoCode.save();

        console.log(`✅ Promo code updated: ${updatedPromoCode.code}`);

        res.json({
            success: true,
            promoCode: updatedPromoCode
        });

    } catch (error) {
        console.error('❌ Error updating promo code:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};

// @desc    Delete promo code
// @route   DELETE /api/promo/:id
// @access  Private/Admin
const deletePromoCode = async (req, res) => {
    try {
        const promoCode = await PromoCode.findById(req.params.id);

        if (!promoCode) {
            return res.status(404).json({
                success: false,
                message: 'Promo code not found'
            });
        }

        await promoCode.deleteOne();

        console.log(`✅ Promo code deleted: ${promoCode.code}`);

        res.json({
            success: true,
            message: 'Promo code deleted successfully'
        });

    } catch (error) {
        console.error('❌ Error deleting promo code:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

module.exports = {
    validatePromoCode,
    getAllPromoCodes,
    createPromoCode,
    updatePromoCode,
    deletePromoCode
};
