import React, { createContext, useContext, useState } from 'react';

// Create the context
const ContactFormContext = createContext();

// Custom hook to use the context
export const useContactFormModal = () => {
    const context = useContext(ContactFormContext);
    if (!context) {
        throw new Error('useContactFormModal must be used within ContactFormContextProvider');
    }
    return context;
};

// Context Provider Component
export const ContactFormContextProvider = ({ children }) => {
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [modalData, setModalData] = useState({ title: '', subtitle: '', message: '' });

    const openContactModal = (initialData = {}) => {
        if (typeof initialData === 'string') {
            setModalData({ title: 'CUSTOM QUOTE', subtitle: 'Reach Out for Business Inquiries', message: initialData });
        } else {
            setModalData({
                title: initialData.title || 'CONTACT US',
                subtitle: initialData.subtitle || 'Reach Out for Business Inquiries',
                message: initialData.message || ''
            });
        }
        setIsContactModalOpen(true);
    };

    const closeContactModal = () => {
        setIsContactModalOpen(false);
        setModalData({ title: '', subtitle: '', message: '' });
    };

    const value = {
        isContactModalOpen,
        openContactModal,
        closeContactModal,
        modalData,
    };

    return (
        <ContactFormContext.Provider value={value}>
            {children}
        </ContactFormContext.Provider>
    );
};
