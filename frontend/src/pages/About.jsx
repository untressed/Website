import React from 'react'
import AboutIntro from '../components/AboutIntro'
import OurPurpose from '../components/OurPurpose'
import MissionVision from '../components/MissionVision'
import OurValues from '../components/OurValues'
import OurStory from '../components/OurStory'


function About() {
    return (
        <div style={{ paddingTop: '110px' }}>
            <AboutIntro />
            <OurPurpose />
            <MissionVision />
            <OurValues />
            <OurStory />
        </div>
    )
}

export default About
