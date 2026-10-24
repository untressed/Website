import React, { useState } from 'react';
import '../App.css';

const FAQ = () => {
    const [activeId, setActiveId] = useState(null);

    const toggleFAQ = (id) => {
        setActiveId(activeId === id ? null : id);
    };

    const faqs = [
        {
            id: 1,
            number: "1.",
            question: "What services do you offer?",
            answer: "We offer a comprehensive range of digital services including web development, mobile app creation, UI/UX design, SEO optimization, and digital marketing strategies tailored to grow your business."
        },
        {
            id: 2,
            number: "2.",
            question: "What industries do you work with?",
            answer: "We have experience across various sectors including Retail, Technology, Healthcare, Finance, Education, Hospitality, and more. Our adaptable process allows us to serve any industry effectively."
        },
        {
            id: 3,
            number: "3.",
            question: "How long does it take to build a website?",
            answer: "Timeline varies based on complexity. A standard business website typically takes 4-6 weeks, while more complex platforms or e-commerce sites may take 8-12 weeks or more."
        },
        {
            id: 4,
            number: "4.",
            question: "Can you develop both Android and iOS apps?",
            answer: "Yes, we specialize in cross-platform development using technologies like React Native and Flutter, as well as native development for both Android and iOS to ensure optimal performance."
        }
    ];

    return (
        <div className="faq-section">
            <div className="faq-header">
                <span className="section-subtitle">FREQUENTLY ASKED QUESTIONS</span>
                <h2>COMMON QUESTIONS & <br /> CLEAR ANSWERS</h2>
                <p className="section-description">
                    Everything you need to know about partnering with UNTRESSED, our engineering process, and project deliverables.
                </p>
            </div>

            <div className="faq-tube-container">
                {faqs.map((faq) => (
                    <div
                        key={faq.id}
                        className={`faq-tube-item ${activeId === faq.id ? 'active' : ''}`}
                        onClick={() => toggleFAQ(faq.id)}
                    >
                        <div className="faq-tube-header">
                            <div className="faq-tube-left">
                                <span className="faq-tube-num-badge">0{faq.id}</span>
                                <span className="faq-tube-question">{faq.question}</span>
                            </div>
                            <div className="faq-tube-toggle">
                                <svg
                                    className={`chevron-icon ${activeId === faq.id ? 'rotate' : ''}`}
                                    width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                        <div className={`faq-tube-answer ${activeId === faq.id ? 'show' : ''}`}>
                            <div className="faq-tube-answer-inner">
                                <p>{faq.answer}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;
