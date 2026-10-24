import React from 'react';
import '../App.css';
import ownerPequire from '../assets/owner-pequire.webp';
import ownerVed from '../assets/owner-ved.webp';
import ownerClover from '../assets/owner-clover.webp';
import ownerMykamato from '../assets/owner-mykamato.webp';

const Testimonials = () => {
    const testimonials = [
        {
            id: 1,
            company: "Pequire",
            clientUrl: "pequire.com",
            scope: "Website, Mobile App & Full System",
            stat: "Scalable Full-Stack Ecosystem",
            quote: "UNTRESSED built our complete digital infrastructure — from our responsive web platform to cross-platform mobile apps and secure microservices. The architecture, speed, and clean execution gave our platform instant traction.",
            author: "Arjun Mehta",
            role: "Founder & CEO",
            image: ownerPequire,
            color: "#315C46"
        },
        {
            id: 2,
            company: "Ved Enterprises",
            clientUrl: "ved.enterprises",
            scope: "Wholesale Textile & Yarn Platform",
            stat: "10x Global Inquiries",
            quote: "Our new website transformed how international and domestic buyers discover our textile collections. The catalog performance and elegant presentation elevated our trade relationships and inquiries tenfold.",
            author: "Rajesh Sharma",
            role: "Managing Director",
            image: ownerVed,
            color: "#D97757"
        },
        {
            id: 3,
            company: "Clover Lifestyle Ltd",
            clientUrl: "cloverlifestyle.com",
            scope: "AI Video Production",
            stat: "4.8x Campaign Engagement",
            quote: "The AI video showcases UNTRESSED produced for our luxury collections were breathtaking. The cinematic lighting, hyper-realistic detail, and storytelling drove unprecedented engagement across all our launch campaigns.",
            author: "Elena Vance",
            role: "Creative Director",
            image: ownerClover,
            color: "#315C46"
        },
        {
            id: 4,
            company: "MyKamato",
            clientUrl: "mykamato.com",
            scope: "High-Converting Website",
            stat: "+140% Digital Orders",
            quote: "UNTRESSED designed and launched our flagship web presence with an energetic, mouthwatering aesthetic and smooth interactive menus. Customers constantly praise how intuitive and fast our online experience is.",
            author: "Kabir Kapoor",
            role: "Founder & Owner",
            image: ownerMykamato,
            color: "#C0A98F"
        }
    ];

    return (
        <div className="testimonials-section">
            <div className="testimonials-header">
                <span className="section-subtitle">CLIENT SUCCESS STORIES</span>
                <h2>WORDS FROM THE <br /> FOUNDERS WE EMPOWER</h2>
                <p className="section-description">
                    Hear directly from business owners whose digital platforms and AI solutions we brought to life.
                </p>
            </div>

            <div className="testimonials-grid">
                {testimonials.map((item, index) => (
                    <div key={item.id} className={`testimonial-card card-${index + 1}`}>
                        <div className="d-flex align-items-center justify-content-between w-100 mb-2">
                            <div className="testimonial-rating">★★★★★</div>
                            <span className="testimonial-verified-badge">✓ Verified Client</span>
                        </div>
                        <h3 className="stat-text">{item.stat}</h3>
                        <p className="quote-text">"{item.quote}"</p>

                        <div className="author-container">
                            <div className="author-avatar" style={{ border: `2px solid ${item.color}` }}>
                                {item.image && <img src={item.image} alt={item.author} className="author-image" />}
                            </div>
                            <div className="author-info">
                                <span className="author-name">{item.author}</span>
                                <span className="author-role">{item.role}</span>
                                <a
                                    href={`https://${item.clientUrl}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="author-company-link"
                                >
                                    {item.company}
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Testimonials;
