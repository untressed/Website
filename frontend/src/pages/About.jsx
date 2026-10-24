import React, { useEffect } from 'react'
import AboutIntro from '../components/AboutIntro'
import OurPurpose from '../components/OurPurpose'
import MissionVision from '../components/MissionVision'
import OurValues from '../components/OurValues'
import OurStory from '../components/OurStory'

function About() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div style={{ paddingTop: '100px', overflowX: 'hidden' }}>
            <AboutIntro />
            <OurPurpose />
            <MissionVision />
            <OurValues />
            <OurStory />
        </div>
    )
}

export default About

