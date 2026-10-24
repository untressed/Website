import React from 'react'
import teamCollage from '../assets/about-team-collage.webp'

function AboutIntro() {
    return (
        <section className="about-hero">
            <div className="container">
                <div className="row align-items-center g-5">
                    {/* Left Column - Text Content */}
                    <div className="col-lg-6">
                        <div className="about-content">
                            <h6 className="about-label text-uppercase mb-3">WHO WE ARE</h6>
                            <h1 className="about-title mb-4">
                                UNTRESSED
                            </h1>
                            <p className="about-description mb-4">
                                From digital services to business support operations,
                                we provide end-to-end solutions designed to simplify
                                your workflow, elevate your brand, and accelerate
                                growth.
                            </p>
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

                    {/* Right Column - Team Image Collage */}
                    <div className="col-lg-6">
                        <div className="team-collage">
                            <img
                                src={teamCollage}
                                alt="UNTRESSED Team"
                                className="team-collage-image"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutIntro
