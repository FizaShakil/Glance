import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
      <p className='w-full h-[0.5px] bg-gray-400 mt-14 mb-6'></p>
      <div className='h-24 text-sm'>
        <div className='md:flex md:flex-row'>
         <div className="text-3xl font-bold  text-[#2d145b] ml-10">
            <Link to='/'>
                 Glance
            </Link>
            <p className="text-xs w-[150px]">here the hook line comes</p>
          </div>
          <div className='flex flex-row justify-evenly w-[250px] relative mt-4 transform left-1/2 -translate-x-1/2'>
            <p className='fa-brands fa-facebook fa-2x text-[#3e1c7d]'></p>
            <p className='fa-brands fa-instagram fa-2x text-[#3e1c7d]'></p>
            <p className='fa-brands fa-twitter fa-2x text-[#3e1c7d]'></p>
            <p className='fa-brands fa-linkedin fa-2x text-[#3e1c7d]'></p>
            <p className='fa-brands fa-tiktok fa-2x text-[#3e1c7d]'></p>
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