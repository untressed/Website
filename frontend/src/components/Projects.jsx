
import React, { useState } from 'react';
import '../App.css';

const Projects = () => {
    const [activeId, setActiveId] = useState(1);

    const projects = [
        {
            id: 1,
            title: "SaaS Dashboard Modernization",
            description: "We redesigned a complex SaaS dashboard with modern UI components and user-centric workflows, reducing onboarding time by 40% and improving customer satisfaction scores.",
            tags: ["UX/UI Design", "Responsive Web Development", "SEO", "User Engagement Analysis", "LinkedIn Marketing", "Performance Marketing"]
        },
        {
            id: 2,
            title: "Skyline Website Revamp",
            description: "We redesigned a complex SaaS dashboard with modern UI components and user-centric workflows, reducing onboarding time by 40% and improving customer satisfaction scores.",
            tags: ["UX/UI Design", "Responsive Web Development", "Website Performance Optimization", "Content Strategy & Layout Design", "User Engagement Analysis"]
        },
        {
            id: 3,
            title: "Lead-Focused PPC Campaign",
            description: "We redesigned a corporate website with modern UX patterns and a fully responsive layout, resulting in a 65% increase in user engagement and improved brand credibility.",
            tags: ["PPC", "Performance Marketing", "SEO", "User Engagement Analysis", "LinkedIn Marketing", "Performance Marketing"]
        }
    ];

    return (
        <div className="projects-section">
            <div className="projects-header">
                <span className="section-subtitle">OUR PROJECTS</span>
                <h2>PROJECTS THAT DEFINE <br /> OUR EXPERTISE</h2>
                <p className="section-description">
                    From digital transformations to custom-built solutions, here are the <br />
                    results we've delivered for forward-thinking brands.
                </p>
            </div>

            <div className="projects-container">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className={`project-card ${activeId === project.id ? 'card-highlight' : 'card-standard'}`}
                        onClick={() => setActiveId(project.id)}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="card-content">
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>

                            {/* Only show tags if this is the active card */}
                            {activeId === project.id && project.tags && (
                                <div className="tags-container">
                                    {project.tags.map((tag, index) => (
                                        <span key={index} className="tag">{tag}</span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Projects;
