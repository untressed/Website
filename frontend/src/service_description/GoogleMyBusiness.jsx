import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useContactFormModal } from '../context/ContactFormContext';
import '../App.css';

const GoogleMyBusiness = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const { openContactModal } = useContactFormModal();
    const serviceName = "Google My Business";

    if (!isOpen) return null;

    const plans = [
        {
            name: "Bronze Plan",
            price: 350,
            description: "Essential local presence management for small businesses.",
            features: [
                "Number of Keywords: 5",
                "One-Time GMB Analysis & Audit",
                "Pre-Optimization: Competitor & Geo Analysis",
                "GMB Optimization: Profile, Content, Hours",
                "Off-Page: 5 Articles, 5 Local Classifieds",
                "5 GMB Image Sharing & 5 Q&A Posts",
                "3 Profile Creations & 1 Google Places Citation",
                "Review Collection Support & Monthly Reporting"
            ]
        },
        {
            name: "Silver Plan",
            price: 650,
            description: "Advanced local dominance with higher citation volume and content marketing.",
            features: [
                "Number of Keywords: 10",
                "Deep GMB Analysis & Audit",
                "Pre-Optimization: Advanced Competitor Tracking",
                "GMB Optimization: Post Scheduling & Updates",
                "Off-Page: 10 Articles, 10 Local Classifieds",
                "10 GMB Image Sharing & 10 Q&A Posts",
                "10 Profile Creations & 5 Google Places Citations",
                "Review Management Strategy & Monthly Reporting"
            ]
        },
        {
            name: "Gold Plan",
            price: 950,
            description: "Comprehensive local market leadership with maximum visibility and reputation management.",
            features: [
                "Number of Keywords: 20",
                "Enterprise GMB Strategy & Audit",
                "Pre-Optimization: Local Market Gap Analysis",
                "GMB Optimization: Daily Monitoring & Spam Fighting",
                "Off-Page: 20 Articles, 20 Local Listings",
                "Unlimited GMB Media Updates & Q&A Management",
                "20 Profile Creations & 10 Google Places Citations",
                "Reputation Recovery & Advanced Analytics"
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

export default GoogleMyBusiness;
