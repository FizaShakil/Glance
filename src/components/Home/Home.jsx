import React from 'react'
import Heading from '../Reusable-components/Heading'
import AboutUsHome from './AboutUsHome'
import Contact from '../Contact/Contact'

const Home = () => {
  return (
    <div>
      <div className=' bg w-full h-[100vh] md:h-[100vh] relative opacity-90'>
        <div className='flex flex-row'>
          <div className='text-white headFont2 pt-32 pl-10 text-5xl leading-[50px]'>
            Escape to Paradise: <br /> Where Sun-Kissed Shores &  <br />Serene Waters Await.
          </div>
        </div>
      </div>
      <div > 
        <AboutUsHome/>
        <Contact/>
      </div>
    </div>
  )
}

export default Home