import React, { useState, useEffect } from 'react';
// Version: 1.1.0 - Added Promo Code Support
import '../App.css';
import orderService from '../services/orderService';
import promoService from '../services/promoService';

const CheckoutModal = ({ isOpen, onClose, items, subtotal, taxes, total, onClearCart }) => {
    const [step, setStep] = useState('summary'); // summary, details, processing, success
    const [loading, setLoading] = useState(false);
    const [newUserCredentials, setNewUserCredentials] = useState(null); // Store new user credentials
    const [currency, setCurrency] = useState('USD');
    const [exchangeRate, setExchangeRate] = useState(80); // Default fallback

    // Promo Code State
    const [promoCode, setPromoCode] = useState('');
    const [appliedPromo, setAppliedPromo] = useState(null); // { code, discountPercentage }
    const [promoError, setPromoError] = useState('');
    const [promoLoading, setPromoLoading] = useState(false);

    // Address Details State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contact: '',
        address: '',
        orgName: '' // Optional
    });

    const [errors, setErrors] = useState({});

    // Reset state when modal opens/closes
    useEffect(() => {
        const fetchExchangeRate = async () => {
            try {
                const response = await fetch('https://open.er-api.com/v6/latest/USD');
                const data = await response.json();
                if (data && data.rates && data.rates.INR) {
                    setExchangeRate(data.rates.INR);
                    console.log('📈 Live Exchange Rate (USD to INR):', data.rates.INR);
                }
            } catch (error) {
                console.error('❌ Failed to fetch exchange rate:', error);
                // Fallback to 80 is already set in state
            }
        };

        if (isOpen) {
            setStep('summary');
            setLoading(false);
            setErrors({});
            setNewUserCredentials(null); // Reset credentials
            setCurrency('USD'); // Default to USD on open
            setPromoCode('');
            setAppliedPromo(null);
            setPromoError('');
            fetchExchangeRate();

            // Pre-fill if user is logged in
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
                setFormData({
                    name: user.name || '',
                    email: user.email || '',
                    contact: user.contact || '',
                    address: user.address || '',
                    orgName: user.orgName || ''
                });
            } else {
                setFormData({
                    name: '',
                    email: '',
                    contact: '',
                    address: '',
                    orgName: ''
                });
            }
        }
    }, [isOpen]);

    const getConvertedTotal = (val) => {
        if (currency === 'INR') {
            return (Number(val) * exchangeRate).toFixed(2);
        }
        return Number(val).toFixed(2);
    };

    const getCurrencySymbol = () => (currency === 'INR' ? '₹' : '$');

    // Calculate discount amount
    const getDiscountAmount = () => {
        if (!appliedPromo) return 0;
        const totalValue = getConvertedTotal(total);
        return (Number(totalValue) * appliedPromo.discountPercentage / 100).toFixed(2);
    };

    // Calculate final total after discount
    const getFinalTotal = () => {
        const totalValue = getConvertedTotal(total);
        const discount = getDiscountAmount();
        return (Number(totalValue) - Number(discount)).toFixed(2);
    };

    // Handle promo code application
    const handleApplyPromo = async () => {
        if (!promoCode.trim()) {
            setPromoError('Please enter a promo code');
            return;
        }

        setPromoLoading(true);
        setPromoError('');

        try {
            const result = await promoService.validatePromoCode(promoCode);

            if (result.success) {
                setAppliedPromo({
                    code: result.code,
                    discountPercentage: result.discountPercentage,
                    description: result.description
                });
                setPromoError('');
                console.log(`✅ Promo code applied: ${result.code} - ${result.discountPercentage}% discount`);
            } else {
                setPromoError(result.message || 'Invalid promo code');
                setAppliedPromo(null);
            }
        } catch (error) {
            setPromoError(error.message || 'Failed to validate promo code');
            setAppliedPromo(null);
        } finally {
            setPromoLoading(false);
        }
    };

    // Handle promo code removal
    const handleRemovePromo = () => {
        setPromoCode('');
        setAppliedPromo(null);
        setPromoError('');
    };

    if (!isOpen) return null;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateDetails = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
        if (!formData.contact.trim()) newErrors.contact = 'Contact number is required';
        if (!formData.address.trim()) newErrors.address = 'Billing address is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleProceedToPayment = () => {
        if (validateDetails()) {
            handleConfirmPay();
        }
    };

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handleConfirmPay = async () => {
        setLoading(true);
        setStep('processing');

        try {
            // Calculate final prices based on selected currency
            const finalSubtotal = getConvertedTotal(subtotal);
            const finalTaxes = getConvertedTotal(taxes);
            const finalTotal = getConvertedTotal(total);

            // Create Order in DB & Razorpay Order in Backend
            const orderData = {
                orderItems: items.map(item => ({
                    ...item,
                    price: currency === 'INR' ? (item.price * exchangeRate).toFixed(2) : item.price
                })),
                paymentMethod: 'razorpay',
                currency: currency,
                exchangeRate: currency === 'INR' ? exchangeRate : 1,
                itemsPrice: Number(finalSubtotal),
                taxPrice: Number(finalTaxes),
                shippingPrice: 0,
                totalPrice: Number(finalTotal),
                customerDetails: formData,
                promoCode: appliedPromo ? appliedPromo.code : null
            };

            console.log('🔄 Creating order and payment session...', orderData);
            const result = await orderService.createOrder(orderData);
            console.log('✅ Order created:', result);

            if (result.newUser) {
                setNewUserCredentials(result.newUser);
            }

            // Load Razorpay Script
            const res = await loadRazorpayScript();

            if (!res) {
                alert('Razorpay SDK failed to load. Please check your internet connection.');
                setStep('details');
                setLoading(false);
                return;
            }

            // Razorpay Options
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: result.razorpayOrder.amount,
                currency: result.razorpayOrder.currency,
                name: "UNTRESSED",
                description: "Purchase for services/products",
                order_id: result.razorpayOrder.id,
                handler: async function (response) {
                    console.log('✅ Payment successful, verifying...', response);
                    try {
                        await orderService.verifyPayment({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            orderId: result.order._id
                        });
                        setStep('success');
                    } catch (err) {
                        console.error('❌ Verification failed:', err);
                        alert('Payment verification failed. Please contact support.');
                        setStep('details');
                        setLoading(false);
                    }
                },
                prefill: {
                    name: formData.name,
                    email: formData.email,
                    contact: formData.contact,
                },
                theme: {
                    color: "#315C46",
                },
                modal: {
                    ondismiss: function () {
                        setStep('details');
                        setLoading(false);
                    }
                }
            };

            console.log('📦 Opening Razorpay modal with options:', options);
            const paymentObject = new window.Razorpay(options);

            paymentObject.on('payment.failed', function (response) {
                console.error('❌ Payment failed:', response.error);
                alert("Payment failed: " + response.error.description);
            });

            paymentObject.open();

        } catch (error) {
            console.error("❌ Checkout failed:", error);

            // Extract detailed message from backend if available
            let errorMsg = error.response?.data?.message || error.message || "Unknown error";

            // If there's an errors array, list them for clarity
            if (error.response?.data?.errors && Array.isArray(error.response.data.errors)) {
                const details = error.response.data.errors.map(err => `• ${err.msg}`).join('\n');
                errorMsg = `Validation Failed:\n${details}`;
            }

            alert("Checkout Error: " + errorMsg);
            setStep('details');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        if (step === 'success') {
            onClearCart();
        }
        onClose();
    };

    const renderStepIndicator = () => {
        if (step === 'success') return null;
        const currentStepNum = step === 'summary' ? 1 : step === 'details' ? 2 : 3;
        return (
            <div className="checkout-step-progression mb-3">
                <div className={`step-item ${currentStepNum >= 1 ? 'active' : ''} ${currentStepNum > 1 ? 'completed' : ''}`}>
                    <span className="step-circle">{currentStepNum > 1 ? '✓' : '1'}</span>
                    <span className="step-label">Cart</span>
                </div>
                <div className={`step-line ${currentStepNum >= 2 ? 'active' : ''}`}></div>
                <div className={`step-item ${currentStepNum >= 2 ? 'active' : ''} ${currentStepNum > 2 ? 'completed' : ''}`}>
                    <span className="step-circle">{currentStepNum > 2 ? '✓' : '2'}</span>
                    <span className="step-label">Billing</span>
                </div>
                <div className={`step-line ${currentStepNum >= 3 ? 'active' : ''}`}></div>
                <div className={`step-item ${currentStepNum >= 3 ? 'active' : ''}`}>
                    <span className="step-circle">3</span>
                    <span className="step-label">Payment</span>
                </div>
            </div>
        );
    };

    const renderSummary = () => (
        <>
            <div className="d-flex justify-content-between align-items-center mb-2">
                <h4 className="fw-bold mb-0 text-dark-forest">Order Summary</h4>
                <span className="badge rounded-pill bg-taupe-subtle text-dark-forest px-2 py-1 small">
                    {items.reduce((acc, i) => acc + (i.quantity || 1), 0)} Items
                </span>
            </div>

            <div className="checkout-items-list mb-3">
                {items.map((item, index) => (
                    <div key={index} className="checkout-item-compact d-flex align-items-center justify-content-between py-2 px-3 mb-1">
                        <div className="d-flex align-items-center gap-2">
                            <span className="item-qty-tag">x{item.quantity}</span>
                            <div className="fw-semibold text-dark-forest small text-truncate" style={{ maxWidth: '280px' }}>{item.title}</div>
                        </div>
                        <div className="fw-bold text-end small text-forest ps-2">
                            {getCurrencySymbol()}{getConvertedTotal(item.price * item.quantity)}
                        </div>
                    </div>
                ))}
            </div>

            {/* Promo Code Section */}
            <div className="checkout-promo-box p-2 mb-3">
                {!appliedPromo ? (
                    <div className="d-flex gap-2">
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            placeholder="Promo code"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                            disabled={promoLoading}
                        />
                        <button
                            className="btn btn-primary btn-sm px-3 fw-semibold text-nowrap"
                            onClick={handleApplyPromo}
                            disabled={promoLoading || !promoCode.trim()}
                        >
                            {promoLoading ? '...' : 'Apply'}
                        </button>
                    </div>
                ) : (
                    <div className="alert alert-success d-flex justify-content-between align-items-center mb-0 py-1 px-2 small">
                        <span><strong>{appliedPromo.code}</strong> ({appliedPromo.discountPercentage}% OFF)</span>
                        <button
                            className="btn btn-sm btn-outline-danger py-0 px-2 small"
                            onClick={handleRemovePromo}
                        >
                            Remove
                        </button>
                    </div>
                )}
                {promoError && (
                    <div className="text-danger small mt-1">{promoError}</div>
                )}
            </div>

            <div className="checkout-summary-box p-3 rounded-3 mb-3">
                <div className="d-flex justify-content-between mb-1 small text-muted-forest">
                    <span>Subtotal</span>
                    <span>{getCurrencySymbol()}{getConvertedTotal(subtotal)}</span>
                </div>
                <div className="d-flex justify-content-between mb-1 small text-muted-forest">
                    <span>Taxes (5%)</span>
                    <span>{getCurrencySymbol()}{getConvertedTotal(taxes)}</span>
                </div>
                {appliedPromo && (
                    <div className="d-flex justify-content-between mb-1 small text-success fw-medium">
                        <span>Discount ({appliedPromo.discountPercentage}%)</span>
                        <span>-{getCurrencySymbol()}{getDiscountAmount()}</span>
                    </div>
                )}
                <hr className="my-2" />
                <div className="d-flex justify-content-between fw-bold text-dark-forest">
                    <span>Total Due</span>
                    <span className="text-terracotta fs-5">{getCurrencySymbol()}{appliedPromo ? getFinalTotal() : getConvertedTotal(total)}</span>
                </div>
            </div>

            <button
                className="btn btn-primary w-100 rounded-pill mb-1 py-2 fs-6 fw-bold shadow-sm"
                onClick={() => setStep('details')}
            >
                Proceed to Details →
            </button>
            <button
                className="btn btn-link text-decoration-none text-muted w-100 py-1 small"
                onClick={onClose}
            >
                Cancel
            </button>
        </>
    );

    const renderDetails = () => (
        <>
            <h2 className="text-center fw-bold mb-4">Address Details</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleProceedToPayment(); }}>
                <div className="mb-3">
                    <label className="form-label fw-bold">Name</label>
                    <input
                        type="text"
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label fw-bold">Email</label>
                    <input
                        type="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label fw-bold">Contact No.</label>
                    <input
                        type="tel"
                        className={`form-control ${errors.contact ? 'is-invalid' : ''}`}
                        name="contact"
                        value={formData.contact}
                        onChange={handleInputChange}
                        placeholder="+1 234 567 890"
                    />
                    {errors.contact && <div className="invalid-feedback">{errors.contact}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label fw-bold">Billing Address</label>
                    <textarea
                        className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                        name="address"
                        rows="3"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="1234 Main St, City, Country"
                    ></textarea>
                    {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                </div>
                <div className="mb-4">
                    <label className="form-label fw-bold">Organisation Name <span className="text-muted fw-normal">(Optional)</span></label>
                    <input
                        type="text"
                        className="form-control"
                        name="orgName"
                        value={formData.orgName}
                        onChange={handleInputChange}
                        placeholder="Company Ltd."
                    />
                </div>

                <div className="mb-4">
                    <label className="form-label fw-bold d-block">Payment Currency</label>
                    <div className="btn-group w-100" role="group">
                        <input
                            type="radio"
                            className="btn-check"
                            name="currency"
                            id="currencyUSD"
                            autoComplete="off"
                            checked={currency === 'USD'}
                            onChange={() => setCurrency('USD')}
                        />
                        <label className="btn btn-outline-primary" htmlFor="currencyUSD">
                            International (USD)
                        </label>

                        <input
                            type="radio"
                            className="btn-check"
                            name="currency"
                            id="currencyINR"
                            autoComplete="off"
                            checked={currency === 'INR'}
                            onChange={() => setCurrency('INR')}
                        />
                        <label className="btn btn-outline-primary" htmlFor="currencyINR">
                            Domestic (INR)
                        </label>
                    </div>
                    {currency === 'INR' && (
                        <div className="form-text mt-2 text-success">
                            <i className="bi bi-info-circle me-1"></i>
                            Rate: 1 USD = {exchangeRate.toFixed(2)} INR. All payment methods (UPI, Netbanking) enabled.
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    className="btn btn-primary w-100 rounded-pill mb-2 py-2 fs-5"
                >
                    Pay {getCurrencySymbol()}{appliedPromo ? getFinalTotal() : getConvertedTotal(total)}
                </button>
                <button
                    type="button"
                    className="btn btn-link text-decoration-none text-muted w-100"
                    onClick={() => setStep('summary')}
                >
                    Back to Summary
                </button>
            </form>
        </>
    );


    const renderProcessing = () => (
        <div className="text-center py-5">
            <div className="spinner-border text-primary mb-4" style={{ width: '3rem', height: '3rem' }} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <h4 className="fw-bold">Placing Order...</h4>
            <p className="text-muted">Please do not close this window.</p>
        </div>
    );

    const renderSuccess = () => (
        <div className="text-center py-5">
            <div className="mb-4 text-success">
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                </svg>
            </div>
            <h2 className="fw-bold mb-2">Order Placed!</h2>
            <p className="text-muted mb-4">Your order has been placed successfully. Our team will contact you for payment.</p>

            {/* Show credentials if new user was created */}
            {newUserCredentials && (
                <div className="alert alert-info text-start mx-auto mb-4" style={{ maxWidth: '400px' }}>
                    <h5 className="alert-heading fw-bold mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-check-fill me-2" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                            <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                        </svg>
                        Account Created!
                    </h5>
                    <p className="small mb-0">Your account has been created automatically. You can now login with your email and the password corresponding to your contact details.</p>
                </div>
            )}

            <button
                className="btn btn-primary rounded-pill px-5 py-2"
                onClick={handleClose}
            >
                Done
            </button>
        </div>
    );

    return (
        <div className="pricing-modal-overlay" onClick={step === 'success' ? handleClose : onClose}>
            <div className="pricing-modal-content checkout-modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '520px' }}>
                <button className="pricing-modal-close" onClick={step === 'success' ? handleClose : onClose}>&times;</button>
                <div className="pricing-modal-scroll-container p-3 px-sm-4 py-sm-3">
                    {renderStepIndicator()}
                    {step === 'summary' && renderSummary()}
                    {step === 'details' && renderDetails()}
                    {step === 'processing' && renderProcessing()}
                    {step === 'success' && renderSuccess()}
                </div>
            </div>
        </div>
    );
};

export default CheckoutModal;
