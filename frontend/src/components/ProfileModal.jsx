import React, { useEffect, useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaTimes, FaCheckCircle, FaEdit } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const ProfileModal = ({ isOpen, onClose }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (isOpen) {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className="services-modal-overlay"
            onClick={onClose}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                justifyContent: 'flex-end',
                zIndex: 1050,
                opacity: isOpen ? 1 : 0,
                transition: 'opacity 0.3s ease'
            }}
        >
            <div
                className="bg-white h-100 shadow-lg"
                onClick={e => e.stopPropagation()}
                style={{
                    width: '100%',
                    maxWidth: '450px',
                    transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
                    transition: 'transform 0.3s ease',
                    overflowY: 'auto'
                }}
            >
                {/* Header */}
                <div className="d-flex justify-content-between align-items-center p-4 border-bottom">
                    <h4 className="fw-bold mb-0">My Profile</h4>
                    <button
                        onClick={onClose}
                        className="btn btn-light rounded-circle p-2 d-flex align-items-center justify-content-center"
                        style={{ width: '40px', height: '40px' }}
                    >
                        <FaTimes size={18} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-4">
                    {user ? (
                        <>
                            {/* Basic Info Card */}
                            <div className="card border-0 shadow-sm rounded-4 bg-light mb-4">
                                <div className="card-body p-4">
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <div className="d-flex align-items-center gap-2">
                                            <h5 className="fw-bold mb-0">Basic Information</h5>
                                            <FaCheckCircle className="text-success" />
                                        </div>
                                        <button className="btn btn-link text-decoration-none fw-bold p-0">
                                            Edit
                                        </button>
                                    </div>

                                    <div className="d-flex align-items-center mb-4">
                                        <div className="text-secondary me-3" style={{ width: '24px' }}>
                                            <FaUser size={20} />
                                        </div>
                                        <div>
                                            <label className="text-muted small d-block">Name:</label>
                                            <div className="fw-medium text-dark">{user.name}</div>
                                        </div>
                                    </div>

                                    <div className="d-flex align-items-center mb-4">
                                        <div className="text-secondary me-3" style={{ width: '24px' }}>
                                            <FaEnvelope size={20} />
                                        </div>
                                        <div>
                                            <label className="text-muted small d-block">Email:</label>
                                            <div className="fw-medium text-dark text-break">{user.email}</div>
                                        </div>
                                    </div>

                                    <div className="d-flex align-items-center">
                                        <div className="text-secondary me-3" style={{ width: '24px' }}>
                                            <FaPhone size={20} />
                                        </div>
                                        <div>
                                            <label className="text-muted small d-block">Mobile:</label>
                                            <div className="fw-medium text-dark">{user.contact || 'Not provided'}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Additional Actions */}
                            <div className="d-grid gap-2">
                                <NavLink
                                    to="/my-orders"
                                    className="btn btn-outline-dark py-2 rounded-3"
                                    onClick={onClose}
                                >
                                    View My Orders
                                </NavLink>
                                <button
                                    className="btn btn-danger py-2 rounded-3 mt-2"
                                    onClick={() => {
                                        localStorage.removeItem('user');
                                        window.location.reload();
                                    }}
                                >
                                    Logout
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-5">
                            <p className="text-muted">Please login to view your profile.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileModal;
