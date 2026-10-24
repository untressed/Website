import React, { useEffect } from 'react';
import ContactForm from './ContactForm';
import { useContactFormModal } from '../context/ContactFormContext';
import '../App.css';

const ContactFormModal = () => {
    const { isContactModalOpen, closeContactModal } = useContactFormModal();

    // Close modal on ESC key press
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isContactModalOpen) {
                closeContactModal();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isContactModalOpen, closeContactModal]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isContactModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isContactModalOpen]);

    if (!isContactModalOpen) return null;

    // Handle click on overlay (outside modal)
    const handleOverlayClick = (e) => {
        if (e.target.classList.contains('contact-modal-overlay')) {
            closeContactModal();
        }
    };

    return (
        <div
            className="contact-modal-overlay"
            onClick={handleOverlayClick}
        >
            <div className="contact-modal-container">
                <button
                    onClick={closeContactModal}
                    className="contact-modal-close-btn"
                    aria-label="Close modal"
                >
                    &times;
                </button>
                <ContactForm isModal={true} />
            </div>
        </div>
    );
};

export default ContactFormModal;
