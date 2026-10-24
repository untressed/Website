import React, { useState } from 'react'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaMapMarkerAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import logo from '../assets/UNTRESSED-logo.webp'
import wordmark from '../assets/UNTRESSED-wordmark.webp'
import { useContactFormModal } from '../context/ContactFormContext'

function Footer() {
    const { openContactModal } = useContactFormModal();

    const offices = [
        { city: "Headquarters", country: "India", address: "Sector 62, Noida, Uttar Pradesh - 201301" },
        { city: "Kanpur Office", country: "India", address: "Kanpur, Uttar Pradesh", mapLink: "https://www.google.com/maps/place/UNTRESSED/@26.4815756,80.3171013,17z/data=!3m1!4b1!4m6!3m5!1s0x399c390b75156bf3:0xb737b30d3a02e59b!8m2!3d26.4815756!4d80.3171013!16s%2Fg%2F11mt1dwwx8?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoKLDEwMDc5MjA2OUgBUAM%3D" },
        { city: "USA Office", country: "United States", address: "Fort Worth, Texas" }
    ];

    return (
        <footer id="footer" className="footer-section pt-5">
            <div className="container pb-5">
                <div className="row g-4 g-xl-5 text-center text-md-start align-items-start">
                    {/* Col 1: Brand & Office Location Cards */}
                    <div className="col-lg-3 col-md-6">
                        <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-2 mb-3">
                            <img src={logo} alt="UNTRESSED Logo" width="36" height="36" style={{ height: '36px', width: 'auto' }} />
                            <img src={wordmark} alt="UNTRESSED" width="112" height="20" style={{ height: '20px', width: 'auto' }} />
                        </div>

                        <div className="d-flex flex-column gap-2">
                            {offices.map((office, index) => (
                                <div
                                    key={index}
                                    className="location-card"
                                    style={{
                                        cursor: office.mapLink ? 'pointer' : 'default',
                                    }}
                                    onClick={() => office.mapLink && window.open(office.mapLink, '_blank')}
                                >
                                    <div className="d-flex align-items-start gap-2">
                                        <div className="location-icon-wrapper mt-1">
                                            <FaMapMarkerAlt className="text-white" size={13} />
                                        </div>
                                        <div>
                                            <div className="d-flex align-items-center gap-2 mb-1 flex-wrap">
                                                <h6 className="location-city mb-0" style={{ fontSize: '0.9rem' }}>{office.city}</h6>
                                                <span className="location-country-badge" style={{ fontSize: '0.65rem' }}>{office.country}</span>
                                            </div>
                                            <p className="mb-0 location-address" style={{ fontSize: '0.78rem' }}>{office.address}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Col 2: Services Offered (2 sub-columns) */}
                    <div className="col-lg-4 col-md-6 text-start">
                        <h6 className="footer-col-title mb-3">SERVICES OFFERED</h6>
                        <div className="row g-2">
                            <div className="col-6">
                                <ul className="list-unstyled d-flex flex-column gap-1 mb-0">
                                    <li><span className="footer-service-item">SaaS Products</span></li>
                                    <li><span className="footer-service-item">MVP Development</span></li>
                                    <li><span className="footer-service-item">Custom Software</span></li>
                                    <li><span className="footer-service-item">Inventory & Billing</span></li>
                                    <li><span className="footer-service-item">Web Development</span></li>
                                    <li><span className="footer-service-item">UI/UX Development</span></li>
                                    <li><span className="footer-service-item">App Development</span></li>
                                    <li><span className="footer-service-item">SEO</span></li>
                                </ul>
                            </div>
                            <div className="col-6">
                                <ul className="list-unstyled d-flex flex-column gap-1 mb-0">
                                    <li><span className="footer-service-item">CRM Systems</span></li>
                                    <li><span className="footer-service-item">Chatbot Setup</span></li>
                                    <li><span className="footer-service-item">WhatsApp Automation</span></li>
                                    <li><span className="footer-service-item">Funnel Building</span></li>
                                    <li><span className="footer-service-item">Performance Marketing</span></li>
                                    <li><span className="footer-service-item">PPC & Google Ads</span></li>
                                    <li><span className="footer-service-item">LinkedIn Marketing</span></li>
                                    <li><span className="footer-service-item">Branding Services</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Col 3: Navigation & Policies */}
                    <div className="col-lg-2 col-md-6 text-start">
                        <div className="mb-4">
                            <h6 className="footer-col-title">NAVIGATION</h6>
                            <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
                                <li><a href="#" className="footer-nav-link">Home</a></li>
                                <li><a href="#services" className="footer-nav-link">Services</a></li>
                                <li><Link to="/about" className="footer-nav-link">About Us</Link></li>
                                <li><Link to="/careers" className="footer-nav-link">Careers</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h6 className="footer-col-title">POLICIES</h6>
                            <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
                                <li><Link to="/privacy-policy" className="footer-nav-link">Privacy & Policy</Link></li>
                                <li><Link to="/terms-conditions" className="footer-nav-link">Terms & Conditions</Link></li>
                                <li><Link to="/refund-policy" className="footer-nav-link">Refund Policy</Link></li>
                                <li><Link to="/disclaimer" className="footer-nav-link">Disclaimer</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* Col 4: Project CTA & Contact Box */}
                    <div className="col-lg-3 col-md-6 d-flex flex-column align-items-center align-items-md-start text-center text-md-start">
                        <div className="footer-cta-card p-4 rounded-4 w-100">
                            <span className="footer-cta-badge mb-1 d-inline-block">START A PROJECT</span>
                            <h3 className="footer-headline-small mb-2">
                                LET’S START <span className="text-forest">YOUR PROJECT</span>
                            </h3>
                            <div className="d-flex flex-column gap-1 mb-3">
                                <a href="mailto:support@untressed.com" className="footer-contact-link small">support@untressed.com</a>
                                <a href="tel:+918795376727" className="footer-contact-link small">+91 8795376727</a>
                            </div>

                            <div className="mb-3">
                                <div className="d-flex gap-2 justify-content-center justify-content-md-start">
                                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon facebook" title="Facebook" aria-label="UNTRESSED on Facebook"><FaFacebookF /></a>
                                    <a href="https://www.instagram.com/untressed" target="_blank" rel="noopener noreferrer" className="social-icon instagram" title="Instagram" aria-label="UNTRESSED on Instagram"><FaInstagram /></a>
                                    <a href="https://www.linkedin.com/company/untressed" target="_blank" rel="noopener noreferrer" className="social-icon linkedin" title="LinkedIn" aria-label="UNTRESSED on LinkedIn"><FaLinkedinIn /></a>
                                </div>
                            </div>

                            <button
                                onClick={openContactModal}
                                className="btn btn-custom-connect rounded-pill d-inline-flex align-items-center justify-content-center gap-2 w-100"
                            >
                                <span>Connect with us</span>
                                <span className="arrow-icon">→</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Copyright Bar */}
            <div className="copyright-bar py-3 text-center text-white">
                <small>© {new Date().getFullYear()} UNTRESSED. All rights reserved.</small>
            </div>
        </footer>
    )
}

export default Footer
