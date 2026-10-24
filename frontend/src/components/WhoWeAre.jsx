import React from 'react'
import teamOffice from '../assets/about_services.webp'
import codeSetup from '../assets/about_company.webp'

function WhoWeAre() {
    return (
        <section className="py-5 section-who-we-are">
            <div className="container py-5">
                <div className="row g-5">
                    {/* Left Column */}
                    <div className="col-lg-7">
                        <div className="mb-5">
                            <h6 className="text-uppercase fw-bold mb-3 tracking-wide" style={{ color: '#315C46' }}>
                                Who We Are
                            </h6>
                            <h2 className="display-4 fw-normal text-dark mb-4">
                                UNTRESSED
                            </h2>
                            <p className="lead fs-5 lh-base" style={{ color: '#3f4e44' }}>
                                With years of industry experience and a client-first approach,
                                we combine innovation, technology, and human insight to
                                build brands that people trust.
                            </p>
                        </div>
                        <div className="image-wrapper rounded-4 overflow-hidden shadow-sm">
                            <img
                                src={teamOffice}
                                alt="Office Team"
                                className="img-fluid w-100 object-fit-cover"
                                loading="lazy"
                                width="650"
                                height="400"
                                style={{ height: '400px' }}
                            />
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="col-lg-5 d-flex flex-column align-items-center justify-content-between">
                        {/* Arrow Circle */}
                        <div className="arrow-circle mb-5 mt-lg-5">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="64"
                                height="64"
                                fill="currentColor"
                                className="bi bi-arrow-right gradient-arrow"
                                viewBox="0 0 16 16"
                            >
                                <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                            </svg>
                        </div>

                        {/* Small Image */}
                        <div className="image-wrapper rounded-4 overflow-hidden shadow-sm mt-auto w-100">
                            <img
                                src={codeSetup}
                                alt="Code Setup"
                                className="img-fluid w-100 object-fit-cover"
                                loading="lazy"
                                width="450"
                                height="300"
                                style={{ height: '300px' }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default WhoWeAre
