import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { useContactFormModal } from '../context/ContactFormContext';

const PayPerClick = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const { openContactModal } = useContactFormModal();
    const serviceName = "Pay-Per-Click(PPC)";

    if (!isOpen) return null;

    const plans = [
        {
            name: "Starter Plan",
            price: 350,
            description: "Cost-effective entry into PPC with essential setup and management.",
            features: [
                "Setup Fee Included & 15 Days Free Trial",
                "Advertising Budget: $0 – $2,999 / Month",
                "Full Optimizations: 1.5 Month",
                "Ad Groups: Up to 7 (4 Ads per Group)",
                "Keywords: Up to 75 & Negative Keywords",
                "Conversion Tracking & Funnel Reporting",
                "Monthly Reporting + Custom Dashboard",
                "Ad Networks: Google, Bing",
                "Mobile/Responsive Ads & Call/Sitelink Extensions",
                "Remarketing & Monthly Conference Calls",
                "Display/Image Ads + Video Ads",
                "Customer Support (Phone, Email)"
            ]
        },
        {
            name: "Accelerator Plan",
            price: 650,
            description: "Advanced campaign management for growing businesses with higher budgets.",
            features: [
                "Setup Fee Included & 20 Days Free Trial",
                "Advertising Budget: $3,000 – $9,999 / Month",
                "Full Optimizations: Ongoing",
                "Ad Groups: Up to 15 (8 Ads per Group)",
                "Keywords: Up to 150 & Advanced Negative Lists",
                "Advanced Conversion & Attribution Modeling",
                "Bi-Weekly Reporting + Live Dashboard",
                "Ad Networks: Google, Bing, YouTube",
                "A/B Testing & Dynamic Search Ads",
                "Advanced Remarketing & Audience Lists",
                "Display/Video/Discovery Ads",
                "Priority Support (Phone, Email)"
            ]
        },
        {
            name: "Advanced Plan",
            price: 950,
            description: "Enterprise-grade PPC solution for maximum scale and market dominance.",
            features: [
                "Priority Setup & 30 Days Free Trial",
                "Advertising Budget: $10,000+ / Month",
                "Full Optimizations: Daily Proactive Management",
                "Ad Groups: Unlimited",
                "Keywords: Unlimited & Competitive Intelligence",
                "Full-Funnel Tracking & CRM Integration",
                "Weekly Reporting + Advanced Custom Insights",
                "Ad Networks: All Major Platforms (Google, Bing, Etc.)",
                "Advanced A/B Testing & AI Bidding Strategies",
                "Cross-Channel Remarketing & Customer Match",
                "Interactive/Rich Media Ads",
                "Dedicated Account Manager 24/7"
            ]
        }
    ];

    const handleAddToCart = (plan) => {
        const itemTitle = `${serviceName} - ${plan.name}`;

        // Get existing items safely
        let existingItems = [];
        try {
            const stored = JSON.parse(localStorage.getItem('cartItems'));
            if (Array.isArray(stored)) {
                existingItems = stored;
            }
        } catch (err) {
            console.error("Error reading cart items", err);
        }

        // Check if item already exists
        const existingItemIndex = existingItems.findIndex(item => item.title === itemTitle);

        let updatedItems;

        if (existingItemIndex > -1) {
            // Item exists, increment quantity
            updatedItems = [...existingItems];
            updatedItems[existingItemIndex] = {
                ...updatedItems[existingItemIndex],
                quantity: updatedItems[existingItemIndex].quantity + 1
            };
        } else {
            // Create new item
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

        // Save to localStorage
        localStorage.setItem('cartItems', JSON.stringify(updatedItems));

        // Dispatch custom event to notify other components (like Cart)
        window.dispatchEvent(new Event('cartUpdated'));

        // Close modal and navigate to cart
        onClose();
        navigate('/cart');
    };

    return (
        <div className="pricing-modal-overlay" onClick={onClose}>
            <div className="pricing-modal-content" onClick={e => e.stopPropagation()}>

                <h2 className="text-center fw-bold">{serviceName} Plans</h2>
                <div className="pricing-modal-scroll-container">

                    {/* Pricing Cards Row */}
                    <div className="row g-4 mb-4">
                        {plans.map((plan, index) => (
                            <div className="col-md-4" key={index}>
                                <div className="pricing-card h-100 d-flex flex-column">
                                    <h3 className="plan-title">{plan.name}</h3>
                                    <div className="price-tag">
                                        <span className="amount">${plan.price}</span>
                                        <span className="period">/month</span>
                                    </div>
                                    <p className="plan-desc">
                                        {plan.description}
                                    </p>
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

                    {/* Custom Quote Section */}
                    <div className="custom-quote-section">
                        <div className="row align-items-center">
                            <div className="col-md-7">
                                <h3 className="fw-bold mb-2">Not sure which plan fits? Let's build one tailored to your goals.</h3>
                            </div>
                            <div className="col-md-5 text-md-end">
                                <p className="text-secondary small mb-3">
                                    Not all businesses fit into predefined packages. With a custom plan, you can combine the services you truly need.
                                </p>
                                <button
                                    className="btn btn-outline-primary rounded-pill px-4"
                                    onClick={() => {
                                        if (onClose) onClose();
                                        openContactModal({
                                            title: "CUSTOM QUOTE",
                                            subtitle: "Tailored to your specific goals",
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

export default PayPerClick;
