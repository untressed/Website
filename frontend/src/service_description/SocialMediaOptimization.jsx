import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { useContactFormModal } from '../context/ContactFormContext';

const SocialMediaOptimization = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const { openContactModal } = useContactFormModal();
    const serviceName = "Social Media Optimization(SMO)";

    if (!isOpen) return null;

    const plans = [
        {
            name: "Starter Plan",
            price: 350,
            description: "Solid foundation for social presence with essential tracking and promotion.",
            features: [
                "Total No. of Hours: 50",
                "10 Monthly postings",
                "10 Analytics tracking",
                "Competitor analysis",
                "Strategy formation & Hashtag promotion",
                "Monthly creative creation",
                "Account Management",
                "Engagement with communities & groups",
                "Network build-up",
                "Engagement with third-party posts",
                "Content optimization",
                "Paid Promotion (Budget est, Campaign setup, Ads)",
                "Remarketing (Audience lists, Optimization)",
                "Customer support (Phone, Email)",
                "Add-ons: YouTube, WhatsApp, LinkedIn promotion"
            ]
        },
        {
            name: "Accelerator Plan",
            price: 650,
            description: "Enhanced growth strategy for scaling businesses with more content and deeper insights.",
            features: [
                "Total No. of Hours: 100",
                "20 Monthly postings",
                "20 Analytics tracking",
                "Deep Competitor & Trend Analysis",
                "Advanced Strategy & Viral Content Planning",
                "Weekly creative creation",
                "Dedicated Account Management",
                "Active Community Building & Moderation",
                "Influencer & Partner Outreach",
                "Advanced Content Optimization (Reels/Stories)",
                "Paid Promotion (A/B Testing, Multi-platform)",
                "Advanced Remarketing & Lookalike Audiences",
                "Priority Customer support (Phone, Email)",
                "Add-ons: YouTube, WhatsApp, LinkedIn (Priority)"
            ]
        },
        {
            name: "Advanced Plan",
            price: 950,
            description: "Dominant social authority solution with maximum engagement and comprehensive coverage.",
            features: [
                "Total No. of Hours: 160",
                "30 Monthly postings",
                "Weekly Deep-Dive Analytics",
                "Comprehensive Brand & Crisis Strategy",
                "Daily creative creation & video editing",
                "24/7 Account Management",
                "Strategic Community Leadership",
                "Extensive Network & Influencer Campaigns",
                "Cross-Platform Sync & viral engineering",
                "Omni-Channel Paid Promotion (AI-Optimized)",
                "Full-Funnel Automation & Attribution",
                "Dedicated Account Manager & 24/7 Support",
                "All Add-ons included (Premium placement)"
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
                                    <p className="plan-desc mb-0">
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

export default SocialMediaOptimization;
