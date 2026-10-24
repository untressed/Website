const { body, validationResult } = require('express-validator');

// Validation error handler
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorArray = errors.array();
        console.error('❌ Validation Failed:', JSON.stringify(errorArray, null, 2));
        console.error('📦 Request Body:', JSON.stringify(req.body, null, 2));

        // Extract basic message and first specific error for easy display
        const firstError = errorArray[0];
        const detailedMessage = `Validation failed: ${firstError.msg} (${firstError.path})`;

        return res.status(400).json({
            message: detailedMessage,
            errors: errorArray
        });
    }
    next();
};

// Registration validation rules
const validateRegistration = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),

    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please provide a valid email address')
        .normalizeEmail(),

    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),

    body('contact')
        .optional()
        .trim()
        .matches(/^[0-9+\-\s()]+$/).withMessage('Invalid phone number format'),

    body('address')
        .optional()
        .trim()
        .isLength({ max: 500 }).withMessage('Address must not exceed 500 characters'),

    body('orgName')
        .optional()
        .trim()
        .isLength({ max: 200 }).withMessage('Organization name must not exceed 200 characters'),

    handleValidationErrors
];

// Login validation rules
const validateLogin = [
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please provide a valid email address')
        .normalizeEmail(),

    body('password')
        .notEmpty().withMessage('Password is required'),

    handleValidationErrors
];

// Order validation rules
const validateOrder = [
    body('orderItems')
        .isArray({ min: 1 }).withMessage('Order must contain at least one item'),

    body('orderItems.*.title')
        .optional()
        .trim()
        .notEmpty().withMessage('Item title is required'),

    body('orderItems.*.name')
        .optional()
        .trim()
        .notEmpty().withMessage('Item name is required'),

    body('orderItems.*.quantity')
        .isInt({ min: 1, max: 100 }).withMessage('Quantity must be between 1 and 100'),

    body('orderItems.*.price')
        .isFloat({ min: 0 }).withMessage('Price must be a positive number'),

    body('paymentMethod')
        .trim()
        .notEmpty().withMessage('Payment method is required'),

    body('itemsPrice')
        .isFloat({ min: 0 }).withMessage('Items price must be a positive number'),

    body('taxPrice')
        .isFloat({ min: 0 }).withMessage('Tax price must be a positive number'),

    body('shippingPrice')
        .isFloat({ min: 0 }).withMessage('Shipping price must be a positive number'),

    body('totalPrice')
        .isFloat({ min: 0 }).withMessage('Total price must be a positive number'),

    body('currency')
        .optional()
        .trim()
        .isIn(['USD', 'INR']).withMessage('Currency must be USD or INR'),

    body('exchangeRate')
        .optional()
        .isFloat({ min: 0 }).withMessage('Exchange rate must be a positive number'),

    body('customerDetails.name')
        .trim()
        .notEmpty().withMessage('Customer name is required')
        .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),

    body('customerDetails.email')
        .trim()
        .notEmpty().withMessage('Customer email is required')
        .isEmail().withMessage('Please provide a valid email address')
        .normalizeEmail(),

    body('customerDetails.contact')
        .trim()
        .notEmpty().withMessage('Customer contact is required')
        .matches(/^[0-9+\-\s()]+$/).withMessage('Invalid phone number format'),

    body('customerDetails.address')
        .trim()
        .notEmpty().withMessage('Customer address is required')
        .isLength({ max: 500 }).withMessage('Address must not exceed 500 characters'),

    body('customerDetails.orgName')
        .optional()
        .trim()
        .isLength({ max: 200 }).withMessage('Organization name must not exceed 200 characters'),

    handleValidationErrors
];

// Contact form validation rules
const validateContact = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),

    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please provide a valid email address')
        .normalizeEmail(),

    body('message')
        .trim()
        .notEmpty().withMessage('Message is required')
        .isLength({ min: 2, max: 1000 }).withMessage('Message must be between 2 and 1000 characters'),

    handleValidationErrors
];

module.exports = {
    validateRegistration,
    validateLogin,
    validateOrder,
    validateContact,
};
