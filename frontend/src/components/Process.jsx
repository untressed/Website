import React from 'react'
import processImg1 from '../assets/process-1.webp'
import processImg2 from '../assets/process-2.webp'
import processImg3 from '../assets/process-3.webp'
import processImg4 from '../assets/process-4.webp'

function Process() {
    const steps = [
        {
            id: 1,
            title: "DISCOVER",
            desc: "We explore your goals, audience, and challenges through research and strategic conversations. This helps us uncover insights that form a solid foundation for your project.",
            time: "3–5 Days",
            image: processImg3,
            align: "left"
        },
        {
            id: 2,
            title: "PLAN",
            desc: "We define the roadmap, selecting the right technologies and design direction. A detailed strategy ensures every step aligns with your business objectives.",
            time: "5–7 Days",
            image: processImg1,
            align: "right"
        },
        {
            id: 3,
            title: "CREATE",
            desc: "Our team brings the vision to life, coding robust solutions and crafting intuitive designs. We focus on scalability, performance, and user experience.",
            time: "2–4 Weeks",
            image: processImg4,
            align: "left"
        },
        {
            id: 4,
            title: "DELIVER & OPTIMIZE",
            desc: "We launch your project with precision, monitoring performance and making data-driven optimizations to ensure sustained growth and success.",
            time: "1–2 Weeks",
            image: processImg2,
            align: "right"
        }
    ]

    return (
        <section className="py-5 section-process">
            <div className="container py-5">
                <div className="text-center mb-5">
                    <p className="text-uppercase tracking-wide mb-2" style={{ fontSize: '0.85rem', color: '#315C46', fontWeight: 700 }}>
                        OUR 4-STAGE METHODOLOGY
                    </p>
                    <h2 className="display-5 fw-bold text-dark mb-0" style={{ color: '#20382C' }}>
                        DISCOVER OUR PROCESS
                    </h2>
                    <div className="mx-auto mt-4" style={{ maxWidth: '700px' }}>
                        <p className="small" style={{ color: '#4b5563', fontSize: '1rem', lineHeight: '1.6' }}>
                            We begin by understanding your goals, audience, and challenges through focused research. This insight shapes a clear strategy that guides your entire project.
                        </p>
                    </div>
                </div>

                <div className="process-steps">
                    {steps.map((step, index) => (
                        <div className="row align-items-center mb-5 gx-5 process-step-row" key={step.id}>
                            {/* For Left Align: Image First. For Right Align: Text First (desktop) */}
                            {/* Using Order classes to handle responsiveness */}

                            <div className={`col-lg-6 mb-4 mb-lg-0 ${step.align === 'right' ? 'order-lg-2' : 'order-lg-1'}`}>
                                <div className={`process-image-container ${step.align === 'left' ? 'shape-left' : 'shape-right'}`}>
                                    <img
                                        src={step.image}
                                        alt={step.title}
                                        className="img-fluid w-100 h-100 object-fit-cover"
                                    />
                                </div>
                            </div>

                            <div className={`col-lg-6 ${step.align === 'right' ? 'order-lg-1 text-lg-end text-center p-lg-5' : 'order-lg-2 text-lg-start text-center p-lg-5'}`}>
                                <div className="d-flex align-items-center gap-2 mb-3 justify-content-center justify-content-lg-start" style={{ justifyContent: step.align === 'right' ? 'flex-end' : 'flex-start' }}>
                                    <span className="process-step-pill">Phase 0{step.id}</span>
                                </div>
                                <h3 className="display-6 fw-bold text-dark mb-3" style={{ fontSize: '2.25rem', color: '#20382C' }}>
                                    {step.title}
                                </h3>
                                <p className="mb-4" style={{ lineHeight: '1.7', fontSize: '1.05rem', color: '#4b5563' }}>
                                    {step.desc}
                                </p>
                                <div className="d-inline-flex align-items-center gap-2 process-duration-pill">
                                    <span>⏱</span> {step.time}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Process
