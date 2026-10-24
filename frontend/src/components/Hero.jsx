function Hero({ openServicesModal }) {

    const scrollToFooter = () => {
        console.log("Start a Project button clicked");
        const footer = document.getElementById('footer');
        if (footer) {
            console.log("Footer found, scrolling...");
            footer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            console.error("Footer element not found!");
            // Fallback to class selector if ID fails for some reason (though it shouldn't)
            const footerByClass = document.querySelector('.footer-section');
            if (footerByClass) footerByClass.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <section className="hero-custom d-flex align-items-center justify-content-center">
            <div className="container position-relative">
                <div className="glass-card text-center p-5 mx-auto">
                    <h1 className="hero-title mb-4">
                        Building Ideas Into <br />
                        Powerful <span className="hero-title-highlight">Digital Experiences</span>
                    </h1>

                    <p className="hero-subtitle mb-5 mx-auto">
                        We help brands grow with strategy-driven design, smart technology, and flawless execution—so you can stand out, scale faster, and deliver real impact.
                    </p>

                    <div className="d-flex justify-content-center gap-3 flex-wrap">
                        <button
                            onClick={scrollToFooter}
                            className="btn btn-gradient rounded-pill px-4 py-2 d-flex align-items-center gap-2"
                        >
                            Start a Project
                            <span className="arrow-icon">→</span>
                        </button>
                        <button
                            onClick={openServicesModal}
                            className="btn btn-outline-custom rounded-pill px-4 py-2"
                        >
                            Explore Services
                        </button>
                    </div>

                    {/* Floating Hero Metric Badges */}
                    <div className="hero-stats-row d-flex justify-content-center align-items-center gap-4 mt-5 flex-wrap">
                        <div className="hero-stat-pill d-flex align-items-center gap-2">
                            <i className="bi bi-star-fill text-terracotta"></i>
                            <span><strong>99.8%</strong> Client Satisfaction</span>
                        </div>
                        <div className="hero-stat-divider d-none d-sm-block"></div>
                        <div className="hero-stat-pill d-flex align-items-center gap-2">
                            <i className="bi bi-rocket-takeoff-fill text-forest"></i>
                            <span><strong>150+</strong> Solutions Deployed</span>
                        </div>
                        <div className="hero-stat-divider d-none d-sm-block"></div>
                        <div className="hero-stat-pill d-flex align-items-center gap-2">
                            <i className="bi bi-shield-check text-taupe"></i>
                            <span><strong>Enterprise</strong> SLA Guarantee</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
