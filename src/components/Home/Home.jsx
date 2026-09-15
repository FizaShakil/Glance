import React from 'react'
import Hero from './Hero'
import DestinationSection from './DestinationSection'
import StaysSection from './StaysSection'
import MoodSection from './MoodSection'
import WhyGlance from './WhyGlance'
import EditorialTravel from './EditorialTravel'
import TrustSection from './TrustSection'
import FinalCTA from './FinalCTA'
import ContactSection from '../Contact/ContactSection'

const Home = () => {
  return (
    <div>
      <Hero />
      <DestinationSection />
      <StaysSection />
      <MoodSection />
      <WhyGlance />
      <EditorialTravel />
      <TrustSection />
      <FinalCTA />
      <ContactSection />
    </div>
  )
}

export default Home