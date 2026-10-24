import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { useContactFormModal } from '../context/ContactFormContext';

const WebDevelopment = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const { openContactModal } = useContactFormModal();
    const serviceName = "Web Development";

    if (!isOpen) return null;

    const plans = [
        {
            name: "Starter Plan",
            price: 400,
            description: "Essential web presence with partially custom design and core CMS features.",
            features: [
                "Partially Custom Design – only 1 iteration",
                "Responsive Site (Desktop, Tablet, Mobile)",
                "WordPress / Joomla! / C5 / Drupal",
                "Back-End User Management",
                "GUI Admin Panel",
                "Search Engine Friendly Structure",
                "Conversion Forms – up to 3",
                "Content Migration",
                "Web Hosting",
                "Hosted Emails – 25",
                "Web maintenance work – 5 hours/month"
            ]
        },
        {
            name: "Accelerator Plan",
            price: 700,
            description: "Perfect for growing businesses needing advanced customization and more resources.",
            features: [
                "Fully Custom Design – up to 3 iterations",
                "Responsive Site (All Devices)",
                "WordPress / Shopify / Magento",
                "Advanced User Management",
                "GUI Admin Panel",
                "Advanced SEO Optimization",
                "Conversion Forms – up to 10",
                "Content Migration & Setup",
                "Premium Web Hosting",
                "Hosted Emails – 50",
                "Web maintenance work – 10 hours/month"
            ]
        },
        {
            name: "Advanced Plan",
            price: 1000,
            description: "Comprehensive solution for enterprises requiring unlimited scale and custom tech stacks.",
            features: [
                "Premium Custom Design – Unlimited iterations",
                "Responsive Site (All Devices)",
                "Custom Stack (MERN/Next.js) or CMS",
                "Enterprise User Management",
                "GUI Admin Panel",
                "Premium SEO + Analytics",
                "Conversion Forms – Unlimited",
                "Content Migration & Setup",
                "Dedicated Web Hosting",
                "Hosted Emails – Unlimited",
                "Web maintenance work – 20 hours/month"
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

                <button className="pricing-modal-close" onClick={onClose}>&times;</button>
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

export default WebDevelopment;
