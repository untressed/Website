import React from 'react'

function OurStory() {
    return (
        <div className="container mt-5 pt-5 pb-5">
            <div className="text-center mb-5">
                <h6 className="text-uppercase fw-bold mb-3 tracking-wide" style={{ color: '#315C46' }}>OUR JOURNEY</h6>
                <h2 className="display-5 fw-bold text-dark" style={{ color: '#20382C' }}>The Story Behind UNTRESSED</h2>
            </div>
            <div className="story-content">
                <div className="row g-5">
                    <div className="col-lg-6">
                        <div className="story-text">
                            <p className="lead mb-4">
                                Founded with a vision to transform how businesses leverage technology,
                                UNTRESSED has grown from a small startup to a trusted partner
                                for organizations worldwide.
                            </p>
                            <p className="mb-4">
                                Our journey began with a simple belief: technology should empower,
                                not complicate. This philosophy drives everything we do, from the
                                solutions we create to the relationships we build.
                            </p>
                            <p>
                                Today, we're proud to serve 100+ teams across diverse industries,
                                helping them navigate digital transformation with confidence and achieve
                                measurable results.
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="story-highlights">
                            <div className="row g-4">
                                <div className="col-6">
                                    <div className="highlight-item">
                                        <div className="highlight-number">100+</div>
                                        <div className="highlight-label">Satisfied Clients</div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="highlight-item">
                                        <div className="highlight-number">500+</div>
                                        <div className="highlight-label">Projects Delivered</div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="highlight-item">
                                        <div className="highlight-number">50+</div>
                                        <div className="highlight-label">Team Members</div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="highlight-item">
                                        <div className="highlight-number">24/7</div>
                                        <div className="highlight-label">Support Available</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OurStory
