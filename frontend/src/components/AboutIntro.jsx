import React from 'react'
import teamHero from '../assets/about-team-hero.jpg'

function AboutIntro() {
    return (
        <section className="about-hero">
            <div className="container">
                <div className="row align-items-center g-5">
                    {/* Left Column - Text Content */}
                    <div className="col-lg-6">
                        <div className="about-content pe-lg-4">
                            <div className="about-pill-tag mb-3">
                                <span className="pulse-dot"></span>
                                WHO WE ARE
                            </div>
                            <h1 className="about-title mb-4">
                                UNTRESSED
                            </h1>
                            <p className="about-description mb-4">
                                From digital services to business support operations,
                                we provide end-to-end solutions designed to simplify
                                your workflow, elevate your brand, and accelerate
                                growth.
                            </p>

                            {/* Core Pillars */}
                            <div className="about-pillars mb-4">
                                <div className="pillar-item">
                                    <span className="pillar-check">✓</span> Tech Innovation
                                </div>
                                <div className="pillar-item">
                                    <span className="pillar-check">✓</span> Scalable Architecture
                                </div>
                                <div className="pillar-item">
                                    <span className="pillar-check">✓</span> Client-Centric
                                </div>
                            </div>

                            <div className="trust-badge">
                                <div className="trust-avatars">
                                    <div className="avatar-circle"></div>
                                    <div className="avatar-circle"></div>
                                    <div className="avatar-circle"></div>
                                </div>
                                <span className="trust-text">Trusted by 100+ Teams Worldwide</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Framed Hero Image with Floating Badges */}
                    <div className="col-lg-6">
                        <div className="about-hero-image-wrapper">
                            <div className="about-hero-card">
                                <img
                                    src={teamHero}
                                    alt="UNTRESSED Team Collaboration"
                                    className="about-hero-img"
                                    loading="eager"
                                />
                            </div>

                            {/* Floating Stat Card 1 - Top Left */}
                            <div className="about-floating-card floating-card-top">
                                <div className="floating-card-icon">🚀</div>
                                <div>
                                    <div className="floating-card-number">150+</div>
                                    <div className="floating-card-label">Projects Delivered</div>
                                </div>
                            </div>

                            {/* Floating Stat Card 2 - Bottom Right */}
                            <div className="about-floating-card floating-card-bottom">
                                <div className="floating-card-icon">✨</div>
                                <div>
                                    <div className="floating-card-number">99.8%</div>
                                    <div className="floating-card-label">Client Satisfaction</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutIntro

