import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useContactFormModal } from '../context/ContactFormContext';
import '../App.css';

const CustomSoftware = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const { openContactModal } = useContactFormModal();
    const serviceName = "Custom Software Development";

    if (!isOpen) return null;

    const plans = [
        {
            name: "Workflow Automation",
            price: 999,
            description: "Automate manual business processes and connect fragmented software systems.",
            features: [
                "Custom Internal Automation Tools",
                "Two-Way Data Sync Between Existing Apps",
                "Role-Based User Permissions & Audit Logs",
                "Custom Webhook & API Connectors",
                "Automated Reporting & Email/SMS Alerts",
                "Cloud Deployment & Secure SSL",
                "30 Days Maintenance & Training"
            ]
        },
        {
            name: "Bespoke Business Suite",
            price: 2499,
            description: "Tailor-made software engineered exclusively for your specific operational model.",
            features: [
                "End-to-End Custom Web / Desktop Application",
                "Modular Architecture Designed for Expansion",
                "Comprehensive Admin Console & Dashboard",
                "Custom Database Modeling & Indexing",
                "Third-Party ERP / Payment / CRM Integrations",
                "Automated Unit & Integration Testing",
                "60 Days Post-Deployment Dedicated Support"
            ]
        },
        {
            name: "Enterprise Modernization",
            price: 4499,
            description: "Modernize legacy platforms into decoupled, high-throughput cloud software.",
            features: [
                "Legacy Codebase Refactoring & Migration",
                "Microservices / Event-Driven Architecture",
                "High-Volume Data Processing Pipelines",
                "Enterprise Security & Access Compliance",
                "Comprehensive Technical Documentation & API Specs",
                "Disaster Recovery & High-Availability Setup",
                "Dedicated Lead Architect & 24/7 SLA"
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
                                <h3 className="fw-bold mb-2">Have specialized software requirements?</h3>
                            </div>
                            <div className="col-md-5 text-md-end">
                                <p className="text-secondary small mb-3">
                                    Our engineers design bespoke systems that solve your most challenging operational problems.
                                </p>
                                <button
                                    className="btn btn-outline-primary rounded-pill px-4"
                                    onClick={() => {
                                        if (onClose) onClose();
                                        openContactModal({
                                            title: "CUSTOM QUOTE",
                                            subtitle: "Tailored to Custom Software",
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

export default CustomSoftware;
