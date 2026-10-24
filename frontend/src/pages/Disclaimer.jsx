import React from 'react';
import '../App.css';

const Disclaimer = () => {
    return (
        <div className="legal-page-container">
            <div className="legal-header">
                <h1 className="legal-title">Disclaimer</h1>
                <p className="legal-date">Last updated: January 2025</p>
                <hr className="legal-divider" />
            </div>

            <div className="legal-content">
                <section className="legal-section">
                    <h2 className="legal-section-title">1. Website Disclaimer</h2>
                    <p className="legal-text">
                        The information provided by Prit's IT Solutions ("we," "us," or "our") on our website is for general informational purposes only. All information on the Site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site.
                    </p>
                </section>

                <section className="legal-section">
                    <h2 className="legal-section-title">2. External Links Disclaimer</h2>
                    <p className="legal-text">
                        The Site may contain (or you may be sent through the Site) links to other websites or content belonging to or originating from third parties or links to websites and features in banners or other advertising. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us.
                    </p>
                </section>

                <section className="legal-section">
                    <h2 className="legal-section-title">3. Professional Disclaimer</h2>
                    <p className="legal-text">
                        The Site cannot and does not contain legal, medical, or financial advice. The information is provided for general informational and educational purposes only and is not a substitute for professional advice. Accordingly, before taking any actions based upon such information, we encourage you to consult with the appropriate professionals.
                    </p>
                </section>

                <section className="legal-section">
                    <h2 className="legal-section-title">4. Limitation of Liability</h2>
                    <p className="legal-text">
                        Under no circumstance shall we have any liability to you for any loss or damage of any kind incurred as a result of the use of the site or reliance on any information provided on the site. Your use of the site and your reliance on any information on the site is solely at your own risk.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default Disclaimer;
