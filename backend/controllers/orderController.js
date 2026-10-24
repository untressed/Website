const Order = require('../models/Order');
const User = require('../models/User');
const PromoCode = require('../models/PromoCode');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Razorpay = require('razorpay');

// Initialize Razorpay
let razorpay;
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
    razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
} else {
    console.error('⚠️ Razorpay Keys missing from environment variables');
}

// @desc    Create new order
// @route   POST /api/orders
// @access  Public (allows guest orders)
const addOrderItems = async (req, res) => {
    try {
        const {
            orderItems,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            customerDetails,
            promoCode
        } = req.body;

        if (!orderItems || orderItems.length === 0) {
            return res.status(400).json({ message: 'No order items provided' });
        }

        if (!customerDetails) {
            return res.status(400).json({ message: 'Customer details are required' });
        }

        let user = null;

        // Check if user is authenticated via token
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            try {
                const token = req.headers.authorization.split(' ')[1];
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                user = await User.findById(decoded.id).select('-password');
                console.log('✅ Order placed by authenticated user:', user.email);
            } catch (error) {
                console.warn('⚠️  Token verification failed, processing as guest order:', error.message);
                // Continue as guest if token fails
            }
        }

        // If no authenticated user, check if email belongs to existing user
        if (!user && customerDetails.email) {
            user = await User.findOne({ email: customerDetails.email });
            if (user) {
                console.log('📧 Order email matches existing user:', user.email);
            } else {
                console.log('👤 No existing user found. Creating new account for:', customerDetails.email);

                // Generate password: name + @ + last 4 digits of phone
                const generatePassword = (name, phone) => {
                    const cleanName = name.replace(/\s+/g, '');
                    const phoneDigits = phone.replace(/\D/g, '');
                    const last4 = phoneDigits.length >= 4
                        ? phoneDigits.slice(-4)
                        : phoneDigits || '0000';
                    return `${cleanName}@${last4}`;
                };

                const generatedPassword = generatePassword(
                    customerDetails.name || 'Customer',
                    customerDetails.contact || '0000'
                );

                // Create new user account
                try {
                    user = await User.create({
                        name: customerDetails.name,
                        email: customerDetails.email,
                        password: generatedPassword,
                        contact: customerDetails.contact,
                        address: customerDetails.address,
                        orgName: customerDetails.orgName || '',
                        role: 'user'
                    });

                    console.log('✅ New user account created:', {
                        email: user.email,
                        name: user.name,
                        password: generatedPassword
                    });

                    req.newUserCredentials = {
                        email: user.email,
                        password: generatedPassword,
                        message: 'Account created successfully. Please save these credentials.'
                    };
                } catch (userError) {
                    console.error('❌ Failed to create user account:', userError.message);
                    user = null;
                }
            }
        }

        // Sanitize and validate order items
        const sanitizedItems = orderItems.map(item => {
            const quantity = Number(item.quantity);
            const price = Number(item.price);

            if (isNaN(quantity) || quantity < 1 || quantity > 100) {
                throw new Error(`Invalid quantity for item: ${item.title || item.name}`);
            }

            if (isNaN(price) || price < 0) {
                throw new Error(`Invalid price for item: ${item.title || item.name}`);
            }

            return {
                title: item.title || item.name || 'Service',
                quantity: quantity,
                price: price
            };
        });

        // Validate and apply promo code if provided
        let promoDiscount = 0;
        let promoDetails = null;
        let finalTotalPrice = Number(totalPrice);

        if (promoCode && promoCode.trim()) {
            console.log(`🎟️ Validating promo code: ${promoCode}`);

            const promoCodeDoc = await PromoCode.findOne({
                code: promoCode.toUpperCase()
            });

            if (!promoCodeDoc) {
                return res.status(400).json({
                    message: 'Invalid promo code'
                });
            }

            const validation = promoCodeDoc.isValid();

            if (!validation.valid) {
                return res.status(400).json({
                    message: validation.message
                });
            }

            // Calculate discount
            promoDiscount = validation.discountPercentage;
            const discountAmount = (finalTotalPrice * promoDiscount) / 100;
            const originalPrice = finalTotalPrice;
            finalTotalPrice = finalTotalPrice - discountAmount;

            promoDetails = {
                code: promoCodeDoc.code,
                discountPercentage: promoDiscount,
                discountAmount: discountAmount,
                originalPrice: originalPrice
            };

            // Increment usage count
            promoCodeDoc.usedCount += 1;
            await promoCodeDoc.save();

            console.log(`✅ Promo code applied: ${promoCodeDoc.code} - ${promoDiscount}% discount`);
            console.log(`💰 Original: ${originalPrice}, Discount: ${discountAmount}, Final: ${finalTotalPrice}`);
        }

        // Create Razorpay order if method is razorpay
        let razorpayOrder = null;
        const currency = req.body.currency || 'USD';
        const exchangeRate = Number(req.body.exchangeRate) || 1;

        if (paymentMethod === 'razorpay') {
            console.log(`💰 Attempting Razorpay order for Price: ${finalTotalPrice} ${currency}`);
            const options = {
                amount: Math.round(finalTotalPrice * 100), // amount in the smallest currency unit (paise/cents)
                currency: currency,
                receipt: `receipt_order_${Date.now()}`,
            };
            console.log('📦 Razorpay Order Options:', JSON.stringify(options, null, 2));

            try {
                if (!razorpay) {
                    throw new Error('Razorpay is not initialized. Please check your API keys.');
                }
                razorpayOrder = await razorpay.orders.create(options);
                console.log('✅ Razorpay order created:', razorpayOrder.id);
            } catch (rkError) {
                console.error('❌ Razorpay order creation failed:', rkError.message);
                console.error('❌ Full Razorpay Error:', rkError);
                throw new Error('Payment gateway error. Please try again later.');
            }
        }

        // Create order
        const order = new Order({
            user: user ? user._id : null,
            customerDetails: {
                name: customerDetails.name,
                email: customerDetails.email,
                contact: customerDetails.contact,
                address: customerDetails.address,
                orgName: customerDetails.orgName || ''
            },
            items: sanitizedItems,
            paymentMethod: paymentMethod || 'manual',
            currency: currency,
            exchangeRate: exchangeRate,
            itemsPrice: Number(itemsPrice),
            taxPrice: Number(taxPrice),
            shippingPrice: Number(shippingPrice),
            promoCode: promoDetails ? promoDetails.code : null,
            discountPercentage: promoDetails ? promoDetails.discountPercentage : 0,
            discountAmount: promoDetails ? promoDetails.discountAmount : 0,
            originalPrice: promoDetails ? promoDetails.originalPrice : Number(totalPrice),
            totalPrice: Number(finalTotalPrice),
            isPaid: false,
            paymentResult: {
                id: razorpayOrder ? razorpayOrder.id : null,
                status: razorpayOrder ? 'CREATED' : 'PENDING',
                update_time: Date.now(),
            },
        });

        const createdOrder = await order.save();

        console.log('✅ Order created successfully:', {
            orderId: createdOrder._id,
            userType: user ? 'authenticated' : 'guest',
            originalTotal: promoDetails ? promoDetails.originalPrice : totalPrice,
            discount: promoDetails ? `${promoDetails.discountPercentage}% (${promoDetails.discountAmount})` : 'None',
            finalTotal: finalTotalPrice,
            razorpayOrderId: razorpayOrder ? razorpayOrder.id : 'N/A'
        });

        // Prepare response
        const response = {
            order: createdOrder,
            razorpayOrder: razorpayOrder, // Return the razorpay order details to frontend
            message: 'Order placed successfully'
        };

        // Include credentials if new user was created
        if (req.newUserCredentials) {
            response.newUser = req.newUserCredentials;
            console.log('🔑 New user credentials included in response');
        }

        res.status(201).json(response);
    } catch (error) {
        console.error('❌ Order creation error:', error.message);
        res.status(500).json({ message: error.message || 'Order creation failed' });
    }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id });
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Verify Razorpay payment
// @route   POST /api/orders/verify
// @access  Public (verified by signature)
const verifyPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            orderId
        } = req.body;

        const crypto = require('crypto');
        const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);

        hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
        const generated_signature = hmac.digest('hex');

        if (generated_signature === razorpay_signature) {
            // Update order to paid
            const order = await Order.findById(orderId);

            if (order) {
                order.isPaid = true;
                order.paidAt = Date.now();
                order.paymentResult = {
                    id: razorpay_payment_id,
                    status: 'PAID',
                    update_time: Date.now(),
                };

                const updatedOrder = await order.save();
                console.log(`✅ Order ${orderId} marked as PAID`);
                res.json({ success: true, message: 'Payment verified successfully', order: updatedOrder });
            } else {
                res.status(404).json({ message: 'Order not found' });
            }
        } else {
            console.error('❌ Invalid Razorpay signature');
            res.status(400).json({ success: false, message: 'Invalid payment signature' });
        }
    } catch (error) {
        console.error('❌ Verification error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    addOrderItems,
    getMyOrders,
    verifyPayment
};
