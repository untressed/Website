import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useContactFormModal } from '../context/ContactFormContext';
import '../App.css';

const PerformanceMarketing = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const { openContactModal } = useContactFormModal();
    const serviceName = "Performance Marketing Services";

    if (!isOpen) return null;

    const plans = [
        {
            name: "Starter Plan",
            price: 799,
            description: "Essential performance marketing for growing businesses.",
            features: [
                {
                    category: "General",
                    items: [
                        "40 Keywords",
                        "40 Backlinks (per month)",
                        "5 Landing Pages Optimization",
                        "Website SEO Audit & Fixes"
                    ]
                },
                {
                    category: "Initial Analysis & Tech SEO",
                    items: [
                        "Pre-Optimization Website Analysis",
                        "Competitor Analysis & Strategy",
                        "Keyword Research & LSI Optimization",
                        "Baseline Ranking Check",
                        "Duplicate Content Check & Fix",
                        "Google Penalty Check & Recovery",
                        "Backlink Toxicity Analysis (if required)",
                        "XML Sitemap & Robots.txt Optimization",
                        "Hreflang & Multilingual SEO Setup",
                        "Website Security & HTTPS Optimization",
                        "Mobile-First & Core Web Vitals Optimization",
                        "Schema Markup for Rich Snippets"
                    ]
                },
                {
                    category: "Content & AI SEO",
                    items: [
                        "Google Discover & Zero-Click Optimization",
                        "Content Optimization & AI SEO",
                        "AI-Powered Deep Research & Reasoning",
                        "Google E.E.A.T Compliance",
                        "Search Intent & Content Funnel Strategy",
                        "Product/Service Research",
                        "Data-Driven Optimization",
                        "Content Siloing & Topic Clustering",
                        "NLP & Semantic SEO Optimization"
                    ]
                },
                {
                    category: "Local & Voice SEO",
                    items: [
                        "Google Business Profile Optimization",
                        "Localized Keyword Optimization",
                        "Voice Search Optimization",
                        "AI-Based Local SEO Enhancements",
                        "AI Search Optimization (LLM) (Basic)"
                    ]
                },
                {
                    category: "On-Page Optimization",
                    items: [
                        "Canonical Tag Implementation",
                        "Title & Meta Tags Optimization",
                        "Heading & Image Alt Tags Optimization",
                        "Content Optimization & NLP SEO",
                        "URL Restructuring & SEO-friendly Setup",
                        "Internal Linking Strategy",
                        "404 Page Customization & Fixing",
                        "Website Speed Optimization",
                        "Google Indexed Pages Check & Fix",
                        "Google Search Console & Analytics Setup",
                        "Structured Data (FAQ, Reviews, Products, etc.)"
                    ]
                },
                {
                    category: "Off-Page Activities",
                    items: [
                        "Search Engine Submission – Manual: 1",
                        "Article Writing: 1",
                        "Article Submissions: 1",
                        "Article Marketing: 5",
                        "Directory Submissions: 3",
                        "Blog Writing: 1",
                        "Blog Posting: 1",
                        "Blog Marketing: 5",
                        "Third Party Blog Pinging: 5",
                        "Image Sharing: 2",
                        "Social Bookmarking: 10",
                        "Guest Posting (High Authority Sites): 1",
                        "Infographic Submissions: 1",
                        "Web 2.0 Submissions: 1",
                        "Classified Ad Submissions: 3",
                        "Local Citation Building: 5",
                        "Quora / Forum Posting: 2"
                    ]
                },
                {
                    category: "SMO & Automation",
                    items: [
                        "Monthly Posting & Sharing: 4"
                    ]
                },
                {
                    category: "Reporting",
                    items: [
                        "Monthly SEO Report",
                        "Competitor SEO & Keyword Tracking Report",
                        "Conversion Tracking Report",
                        "Monthly Off-Page & Link-Building Report",
                        "Ad Performance & Retargeting ROI Report"
                    ]
                }
            ]
        },
        {
            name: "Accelerator Plan",
            price: 1299,
            description: "Advanced performance marketing for scaling businesses.",
            features: [
                {
                    category: "General",
                    items: [
                        "80 Keywords",
                        "80 Backlinks (per month)",
                        "10 Landing Pages Optimization",
                        "Deep SEO Audit & Fixes"
                    ]
                },
                {
                    category: "Initial Analysis & Tech SEO",
                    items: [
                        "Advanced Pre-Optimization Analysis",
                        "Deep Competitor Analysis & Strategy",
                        "Advanced Keyword Research & LSI",
                        "Baseline Ranking Check",
                        "Duplicate Content Check & Fix",
                        "Google Penalty Check & Recovery",
                        "Advanced Backlink Toxicity Analysis",
                        "XML Sitemap & Robots.txt Optimization",
                        "Hreflang & Multilingual SEO Setup",
                        "Website Security & HTTPS Optimization",
                        "Mobile-First & Core Web Vitals Optimization",
                        "Schema Markup for Rich Snippets"
                    ]
                },
                {
                    category: "Content & AI SEO",
                    items: [
                        "Google Discover & Zero-Click Optimization",
                        "Advanced Content Optimization",
                        "AI-Powered Deep Research & Reasoning",
                        "Google E.E.A.T Compliance",
                        "Advanced Search Intent Strategy",
                        "Product/Service Research",
                        "Data-Driven Optimization",
                        "Content Siloing & Topic Clustering",
                        "NLP & Semantic SEO Optimization"
                    ]
                },
                {
                    category: "Local & Voice SEO",
                    items: [
                        "Advanced GBP Optimization",
                        "Localized Keyword Optimization",
                        "Voice Search Optimization",
                        "AI-Based Local SEO Enhancements",
                        "AI Search Optimization (LLM) (Standard)"
                    ]
                },
                {
                    category: "On-Page Optimization",
                    items: [
                        "Canonical, Title, Meta, Heading Tags",
                        "Image Alt Tags & URL Restructuring",
                        "Internal Linking Strategy",
                        "404 Page Fixing & Speed Optimization",
                        "Google Indexed Pages Check & Fix",
                        "GSC & Analytics Setup",
                        "Structured Data Implementation"
                    ]
                },
                {
                    category: "Off-Page Activities",
                    items: [
                        "Search Engine Submission – Manual: 1",
                        "Article Writing: 2",
                        "Article Submissions: 2",
                        "Article Marketing: 10",
                        "Directory Submissions: 10",
                        "Blog Writing: 2",
                        "Blog Posting: 2",
                        "Blog Marketing: 10",
                        "Third Party Blog Pinging: 10",
                        "Image Sharing: 5",
                        "Social Bookmarking: 20",
                        "Guest Posting (High Authority Sites): 2",
                        "Infographic Submissions: 2",
                        "Web 2.0 Submissions: 3",
                        "Classified Ad Submissions: 10",
                        "Local Citation Building: 10",
                        "Quora / Forum Posting: 5"
                    ]
                },
                {
                    category: "SMO & Automation",
                    items: [
                        "Monthly Posting & Sharing: 8"
                    ]
                },
                {
                    category: "Reporting",
                    items: [
                        "Bi-Weekly SEO Report",
                        "Competitor SEO & Keyword Tracking Report",
                        "Conversion Tracking Report",
                        "Monthly Off-Page & Link-Building Report",
                        "Ad Performance & Retargeting ROI Report"
                    ]
                }
            ]
        },
        {
            name: "Advanced Plan",
            price: 1899,
            description: "Enterprise-grade performance marketing for market domination.",
            features: [
                {
                    category: "General",
                    items: [
                        "150 Keywords",
                        "150 Backlinks (per month)",
                        "20 Landing Pages Optimization",
                        "Enterprise SEO Audit & Fixes"
                    ]
                },
                {
                    category: "Initial Analysis & Tech SEO",
                    items: [
                        "Comprehensive Pre-Optimization Analysis",
                        "Enterprise Competitor Analysis & Strategy",
                        "Comprehensive Keyword Research",
                        "Baseline Ranking Check",
                        "Duplicate Content Check & Fix",
                        "Google Penalty Check & Recovery",
                        "Backlink Toxicity Analysis",
                        "XML Sitemap & Robots.txt Optimization",
                        "Hreflang & Multilingual SEO Setup",
                        "Website Security & HTTPS Optimization",
                        "Mobile-First & Core Web Vitals Optimization",
                        "Schema Markup for Rich Snippets"
                    ]
                },
                {
                    category: "Content & AI SEO",
                    items: [
                        "Google Discover & Zero-Click Optimization",
                        "Enterprise Content Optimization",
                        "AI-Powered Deep Research & Reasoning",
                        "Google E.E.A.T Compliance",
                        "Full Funnel Content Strategy",
                        "Product/Service Research",
                        "Data-Driven Optimization",
                        "Content Siloing & Topic Clustering",
                        "NLP & Semantic SEO Optimization"
                    ]
                },
                {
                    category: "Local & Voice SEO",
                    items: [
                        "Enterprise GBP Optimization",
                        "Localized Keyword Optimization",
                        "Voice Search Optimization",
                        "AI-Based Local SEO Enhancements",
                        "AI Search Optimization (LLM) (Premium)"
                    ]
                },
                {
                    category: "On-Page Optimization",
                    items: [
                        "Canonical, Title, Meta, Heading Tags",
                        "Image Alt Tags & URL Restructuring",
                        "Internal Linking Strategy",
                        "404 Page Fixing & Speed Optimization",
                        "Google Indexed Pages Check & Fix",
                        "GSC & Analytics Setup",
                        "Structured Data Implementation"
                    ]
                },
                {
                    category: "Off-Page Activities",
                    items: [
                        "Search Engine Submission – Manual: 1",
                        "Article Writing: 4",
                        "Article Submissions: 4",
                        "Article Marketing: 20",
                        "Directory Submissions: 20",
                        "Blog Writing: 4",
                        "Blog Posting: 4",
                        "Blog Marketing: 20",
                        "Third Party Blog Pinging: 20",
                        "Image Sharing: 10",
                        "Social Bookmarking: 40",
                        "Guest Posting (High Authority Sites): 5",
                        "Infographic Submissions: 5",
                        "Web 2.0 Submissions: 10",
                        "Classified Ad Submissions: 20",
                        "Local Citation Building: 20",
                        "Quora / Forum Posting: 10"
                    ]
                },
                {
                    category: "SMO & Automation",
                    items: [
                        "Monthly Posting & Sharing: 12"
                    ]
                },
                {
                    category: "Reporting",
                    items: [
                        "Weekly SEO Report",
                        "Competitor SEO & Keyword Tracking Report",
                        "Conversion Tracking Report",
                        "Monthly Off-Page & Link-Building Report",
                        "Ad Performance & Retargeting ROI Report"
                    ]
                }
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
                tags: plan.features.slice(0, 3).map(feature => feature.category),
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
                                            {plan.features.map((section, idx) => (
                                                <React.Fragment key={idx}>
                                                    <li className="fw-bold mt-3 mb-2">{section.category}</li>
                                                    {section.items.map((item, i) => (
                                                        <li key={i}>
                                                            <i className="bi bi-check2 text-primary me-2"></i>
                                                            {item}
                                                        </li>
                                                    ))}
                                                </React.Fragment>
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

export default PerformanceMarketing;
