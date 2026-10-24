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
import SaasProduct from '../service_description/SaasProduct';
import MvpDevelopment from '../service_description/MvpDevelopment';
import CustomSoftware from '../service_description/CustomSoftware';
import InventoryBillingSystem from '../service_description/InventoryBillingSystem';

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
        'SaaS Product': SaasProduct,
        'MVP Development': MvpDevelopment,
        'Custom Software': CustomSoftware,
        'Inventory & Billing Systems': InventoryBillingSystem,
        'Inventory & Billing Management System': InventoryBillingSystem,
        'Web Development': WebDevelopment,
        'UI/UX Development': UiUxDevelopment,
        'App Development': AppDevelopment,
        'Search Engine Optimization (SEO)': SearchEngineOptimization,
        'Search Engine Optimization(SEO)': SearchEngineOptimization,
        'Social Media Optimization (SMO)': SocialMediaOptimization,
        'Social Media Optimization(SMO)': SocialMediaOptimization,
        'Pay-Per-Click (PPC)': PayPerClick,
        'Pay-Per-Click(PPC)': PayPerClick,
        'LinkedIn Marketing': LinkedinMarketing,
        'Google My Business': GoogleMyBusiness,
        'Performance Marketing Services': PerformanceMarketing,
        'Funnel Building': FunnelBuilding,
        'Branding Services': BrandingServices,
        'WhatsApp Automation': WhatsappAutomation,
        'Whatsapp Automation': WhatsappAutomation,
        'CRM Solutions': Crm,
        'CRM': Crm,
        'Chatbot Setup': ChatbotSetup
    };

    const serviceRows = [
        { left: 'SaaS Product', right: 'Pay-Per-Click (PPC)' },
        { left: 'MVP Development', right: 'LinkedIn Marketing' },
        { left: 'Custom Software', right: 'Google My Business' },
        { left: 'Inventory & Billing Systems', right: 'Performance Marketing Services' },
        { left: 'Web Development', right: 'Funnel Building' },
        { left: 'UI/UX Development', right: 'Branding Services' },
        { left: 'App Development', right: 'WhatsApp Automation' },
        { left: 'Search Engine Optimization (SEO)', right: 'CRM Solutions' },
        { left: 'Social Media Optimization (SMO)', right: 'Chatbot Setup' }
    ];

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
                    <button className="services-modal-close" onClick={onClose} aria-label="Close services modal">&times;</button>

                    <div className="services-table">
                        {serviceRows.map((row, index) => (
                            <div key={index} className="service-row">
                                <div
                                    className="service-cell service-cell-left"
                                    onClick={() => handleServiceClick(row.left)}
                                >
                                    <span className="service-name">{row.left}</span>
                                    <span className="service-arrow">→</span>
                                </div>
                                <div
                                    className="service-cell service-cell-right"
                                    onClick={() => handleServiceClick(row.right)}
                                >
                                    <span className="service-name">{row.right}</span>
                                    <span className="service-arrow">→</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Pricing Modal */}
            {renderPricingModal()}
        </>
    );
};

export default ServicesModal;
