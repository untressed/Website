import React, { useState } from 'react';

const JobOpportunities = () => {
    // Mock Data based on the screenshot
    const [jobs] = useState([
        {
            id: '2344897',
            title: 'Web Developer',
            location: 'Remote',
            experience: '1-3 yrs',
            description: 'We are looking for a skilled Web Developer to build and maintain functional web pages and applications.'
        },
        {
            id: '2344898',
            title: 'App Developer',
            location: 'Bangalore',
            experience: '2-4 yrs',
            description: 'Join our mobile team to design and build the next generation of our mobile applications.'
        },
        {
            id: '2344899',
            title: 'SEO Executive',
            location: 'Remote',
            experience: '1-2 yrs',
            description: 'We are looking for an SEO Executive to manage all search engine optimization and marketing activities.'
        },
        {
            id: '2344900',
            title: 'Business Development Associate',
            location: 'Mumbai',
            experience: '0-2 yrs',
            description: 'We are looking for a high-energy, motivated Business Development Associate to join our growth team.'
        },
        {
            id: '2344901',
            title: 'Social Media Manager',
            location: 'Remote',
            experience: '2-5 yrs',
            description: 'We represent our brand across social channels as the voice of our company.'
        },
        {
            id: '2344902',
            title: 'UI/UX Designer',
            location: 'Bangalore',
            experience: '2-5 yrs',
            description: 'Turn interfaces into rich user experiences. We are looking for a creative UI/UX Designer.'
        },
        {
            id: '2344903',
            title: 'Data Analyst',
            location: 'Remote',
            experience: '1-3 yrs',
            description: 'Interpret data, analyze results using statistical techniques and provide ongoing reports.'
        },
        {
            id: '2344904',
            title: 'AI/ML Specialist',
            location: 'Remote',
            experience: '3-6 yrs',
            description: 'We are looking for an AI/ML Specialist to help us build intelligent systems.'
        },
        {
            id: '2344905',
            title: 'Meta Expert',
            location: 'Remote',
            experience: '2-4 yrs',
            description: 'Manage and optimize campaigns across Meta platforms (Facebook, Instagram) for maximum ROI.'
        }
    ]);

    return (
        <section className="pt-4 pt-lg-5 pb-5" style={{ backgroundColor: '#fff' }}>
            <div className="container">
                {/* Header */}
                <h2 className="fw-bold mb-4 text-dark" style={{ fontSize: '2rem' }}>Job Opportunities</h2>



                {/* Job Grid */}
                <div className="row g-4">
                    {jobs.map((job, index) => (
                        <div key={index} className="col-lg-4 col-md-6">
                            <div className="card h-100 border p-4" style={{ borderRadius: '12px', borderColor: '#e9ecef' }}>
                                <div className="card-body p-0 d-flex flex-column">
                                    <h5 className="card-title fw-bold mb-1" style={{ fontSize: '1.1rem', lineHeight: '1.4' }}>
                                        {job.title}
                                    </h5>
                                    <p className="text-secondary small mb-3" style={{ fontSize: '0.75rem' }}>
                                        Job ID: {job.id}
                                    </p>

                                    <div className="d-flex gap-2 mb-3">
                                        <span className="badge bg-white text-secondary border rounded-pill fw-normal px-3 py-2" style={{ fontSize: '0.8rem' }}>
                                            {job.location}
                                        </span>
                                        <span className="badge bg-white text-secondary border rounded-pill fw-normal px-3 py-2" style={{ fontSize: '0.8rem' }}>
                                            Experience: {job.experience}
                                        </span>
                                    </div>

                                    <div className="mb-4">
                                        <h6 className="fw-bold mb-2" style={{ fontSize: '0.9rem' }}>Job Description</h6>
                                        <p className="text-secondary small mb-0" style={{ lineHeight: '1.6', fontSize: '0.85rem' }}>
                                            {job.description}
                                        </p>
                                    </div>

                                    <div className="mt-auto text-end">
                                        <a
                                            href="https://forms.gle/VmkkkbjWgF832DqZ7"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-primary rounded-pill px-4 py-2 fw-medium shadow-sm"
                                            style={{ backgroundColor: '#315C46', borderColor: '#315C46', fontSize: '0.9rem' }}
                                        >
                                            Apply Now
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default JobOpportunities;
