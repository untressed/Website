import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useContactFormModal } from '../context/ContactFormContext';
import '../App.css';

const MvpDevelopment = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const { openContactModal } = useContactFormModal();
    const serviceName = "MVP Development";

    if (!isOpen) return null;

    const plans = [
        {
            name: "Rapid Prototype",
            price: 899,
            description: "Validate your concept fast with an interactive, investor-ready clickable prototype.",
            features: [
                "Interactive High-Fidelity Figma Prototype",
                "Complete User Journey Mapping & UX Flows",
                "Custom Design System & Component Library",
                "Mobile & Desktop Responsive Layouts",
                "Pitch-Deck Demo & Feedback Incorporation",
                "Full Source Design Assets Export",
                "Delivery in 7–10 Days"
            ]
        },
        {
            name: "Functional MVP",
            price: 1899,
            description: "A working, scalable software product built to acquire your first 1,000 users.",
            features: [
                "Full-Stack Web or Mobile MVP Build",
                "Core Value-Proposition Feature Set",
                "User Authentication & Database Integration",
                "Payment Gateway Setup (Stripe / Razorpay)",
                "Transactional Emails & Notifications",
                "Cloud Deployment (AWS/Vercel) & SSL",
                "30 Days Post-Launch Bug Fixing Support"
            ]
        },
        {
            name: "Market-Ready MVP",
            price: 2899,
            description: "Production-ready MVP designed for venture-backed scaling and rapid iteration.",
            features: [
                "Complete End-to-End Application Ecosystem",
                "Advanced User Onboarding & Retention Triggers",
                "Integrated Analytics & Event Tracking (Mixpanel/GA4)",
                "REST/GraphQL API for Mobile & Partner Integrations",
                "Automated CI/CD Pipeline & Automated Tests",
                "Scalable Serverless / Container Infrastructure",
                "60 Days Dedicated Technical Support"
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
                                <h3 className="fw-bold mb-2">Have a revolutionary startup idea to validate?</h3>
                            </div>
                            <div className="col-md-5 text-md-end">
                                <p className="text-secondary small mb-3">
                                    Let's define the leanest, most impactful scope to get your MVP into users' hands in record time.
                                </p>
                                <button
                                    className="btn btn-outline-primary rounded-pill px-4"
                                    onClick={() => {
                                        if (onClose) onClose();
                                        openContactModal({
                                            title: "CUSTOM QUOTE",
                                            subtitle: "Tailored to your MVP Idea",
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

export default MvpDevelopment;
