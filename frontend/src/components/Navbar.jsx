import React, { useState, useRef, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { BsPersonFill, BsCart4 } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';
import ServicesModal from './ServicesModal';
import ProfileModal from './ProfileModal';
import logo from '../assets/UNTRESSED-logo.webp';
import wordmark from '../assets/UNTRESSED-wordmark.webp';
import Login from '../pages/Login';
import { useContactFormModal } from '../context/ContactFormContext';

function Navbar({ isServicesModalOpen, setIsServicesModalOpen }) {
    // isServicesModalOpen state is now managed by App component
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollYRef = useRef(0);
    const hoverTimeoutRef = useRef(null);
    const { openContactModal } = useContactFormModal();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, [isLoginOpen]); // Re-check when login modal closes (login success)

    // Scroll detection: disappear when scrolling down, appear when scrolling up
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const prevScrollY = lastScrollYRef.current;

            // Keep navbar visible near the top of page
            if (currentScrollY < 60) {
                setIsVisible(true);
            } else if (currentScrollY > prevScrollY && currentScrollY - prevScrollY > 6) {
                // Scrolling down -> hide navbar (unless dropdown/modal is open)
                if (!isServicesModalOpen && !isMobileMenuOpen && !isLoginOpen && !isProfileModalOpen && !isProfileDropdownOpen) {
                    setIsVisible(false);
                }
            } else if (currentScrollY < prevScrollY && prevScrollY - currentScrollY > 6) {
                // Scrolling up -> show navbar
                setIsVisible(true);
            }

            lastScrollYRef.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isServicesModalOpen, isMobileMenuOpen, isLoginOpen, isProfileModalOpen, isProfileDropdownOpen]);

    const handleMouseEnter = () => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
        }
        setIsLoginOpen(false); // Close Login if Services is hovered
        setIsServicesModalOpen(true);
    };

    const handleMouseLeave = () => {
        hoverTimeoutRef.current = setTimeout(() => {
            setIsServicesModalOpen(false);
        }, 200);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };



    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        setIsProfileDropdownOpen(false);
        window.location.reload();
    };

    const scrollToFooter = () => {
        const footer = document.querySelector('.footer-section');
        if (footer) {
            footer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        setIsServicesModalOpen(false);
        setIsLoginOpen(false);
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <header className={`untressed-navbar-wrapper ${!isVisible ? 'navbar-hidden' : ''}`}>
                <div className="container untressed-nav-container">
                    <nav className={`navbar navbar-expand-lg untressed-floating-tube ${isMobileMenuOpen ? 'mobile-expanded' : ''}`}>
                        <div className="container-fluid px-0">
                            {/* Logo Section */}
                            <NavLink className="navbar-brand d-flex align-items-center gap-2 tube-brand" to="/" onClick={() => { setIsServicesModalOpen(false); setIsLoginOpen(false); setIsMobileMenuOpen(false); }}>
                                <img src={logo} alt="UNTRESSED Logo" style={{ height: '42px', width: 'auto' }} />
                                <img src={wordmark} alt="UNTRESSED" style={{ height: '24px', width: 'auto' }} />
                            </NavLink>

                        <button
                            className="navbar-toggler untressed-tube-toggler"
                            type="button"
                            onClick={toggleMobileMenu}
                            aria-expanded={isMobileMenuOpen}
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        {/* Centered Links inside Cylindrical Tube */}
                        <div className={`collapse navbar-collapse ${isMobileMenuOpen ? 'show' : ''}`}>
                            <ul className="navbar-nav mx-auto align-items-center gap-1 gap-lg-2 my-2 my-lg-0">
                                <li className="nav-item">
                                    <NavLink className="nav-link tube-nav-link" to="/" onClick={() => { setIsServicesModalOpen(false); setIsLoginOpen(false); setIsMobileMenuOpen(false); }}>Home</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link tube-nav-link" to="/about" onClick={() => { setIsServicesModalOpen(false); setIsLoginOpen(false); setIsMobileMenuOpen(false); }}>About us</NavLink>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className={`nav-link tube-nav-link bg-transparent border-0 ${isServicesModalOpen ? 'active' : ''}`}
                                        onClick={() => {
                                            setIsLoginOpen(false);
                                            setIsServicesModalOpen(!isServicesModalOpen);
                                            setIsMobileMenuOpen(false);
                                        }}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        Services
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link tube-nav-link" to="/careers" onClick={() => { setIsServicesModalOpen(false); setIsLoginOpen(false); setIsMobileMenuOpen(false); }}>Careers</NavLink>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className="nav-link tube-nav-link bg-transparent border-0"
                                        onClick={scrollToFooter}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        Contact us
                                    </button>
                                </li>
                            </ul>

                            <div className="d-flex gap-2 align-items-center justify-content-center mt-3 mt-lg-0 tube-actions">
                                {user ? (
                                    <div className="position-relative">
                                        <div
                                            className="d-flex align-items-center justify-content-center cursor-pointer nav-icon-tube"
                                            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                                            style={{ cursor: 'pointer' }}
                                            title={user.name}
                                        >
                                            <FaUserCircle size={26} className="text-dark" />
                                        </div>

                                        {isProfileDropdownOpen && (
                                            <div
                                                className="position-absolute end-0 mt-3 profile-dropdown-glass p-2"
                                                style={{ minWidth: '190px', zIndex: 1000 }}
                                            >
                                                <div className="p-2 border-bottom mb-2">
                                                    <small className="text-muted d-block">Signed in as</small>
                                                    <strong className="d-block text-truncate" style={{ maxWidth: '150px' }}>{user.name}</strong>
                                                </div>
                                                <button
                                                    className="d-block w-100 text-start border-0 bg-transparent text-dark p-2 hover-bg-light rounded-pill"
                                                    onClick={() => {
                                                        setIsProfileDropdownOpen(false);
                                                        setIsProfileModalOpen(true);
                                                    }}
                                                >
                                                    My Profile
                                                </button>
                                                <NavLink
                                                    to="/my-orders"
                                                    className="d-block text-decoration-none text-dark p-2 hover-bg-light rounded-pill"
                                                    onClick={() => setIsProfileDropdownOpen(false)}
                                                >
                                                    My Orders
                                                </NavLink>
                                                <div className="border-top my-1"></div>
                                                <button
                                                    onClick={handleLogout}
                                                    className="d-block w-100 text-start border-0 bg-transparent text-danger p-2 hover-bg-light rounded-pill"
                                                >
                                                    Logout
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div
                                        className="d-flex align-items-center justify-content-center cursor-pointer nav-icon-tube"
                                        onClick={() => {
                                            setIsServicesModalOpen(false);
                                            setIsLoginOpen(true);
                                            setIsMobileMenuOpen(false);
                                        }}
                                        style={{ cursor: 'pointer' }}
                                        title="Account / Login"
                                    >
                                        <BsPersonFill size={24} />
                                    </div>
                                )}

                                {/* Cart Icon */}
                                <NavLink
                                    to="/cart"
                                    className="d-flex align-items-center justify-content-center text-decoration-none nav-icon-tube"
                                    onClick={() => { setIsServicesModalOpen(false); setIsLoginOpen(false); setIsMobileMenuOpen(false); }}
                                    title="View Cart"
                                >
                                    <BsCart4 size={22} />
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </nav>
                </div>
            </header>

            <ServicesModal
                isOpen={isServicesModalOpen}
                onClose={() => setIsServicesModalOpen(false)}
            />

            <Login
                isOpen={isLoginOpen}
                onClose={() => setIsLoginOpen(false)}
            />

            <ProfileModal
                isOpen={isProfileModalOpen}
                onClose={() => setIsProfileModalOpen(false)}
            />
        </>
    )
}

export default Navbar
