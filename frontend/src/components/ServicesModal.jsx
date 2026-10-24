import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../App.css';
import WebDevelopment from '../service_description/WebDevelopment';
import UiUxDevelopment from '../service_description/UiUxDevelopment';
import AppDevelopment from '../service_description/AppDevelopment';
import SearchEngineOptimization from '../service_description/SearchEngineOptimization';
import SocialMediaOptimization from '../service_description/SocialMediaOptimization';
import PayPerClick from '../service_description/PayPerClick';
import LinkedinMarketing from '../service_description/LinkedinMarketing';
import GoogleMyBusiness from '../service_description/GoogleMyBusiness';
import PerformanceMarketing from '../service_description/PerformanceMarketing';
import FunnelBuilding from '../service_description/FunnelBuilding';
import BrandingServices from '../service_description/BrandingServices';
import WhatsappAutomation from '../service_description/WhatsappAutomation';
import Crm from '../service_description/Crm';
import ChatbotSetup from '../service_description/ChatbotSetup';

const ServicesModal = ({ isOpen, onClose }) => {
    const [selectedService, setSelectedService] = useState(null);
    const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
    const location = useLocation();

    // Close modal when route changes (e.g. navigating to cart)
    useEffect(() => {
        if (isOpen) {
            onClose();
        }
    }, [location.pathname]);

    // Close modal when item is added to cart (even if already on cart page)
    useEffect(() => {
        const handleCartUpdate = () => {
            if (isOpen) {
                onClose();
            }
        };

        window.addEventListener('cartUpdated', handleCartUpdate);
        return () => window.removeEventListener('cartUpdated', handleCartUpdate);
    }, [isOpen]);

    if (!isOpen && !isPricingModalOpen) return null;

    const servicesMap = {
        'Web Development': WebDevelopment,
        'UI/UX Development': UiUxDevelopment,
        'App Development': AppDevelopment,
        'Search Engine Optimization(SEO)': SearchEngineOptimization,
        'Social Media Optimization(SMO)': SocialMediaOptimization,
        'Pay-Per-Click(PPC)': PayPerClick,
        'LinkedIn Marketing': LinkedinMarketing,
        'Google My Business': GoogleMyBusiness,
        'Performance Marketing Services': PerformanceMarketing,
        'Funnel Building': FunnelBuilding,
        'Branding Services': BrandingServices,
        'Whatsapp Automation': WhatsappAutomation,
        'CRM': Crm,
        'Chatbot Setup': ChatbotSetup
    };

    const services = {
        left: [
            'Web Development',
            'UI/UX Development',
            'App Development',
            'Search Engine Optimization(SEO)',
            'Social Media Optimization(SMO)',
            'Pay-Per-Click(PPC)',
            'LinkedIn Marketing'
        ],
        right: [
            'Google My Business',
            'Performance Marketing Services',
            'Funnel Building',
            'Branding Services',
            'Whatsapp Automation',
            'CRM',
            'Chatbot Setup'
        ]
    };

    const handleServiceClick = (serviceName) => {
        setSelectedService(serviceName);
        setIsPricingModalOpen(true);
    };

    const handleClosePricingModal = () => {
        setIsPricingModalOpen(false);
        setSelectedService(null);
    };

    const renderPricingModal = () => {
        if (!selectedService || !servicesMap[selectedService]) return null;
        const ServiceComponent = servicesMap[selectedService];
        return (
            <ServiceComponent
                isOpen={isPricingModalOpen}
                onClose={handleClosePricingModal}
            />
        );
    };

    return (
        <>
            {/* Main Services List Modal */}
            <div
                className="services-modal-overlay"
                style={{
                    display: isOpen ? 'block' : 'none',
                    pointerEvents: isOpen ? 'auto' : 'none'
                }}
                onClick={onClose}
            >
                <div
                    className="services-modal-content"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button className="services-modal-close" onClick={onClose}>&times;</button>

                    <div className="services-grid">
                        <div className="services-column">
                            {services.left.map((service, index) => (
                                <div
                                    key={index}
                                    className="service-item"
                                    onClick={() => handleServiceClick(service)}
                                >
                                    {service}
                                </div>
                            ))}
                        </div>

                        <div className="services-column">
                            {services.right.map((service, index) => (
                                <div
                                    key={index}
                                    className="service-item"
                                    onClick={() => handleServiceClick(service)}
                                >
                                    {service}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Pricing Modal */}
            {renderPricingModal()}
        </>
    );
};

export default ServicesModal;
