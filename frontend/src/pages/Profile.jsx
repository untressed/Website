import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUserCircle, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBuilding } from 'react-icons/fa';

function Profile() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
        return (
            <div className="container py-5 mt-5 text-center">
                <h2>Please Login</h2>
                <p className="text-muted">You need to be logged in to view your profile.</p>
            </div>
        );
    }

    return (
        <div className="container py-5 mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
                        <div className="bg-dark p-4 text-center text-white position-relative">
                            <div className="mb-3">
                                <FaUserCircle size={80} className="text-white opacity-75" />
                            </div>
                            <h3 className="fw-bold mb-1">{user.name}</h3>
                            <p className="mb-0 opacity-75">{user.email}</p>
                        </div>

                        <div className="card-body p-4 p-md-5">
                            <h5 className="fw-bold mb-4 pb-2 border-bottom">Account Details</h5>

                            <div className="d-flex align-items-center mb-4">
                                <div className="bg-light rounded-circle p-3 me-3 text-primary">
                                    <FaEnvelope size={20} />
                                </div>
                                <div>
                                    <label className="text-muted small d-block mb-1">Email Address</label>
                                    <div className="fw-medium">{user.email}</div>
                                </div>
                            </div>

                            <div className="d-flex align-items-center mb-4">
                                <div className="bg-light rounded-circle p-3 me-3 text-success">
                                    <FaPhone size={20} />
                                </div>
                                <div>
                                    <label className="text-muted small d-block mb-1">Contact Number</label>
                                    <div className="fw-medium">{user.contact || 'Not provided'}</div>
                                </div>
                            </div>

                            {user.address && (
                                <div className="d-flex align-items-center mb-4">
                                    <div className="bg-light rounded-circle p-3 me-3 text-danger">
                                        <FaMapMarkerAlt size={20} />
                                    </div>
                                    <div>
                                        <label className="text-muted small d-block mb-1">Address</label>
                                        <div className="fw-medium">{user.address}</div>
                                    </div>
                                </div>
                            )}

                            {user.orgName && (
                                <div className="d-flex align-items-center mb-4">
                                    <div className="bg-light rounded-circle p-3 me-3 text-warning text-dark">
                                        <FaBuilding size={20} />
                                    </div>
                                    <div>
                                        <label className="text-muted small d-block mb-1">Organization</label>
                                        <div className="fw-medium">{user.orgName}</div>
                                    </div>
                                </div>
                            )}

                            <div className="mt-5 d-flex gap-3">
                                <NavLink to="/my-orders" className="btn btn-outline-dark flex-grow-1 py-2">
                                    View Orders
                                </NavLink>
                                <button
                                    onClick={() => {
                                        localStorage.removeItem('user');
                                        window.location.href = '/';
                                    }}
                                    className="btn btn-dark flex-grow-1 py-2"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
