import React from 'react';
import '../App.css';

const TermsConditions = () => {
    return (
        <div className="legal-page-container">
            <div className="legal-header">
                <h1 className="legal-title">Terms & Conditions</h1>
                <p className="legal-date">Last updated: January 2025</p>
                <hr className="legal-divider" />
            </div>

            <div className="legal-content">
                <section className="legal-section">
                    <h2 className="legal-section-title">1. Agreement to Terms</h2>
                    <p className="legal-text">
                        These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and Prit's IT Solutions ("we," "us" or "our"), concerning your access to and use of our website and services.
                    </p>
                </section>

                <section className="legal-section">
                    <h2 className="legal-section-title">2. Intellectual Property Rights</h2>
                    <p className="legal-text">
                        Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the “Content”) and the trademarks, service marks, and logos contained therein (the “Marks”) are owned or controlled by us or licensed to us.
                    </p>
                </section>

                <section className="legal-section">
                    <h2 className="legal-section-title">3. User Representations</h2>
                    <p className="legal-text">
                        By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary.
                    </p>
                </section>

                <section className="legal-section">
                    <h2 className="legal-section-title">4. Prohibited Activities</h2>
                    <p className="legal-text">
                        You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
                    </p>
                </section>

                <section className="legal-section">
                    <h2 className="legal-section-title">5. Limitation of Liability</h2>
                    <p className="legal-text">
                        In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the site.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default TermsConditions;
