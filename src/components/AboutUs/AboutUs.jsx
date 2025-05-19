import React from 'react'
import Heading from '../Reusable-components/Heading'
import Content from './Content'

const AboutUs = () => {
  return (
    <div>
      <Heading h={'About'}/>
      <div className='mb-32'>
           <Content subHead={"Our History"}/>
           <Content subHead={"Your favorite Tropical Destinations just one click away"}/>
           <Content subHead={"Our Vision"}/>
     </div>
    </div>
  )
}

export default AboutUs