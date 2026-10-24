import React from 'react';
import '../App.css';

const RefundPolicy = () => {
    return (
        <div className="legal-page-container">
            <div className="legal-header">
                <h1 className="legal-title">Refund Policy</h1>
                <p className="legal-date">Last updated: January 2025</p>
                <hr className="legal-divider" />
            </div>

            <div className="legal-content">
                <section className="legal-section">
                    <h2 className="legal-section-title">1. General Policy</h2>
                    <p className="legal-text">
                        At Prit's IT Solutions, we strive to ensure our clients are satisfied with our services. However, due to the nature of digital services and custom development work, we have specific guidelines regarding refunds.
                    </p>
                </section>

                <section className="legal-section">
                    <h2 className="legal-section-title">2. Web & App Development Services</h2>
                    <p className="legal-text">
                        Refunds are generally not provided for work that has already been completed and approved. If you are unsatisfied with the progress:
                    </p>
                    <ul className="legal-list">
                        <li className="legal-list-item">
                            <strong className="fw-bold text-dark">Initial Deposit:</strong> The initial deposit is non-refundable once the project planning and design phase has commenced.
                        </li>
                        <li className="legal-list-item">
                            <strong className="fw-bold text-dark">Milestone Payments:</strong> Payments made for completed and approved milestones are non-refundable.
                        </li>
                        <li className="legal-list-item">
                            <strong className="fw-bold text-dark">Cancellations:</strong> You may cancel the project at any time. You will be billed for all work completed up to the date of cancellation.
                        </li>
                    </ul>
                </section>

                <section className="legal-section">
                    <h2 className="legal-section-title">3. Digital Marketing & SEO Services</h2>
                    <p className="legal-text">
                        Digital marketing services (SEO, PPC, SMO) are billed on a monthly basis. No refunds will be issued for the current billing cycle once payment has been processed. You may cancel services for the upcoming month by providing 30 days' written notice.
                    </p>
                </section>

                <section className="legal-section">
                    <h2 className="legal-section-title">4. Contact Us for Disputes</h2>
                    <p className="legal-text">
                        If you believe there has been an error in billing or if you have a dispute regarding the quality of work, please contact our billing department immediately at <a href="mailto:support@untressed.com" className="text-primary fw-bold text-decoration-none">support@untressed.com</a>. We will work with you to resolve the issue amicably.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default RefundPolicy;
