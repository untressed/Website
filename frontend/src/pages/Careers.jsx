import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import careerHero from '../assets/career-hero.webp';
import careerWoman from '../assets/career-woman.webp';
import JobOpportunities from '../components/JobOpportunities';

const Careers = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="career-page" style={{ paddingTop: '110px', overflowX: 'hidden' }}>

            {/* Hero Section */}
            <section className="career-hero pb-0 pt-2">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 mb-5 mb-lg-0">
                            <div className="pe-lg-4">
                                <span className="text-secondary text-uppercase fw-medium mb-2 d-block small">We are</span>
                                <h1 className="display-5 fw-bold mb-4" style={{ color: '#20382C', letterSpacing: '-0.5px', fontSize: '2.5rem' }}>
                                    Building solutions for <br />
                                    Business throughout <br />
                                    the world.
                                </h1>
                                <p className="lead text-secondary mb-4" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                                    We don't just provide services; we solve complex challenges for the world's most ambitious brands.
                                    Join a team where your craft is celebrated and your growth is our priority.
                                </p>
                                <div className="d-flex gap-3">
                                    <button
                                        className="btn btn-primary btn-lg rounded-pill px-4 shadow-sm"
                                        style={{ backgroundColor: '#315C46', borderColor: '#315C46' }}
                                        onClick={() => {
                                            const element = document.getElementById('job-opportunities');
                                            if (element) {
                                                element.scrollIntoView({ behavior: 'smooth' });
                                            }
                                        }}
                                    >
                                        View Opportunities
                                    </button>

                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="d-flex justify-content-center align-items-center">
                                {/* Layered Container */}
                                <div style={{
                                    position: 'relative',
                                    width: '100%',
                                    maxWidth: '400px',
                                    height: '460px' // Fixed height container for layering
                                }}>
                                    {/* 1. Background Layer (Clipped & Scaled to remove black corners) */}
                                    <div style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '92%', // Slightly shorter than container to allow head room
                                        borderRadius: '40px 40px 140px 40px',
                                        overflow: 'hidden',
                                        zIndex: 1
                                    }}>
                                        <img
                                            src={careerHero}
                                            alt="Office background"
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                transform: 'scale(1.08)', // Keep the scaling to hide black corners
                                                transformOrigin: 'center center'
                                            }}
                                        />
                                    </div>

                                    {/* 2. Foreground Layer (Woman Overlay) */}
                                    <img
                                        src={careerWoman}
                                        alt="Join our team at UNTRESSED"
                                        style={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: '42%', // Shifted left from 50%
                                            transform: 'translateX(-50%)',
                                            height: '100%',
                                            width: 'auto',
                                            objectFit: 'contain',
                                            zIndex: 2,
                                            filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.15))'
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Job Opportunities Section */}
            <div id="job-opportunities" style={{ scrollMarginTop: '100px' }}>
                <JobOpportunities />
            </div>

        </div>
    );
};

export default Careers;
