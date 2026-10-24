const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false // Can be a guest checkout
    },
    customerDetails: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        contact: { type: String, required: true },
        address: { type: String, required: true },
        orgName: { type: String }
    },
    items: [
        {
            title: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true }
        }
    ],
    paymentMethod: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        required: true,
        default: 'USD'
    },
    exchangeRate: {
        type: Number,
        default: 1
    },
    paymentResult: {
        id: { type: String },
        status: { type: String },
        update_time: { type: String },
        email_address: { type: String }
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    promoCode: {
        type: String,
        default: null
    },
    discountPercentage: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    discountAmount: {
        type: Number,
        default: 0.0
    },
    originalPrice: {
        type: Number,
        default: 0.0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false
    },
    paidAt: {
        type: Date
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false
    },
    deliveredAt: {
        type: Date
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
