import React from 'react'
import WhoWeAre from '../components/WhoWeAre'
import WhatWeDo from '../components/WhatWeDo'
import Process from '../components/Process'
import Projects from '../components/Projects'
import Clients from '../components/Clients'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'

import Hero from '../components/Hero'

function Home({ openServicesModal }) {
    return (
        <>
            <Hero openServicesModal={openServicesModal} />
            <WhoWeAre />
            <WhatWeDo />
            <Process />
            <Projects />
            <Clients />
            <Testimonials />
            <FAQ />
        </>
    )
}

export default Home
