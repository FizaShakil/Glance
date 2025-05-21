import React from 'react'
import AboutUsHome from './AboutUsHome'
import Contact from '../Contact/Contact'

const Home = () => {
  return (
    <div>
      <div className=' bg w-full h-[100vh] md:h-[100vh] relative opacity-90'>
        <div className='lg:flex lg:flex-row'>
          <div className='text-white headFont2 text-[26px] sm:text-4xl pt-40 text-center lg:text-start lg:pt-32 lg:pl-10 lg:text-5xl lg:leading-[50px]'>
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