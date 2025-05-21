import React from 'react'
import Heading from '../Reusable-components/Heading'
import Content from './Content'
import Amenities from './Amenities'

const AboutUs = () => {
  return (
    <div>
      <Heading h={'About'}/>
      <div className='mb-32'>
           <Content subHead={"Our History"}/>
           <Content subHead={"Your favorite Tropical Destinations just one click away"}/>
           <Amenities/>
           <Content subHead={"Our Vision"}/>
     </div>
    </div>
  )
}

export default AboutUs