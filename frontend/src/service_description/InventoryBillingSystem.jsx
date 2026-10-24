import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useContactFormModal } from '../context/ContactFormContext';
import '../App.css';

const InventoryBillingSystem = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const { openContactModal } = useContactFormModal();
    const serviceName = "Inventory & Billing System";

    if (!isOpen) return null;

    const plans = [
        {
            name: "Retail & POS Edition",
            price: 699,
            description: "Essential POS billing, barcode checkout, and instant stock monitoring for retail shops.",
            features: [
                "Fast Point of Sale (POS) Billing Interface",
                "Barcode Scanner & Thermal Printer Support",
                "Real-Time Stock Depletion & Low-Stock Alerts",
                "GST / VAT Compliant Invoice & PDF Generation",
                "Daily Sales, Cash Register & Profit Reports",
                "Customer Loyalty Points & Credit Tracking",
                "30 Days Setup & Hardware Assistance"
            ]
        },
        {
            name: "Warehouse & Multi-Branch",
            price: 1399,
            description: "Centralized stock control and batch tracking across multiple locations and warehouses.",
            features: [
                "Multi-Branch & Multi-Warehouse Inventory Routing",
                "Batch Number, Serial Number & Expiry Date Tracking",
                "Automated Purchase Orders & Reorder Levels",
                "Vendor / Supplier Management & Payable Tracking",
                "Role-Based Cashier, Manager & Admin Permissions",
                "Cloud Sync & Mobile App for Stock Auditing",
                "60 Days Technical Support & Staff Onboarding"
            ]
        },
        {
            name: "Omnichannel Enterprise",
            price: 2299,
            description: "Full ERP inventory sync connecting retail POS, warehouses, e-commerce, and accounting.",
            features: [
                "Real-Time Sync with Shopify / WooCommerce / Amazon",
                "Automated Multi-Channel Order Fulfillment",
                "B2B Wholesale Invoicing with Custom Credit Terms",
                "Advanced Inventory Forecasting & Demand Analytics",
                "Accounting Software Export & Tally/QuickBooks API",
                "Dedicated Server Deployment & Automated Backups",
                "Dedicated Account Manager & Priority 24/7 SLA"
            ]
        }
    ];

    const handleAddToCart = (plan) => {
        const itemTitle = `${serviceName} - ${plan.name}`;

        let existingItems = [];
        try {
            const stored = JSON.parse(localStorage.getItem('cartItems'));
            if (Array.isArray(stored)) {
                existingItems = stored;
            }
        } catch (err) {
            console.error("Error reading cart items", err);
        }

        const existingItemIndex = existingItems.findIndex(item => item.title === itemTitle);
        let updatedItems;

        if (existingItemIndex > -1) {
            updatedItems = [...existingItems];
            updatedItems[existingItemIndex] = {
                ...updatedItems[existingItemIndex],
                quantity: updatedItems[existingItemIndex].quantity + 1
            };
        } else {
            const newItem = {
                id: Date.now().toString(),
                title: itemTitle,
                price: plan.price,
                description: plan.description,
                tags: plan.features.slice(0, 3),
                quantity: 1
            };
            updatedItems = [...existingItems, newItem];
        }

        localStorage.setItem('cartItems', JSON.stringify(updatedItems));
        window.dispatchEvent(new Event('cartUpdated'));
        onClose();
        navigate('/cart');
    };

    return (
        <div className="pricing-modal-overlay" onClick={onClose}>
            <div className="pricing-modal-content" onClick={e => e.stopPropagation()}>
                <button className="pricing-modal-close" onClick={onClose} aria-label="Close modal">&times;</button>
                <h2 className="text-center fw-bold">{serviceName} Plans</h2>
                <div className="pricing-modal-scroll-container">
                    <div className="row g-4 mb-4">
                        {plans.map((plan, index) => (
                            <div className="col-md-4" key={index}>
                                <div className="pricing-card h-100 d-flex flex-column">
                                    <h3 className="plan-title">{plan.name}</h3>
                                    <div className="price-tag">
                                        <span className="amount">${plan.price}</span>
                                        <span className="period">/package</span>
                                    </div>
                                    <p className="plan-desc">{plan.description}</p>
                                    <div className="services-list flex-grow-1">
                                        <p className="list-title">Services Offered:</p>
                                        <ul className="list-unstyled">
                                            {plan.features.map((feature, idx) => (
                                                <li key={idx}>
                                                    <i className="bi bi-check2 text-primary me-2"></i>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <button
                                        className="btn btn-primary w-100 rounded-pill mt-3"
                                        onClick={() => handleAddToCart(plan)}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="custom-quote-section">
                        <div className="row align-items-center">
                            <div className="col-md-7">
                                <h3 className="fw-bold mb-2">Need a custom POS, ERP, or warehouse workflow?</h3>
                            </div>
                            <div className="col-md-5 text-md-end">
                                <p className="text-secondary small mb-3">
                                    We build custom inventory management software tailored to your exact supply chain and billing models.
                                </p>
                                <button
                                    className="btn btn-outline-primary rounded-pill px-4"
                                    onClick={() => {
                                        if (onClose) onClose();
                                        openContactModal({
                                            title: "CUSTOM QUOTE",
                                            subtitle: "Tailored to Inventory & Billing",
                                            message: `Hi, I would like to request a custom quote for ${serviceName}.`
                                        });
                                    }}
                                >
                                    Request a Custom Quote
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InventoryBillingSystem;
