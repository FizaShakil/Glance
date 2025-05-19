import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
      <p className='w-full h-[0.5px] bg-gray-400 mt-14 mb-6'></p>
      <div className='h-24 text-sm'>
        <div className='md:flex md:flex-row'>
         <div className="text-4xl font-bold destName text-[#2d145b] ml-10">
            <Link to='/'>
                 Glance
            </Link>
            <p className="text-xs w-[150px]">here the hook line comes</p>
          </div>
          <div className='flex flex-row justify-evenly w-[250px] relative mt-4 transform left-1/2 -translate-x-1/2'>
            <Link to={'https://www.facebook.com'}>
                <p className='fa-brands fa-facebook fa-2x text-[#3e1c7d]'></p>
            </Link>
            <Link to={'https://www.instagram.com'}>
                <p className='fa-brands fa-instagram fa-2x text-[#3e1c7d]'></p>
            </Link>
             <Link to={'https://www.twitter.com'}>
                <p className='fa-brands fa-twitter fa-2x text-[#3e1c7d]'></p>
            </Link>
            <Link to={'https://www.linkedin.com'}>
                <p className='fa-brands fa-linkedin fa-2x text-[#3e1c7d]'></p>
            </Link>
            <Link to={'https://www.tiktok.com'}>
                <p className='fa-brands fa-tiktok fa-2x text-[#3e1c7d]'></p>
            </Link>
          </div>
          </div>
          <div className='text-center mt-3'>
            Made by Fiza Shakil - All Rights Reserved
          </div>
      </div>
    </div>
  )
}

export default Footer