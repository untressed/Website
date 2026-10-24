import React from 'react'

function MissionVision() {
    return (
        <div className="container mt-5 pt-5">
            <div className="row g-4">
                <div className="col-md-6">
                    <div className="mission-vision-card">
                        <div className="card-icon mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-bullseye" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path d="M8 13A5 5 0 1 1 8 3a5 5 0 0 1 0 10zm0 1A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
                                <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                                <path d="M9.5 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                            </svg>
                        </div>
                        <h3 className="card-title">Our Mission</h3>
                        <p className="card-text">
                            To empower businesses with innovative digital solutions that drive growth,
                            enhance efficiency, and create lasting value in an ever-evolving digital landscape.
                        </p>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="mission-vision-card">
                        <div className="card-icon mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                            </svg>
                        </div>
                        <h3 className="card-title">Our Vision</h3>
                        <p className="card-text">
                            To be the leading technology partner recognized globally for transforming
                            businesses through cutting-edge solutions and exceptional service excellence.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MissionVision
