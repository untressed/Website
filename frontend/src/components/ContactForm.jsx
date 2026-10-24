import React, { useState, useEffect } from 'react';
import '../App.css';
import contactService from '../services/contactService';
import { useContactFormModal } from '../context/ContactFormContext';
import thankYouImage from '../assets/thank-you-message.jpg';

const ContactForm = ({ isModal = false }) => {
    const { closeContactModal, modalData } = useContactFormModal();
    const [isTermsAccepted, setIsTermsAccepted] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (isModal && modalData?.message) {
            setMessage(modalData.message);
        } else {
            setMessage('');
        }
    }, [isModal, modalData]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, phone, email } = e.target.elements;
        const formData = {
            name: name.value,
            phone: phone.value,
            email: email.value,
            message: message
        };

        try {
            await contactService.submitContact(formData);
            setFormSubmitted(true);
        } catch (error) {
            console.error("Failed to send message", error);
            const errorMessage = error.response?.data?.message || error.response?.data?.errors?.[0]?.msg || "Failed to send message. Please try again.";
            alert(errorMessage);
        }
    };

    return (
        <div className={`contact-form-wrapper ${isModal ? 'modal-form' : 'page-form'} ${formSubmitted ? 'form-submitted' : ''}`}>
            {!formSubmitted ? (
                <>
                    <div className="contact-form-header">
                        <h3>{(isModal && modalData?.title) || "CONTACT US"}</h3>
                        <p className="mb-0">{(isModal && modalData?.subtitle) || "Reach Out for Business Inquiries"}</p>
                    </div>

                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" placeholder="Full name" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input type="tel" id="phone" name="phone" placeholder="+91" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input type="email" id="email" name="email" placeholder="Enter your mail here" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="2"
                                placeholder="write your message here"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                            ></textarea>
                        </div>

                        <div className="form-checkbox">
                            <input
                                type="checkbox"
                                id={isModal ? "terms-modal" : "terms-contact"}
                                checked={isTermsAccepted}
                                onChange={(e) => setIsTermsAccepted(e.target.checked)}
                            />
                            <label htmlFor={isModal ? "terms-modal" : "terms-contact"}>
                                By submitting this form, you agree to our <a href="#">Terms & Conditions</a>.
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="submit-btn"
                            disabled={!isTermsAccepted}
                        >
                            Send Message
                        </button>
                    </form>
                </>
            ) : (
                <div
                    className="contact-success-graphic-container"
                    onClick={() => isModal && closeContactModal()}
                    title="Click to dismiss"
                >
                    <img
                        src={thankYouImage}
                        alt="Thank You for Reaching Out!"
                        className="contact-success-graphic-img"
                    />
                </div>
            )}
        </div>
    );
};

export default ContactForm;
