import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import authService from '../services/authService';

// Import assets
import login1 from '../assets/login-1.webp';
import login2 from '../assets/login-2.webp';
import login3 from '../assets/login-3.webp';

function Login({ isOpen, onClose }) {
    const [showPassword, setShowPassword] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);

    // const [isLoginMode, setIsLoginMode] = useState(true); // Default to Login, remove toggle

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        contact: '',
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { name, email, password, contact } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Only Login Logic
            await authService.login({ email, password });

            // Show Success UI
            setLoginSuccess(true);

            // Close after delay
            setTimeout(() => {
                window.location.reload();
                onClose();
            }, 2000);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    // Determine display style based on isOpen state
    if (!isOpen) return null;

    return (
        <div
            className="services-modal-overlay"
            style={{
                display: isOpen ? 'flex' : 'none',
                pointerEvents: 'auto',
                top: '70px',
                zIndex: 1000,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(8px)'
            }}
            onClick={onClose}
        >
            <div
                className="services-modal-content"
                style={{
                    maxWidth: '900px',
                    width: '90%',
                    padding: '0',
                    overflow: 'hidden',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="row g-0">

                    {/* Left Side: Login/Register Form */}
                    <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center bg-white p-4 p-lg-5">
                        <div style={{ maxWidth: '350px', width: '100%' }}>
                            {loginSuccess ? (
                                <div className="text-center py-5">
                                    <div className="mb-4 text-success">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                        </svg>
                                    </div>
                                    <h2 className="fw-bold mb-2">Login Successful!</h2>
                                    <p className="text-muted">Welcome back.</p>
                                </div>
                            ) : (
                                <>
                                    <div className="mb-3">
                                        <h2 className="fw-bold mb-2">Welcome Back</h2>
                                        <p className="text-muted small">
                                            Please login to continue.
                                        </p>
                                        {error && <div className="alert alert-danger p-2 small">{error}</div>}
                                    </div>

                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label className="form-label fw-medium small">Email</label>
                                            <input
                                                type="email"
                                                className="form-control bg-light border-0"
                                                name="email"
                                                value={email}
                                                onChange={handleChange}
                                                placeholder="email@example.com"
                                                required
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label fw-medium small">Password</label>
                                            <div className="position-relative">
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    className="form-control bg-light border-0"
                                                    name="password"
                                                    value={password}
                                                    onChange={handleChange}
                                                    placeholder="••••••••"
                                                    required
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="btn btn-link position-absolute end-0 top-50 translate-middle-y text-muted p-0 pe-3"
                                                    style={{
                                                        border: 'none',
                                                        background: 'transparent',
                                                        transition: 'transform 0.2s ease'
                                                    }}
                                                >
                                                    {showPassword ? "Hide" : "Show"}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="rememberMe" />
                                                <label className="form-check-label text-muted small" htmlFor="rememberMe">
                                                    Remember me
                                                </label>
                                            </div>
                                            <a href="#" className="text-decoration-none text-primary fw-medium small">Forgot password?</a>
                                        </div>

                                        <button type="submit" className="btn btn-dark w-100 mb-3 rounded-3" disabled={loading}>
                                            {loading ? 'Processing...' : 'Login'}
                                        </button>

                                        <div className="text-center small">
                                            <span className="text-muted">Don't have an account? Contact Admin.</span>
                                        </div>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Right Side: Image Carousel */}
                    <div className="col-lg-6 d-none d-lg-block position-relative" style={{ minHeight: '450px' }}>
                        <Swiper
                            modules={[Pagination, Autoplay, EffectFade]}
                            pagination={{ clickable: true }}
                            autoplay={{ delay: 3500, disableOnInteraction: false }}
                            effect="fade"
                            loop={true}
                            className="h-100 w-100"
                        >
                            {[login1, login2, login3].map((img, index) => (
                                <SwiperSlide key={index}>
                                    <div
                                        style={{
                                            backgroundImage: `url(${img})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            height: '100%',
                                            width: '100%'
                                        }}
                                    >
                                        <div className="h-100 w-100 bg-dark bg-opacity-25 d-flex align-items-end p-4">
                                            <div className="text-white mb-4 pb-2">
                                                <h3 className="fw-bold mb-2 fs-4">UNTRESSED</h3>
                                                <p className="small text-white-50 m-0">
                                                    Innovating for the digital future.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Login;
