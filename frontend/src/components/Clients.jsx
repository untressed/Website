import React from 'react';
import '../App.css';
import clientClover from '../assets/clover-logo.webp';
import clientVed from '../assets/logo_ved_clean.webp';
import clientPequireLogo from '../assets/Logo-pequire.svg';
import clientPequireWordmark from '../assets/Wordmark-pequire.svg';
import clientMykamato from '../assets/mykamato-logo.webp';

const Clients = () => {
    const clients = [
        {
            id: 1,
            name: 'Clover Lifestyle Ltd',
            url: 'https://cloverlifestyle.com',
            render: () => (
                <img
                    src={clientClover}
                    alt="Clover Lifestyle Ltd"
                    loading="lazy"
                    width="120"
                    height="40"
                    className="client-logo-img clover-logo-img"
                />
            )
        },
        {
            id: 2,
            name: 'Ved Enterprises',
            url: 'https://ved.enterprises',
            render: () => (
                <div className="client-lockup ved-lockup">
                    <img
                        src={clientVed}
                        alt="Ved Enterprises Logo"
                        loading="lazy"
                        width="40"
                        height="40"
                        className="ved-logo-icon"
                    />
                    <div className="ved-wordmark">
                        <span className="ved-wm-main">VED <span className="ved-wm-accent">ENTERPRISES</span></span>
                        <span className="ved-wm-sub">PREMIUM INDIAN TEXTILES</span>
                    </div>
                </div>
            )
        },
        {
            id: 3,
            name: 'Pequire',
            url: 'https://pequire.com',
            render: () => (
                <div className="client-lockup pequire-lockup">
                    <img
                        src={clientPequireLogo}
                        alt="Pequire Logo"
                        loading="lazy"
                        width="36"
                        height="36"
                        className="pequire-logo-icon"
                    />
                    <img
                        src={clientPequireWordmark}
                        alt="Pequire Wordmark"
                        loading="lazy"
                        width="100"
                        height="28"
                        className="pequire-wordmark-img"
                    />
                </div>
            )
        },
        {
            id: 4,
            name: 'MyKamato',
            url: 'https://mykamato.com',
            render: () => (
                <div className="client-lockup mykamato-lockup">
                    <img
                        src={clientMykamato}
                        alt="MyKamato Logo"
                        loading="lazy"
                        width="40"
                        height="40"
                        className="mykamato-logo-icon"
                    />
                    <div className="mykamato-wordmark">
                        <span className="mykamato-wm-main">
                            <span className="mykamato-wm-my">My</span><span className="mykamato-wm-kamato">Kamato</span>
                        </span>
                        <span className="mykamato-wm-sub">HEALTHY FOOD &amp; SALAD</span>
                    </div>
                </div>
            )
        }
    ];

    return (
        <div className="clients-section">
            <div className="clients-header">
                <span className="section-subtitle">OUR CLIENTS</span>
                <h2>PARTNERING WITH INNOVATORS <br /> ACROSS INDUSTRIES</h2>
                <p className="industry-list">
                    Retail | Tech | Healthcare | Finance | Education | Hospitality
                </p>
            </div>

            <div className="slider-container">
                {/* First Lane - Moving Left */}
                <div className="slider-track">
                    {[...clients, ...clients, ...clients, ...clients].map((client, index) => (
                        <div key={`row1-${index}`} className="client-logo-item">
                            <a
                                href={client.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="client-logo-content"
                                title={client.name}
                            >
                                {client.render()}
                            </a>
                        </div>
                    ))}
                </div>

                {/* Second Lane - Moving Right (Reverse) */}
                <div className="slider-track reverse-track">
                    {[...clients, ...clients, ...clients, ...clients].map((client, index) => (
                        <div key={`row2-${index}`} className="client-logo-item">
                            <a
                                href={client.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="client-logo-content"
                                title={client.name}
                            >
                                {client.render()}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Clients;
