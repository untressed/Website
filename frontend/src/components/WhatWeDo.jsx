import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

import serviceCardBg from '../assets/web-development.webp' // Web Dev specific
import linkedinBg from '../assets/linkedin-marketing.webp'
import gmbBg from '../assets/google-my-business.webp'
import performanceBg from '../assets/performance-marketing.webp'
import seoBg from '../assets/seo-workflow.webp'
import seoDiagramBg from '../assets/seo-diagram.webp'
import socialBg from '../assets/social-media-marketing.webp'
import whatsappBg from '../assets/whatsapp-automation.webp'
import crmBg from '../assets/crm-dashboard.webp'
import brandingBg from '../assets/branding-identity.webp'
import chatbotBg from '../assets/chatbot-setup.webp'
import uiUxBg from '../assets/ui-ux-design.webp' // New UI/UX
import appDevBg from '../assets/app-development.webp' // New App Dev
import ppcBg from '../assets/pay-per-click.webp' // New PPC

function WhatWeDo() {
    const services = [
        { title: "WEB DEVELOPMENT", image: serviceCardBg, desc: "We build fast, scalable, custom websites tailored to your goals, designed for performance, usability, and long-term growth." },
        { title: "UI/UX DEVELOPMENT", image: uiUxBg, desc: "User-centric design solutions that enhance engagement, improve accessibility, and create memorable digital journeys." },
        { title: "APP DEVELOPMENT", image: appDevBg, desc: "Native and cross-platform mobile apps that provide seamless user experiences and powerful functionality for your business." },
        { title: "SEARCH ENGINE OPTIMIZATION(SEO)", image: seoDiagramBg, desc: "Boost your online visibility and drive organic traffic with proven SEO strategies tailored to your business goals." },
        { title: "SOCIAL MEDIA OPTIMIZATION(SMO)", image: socialBg, desc: "Enhance your brand presence and engage with your audience effectively across all major social media platforms." },
        { title: "PAY-PER-CLICK(PPC)", image: ppcBg, desc: "Drive immediate results and targeted traffic to your website with optimized Pay-Per-Click advertising campaigns." },
        { title: "LINKEDIN MARKETING", image: linkedinBg, desc: "Build professional connections and generate high-quality leads with strategic LinkedIn marketing solutions." },
        { title: "GOOGLE MY BUSINESS", image: gmbBg, desc: "Optimize your local presence and attract more customers in your area with a fully managed Google My Business profile." },
        { title: "PERFORMANCE MARKETING SERVICES", image: performanceBg, desc: "Focus on results with data-driven marketing campaigns designed to maximize your ROI and conversion rates." },
        { title: "FUNNEL BUILDING", image: seoBg, desc: "Create high-converting sales funnels that guide your prospects seamlessly from awareness to purchase." },
        { title: "BRANDING SERVICES", image: brandingBg, desc: "Establish a strong, memorable brand identity that resonates with your target audience and sets you apart." },
        { title: "WHATSAPP AUTOMATION", image: whatsappBg, desc: "Streamline customer communication and support with intelligent WhatsApp automation and chatbots." },
        { title: "CRM", image: crmBg, desc: "Manage customer relationships effectively and streamline your sales process with custom CRM solutions." },
        { title: "CHATBOT SETUP", image: chatbotBg, desc: "Automate customer support and engagement 24/7 with intelligent, AI-powered chatbot solutions." }
    ]

    return (
        <section className="py-5 section-what-we-do">
            <div className="container py-5">
                <div className="text-center mb-5">
                    <p className="text-uppercase tracking-wide mb-2" style={{ fontSize: '0.85rem', color: '#315C46', fontWeight: 700 }}>
                        What We Do
                    </p>
                    <h2 className="display-5 fw-bold text-dark mb-0" style={{ color: '#20382C' }}>
                        TRANSFORMING BUSINESS <br />
                        WITH IT SOLUTIONS
                    </h2>
                </div>

                <div className="mb-5">
                    <Swiper
                        modules={[Pagination, Autoplay]}
                        spaceBetween={24}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            768: { slidesPerView: 3 },
                            1024: { slidesPerView: 4 },
                        }}
                        className="service-swiper pb-5"
                    >
                        {services.map((service, index) => (
                            <SwiperSlide key={index}>
                                <div className="service-card position-relative">
                                    <div className="service-card-inner position-relative h-100">
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            loading="lazy"
                                            width="320"
                                            height="420"
                                            className="w-100 h-100 object-fit-cover position-absolute top-0 start-0"
                                        />
                                        <div className="service-overlay position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-end align-items-center">
                                            <p className="service-desc">
                                                {service.desc}
                                            </p>
                                            <button className="btn service-btn rounded-pill w-100 text-uppercase">
                                                {service.title}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <div className="text-center mx-auto" style={{ maxWidth: '800px' }}>
                    <p className="text-dark fs-5 fw-light">
                        We define your brand's purpose, positioning, and messaging. The result is a clear strategic foundation that guides every creative and marketing decision.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default WhatWeDo
