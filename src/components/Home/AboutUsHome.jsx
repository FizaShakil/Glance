import React from 'react';
import purpleHotelImage from '../../assets/purpleHotelImage.jpg';
import Heading from '../Reusable-components/Heading';
import { Link } from 'react-router-dom';

const AboutUsHome = () => {
  return (
    <div>
      <Heading h={'About'} />
      <div className='flex flex-col md:flex-row justify-around items-center mt-7 gap-8'>
        <div className='hover:shadow-lg hover:shadow-black hover:ease-linear duration-300 w-[250px] sm:w-[300px] md:w-[350] lg:w-[400px]'>
          <img
            src={purpleHotelImage}
            alt="aboutImage"
            className='bg-cover w-full rounded-xl'
          />
        </div>
        <div className='max-w-[400px] px-4 md:px-0'>
          <p className='headFont1'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, magnam suscipit voluptatibus dolorem repellat voluptatum hic nisi saepe id nemo officiis maxime dolores, officia quo voluptate quod? Dolore, placeat assumenda. <br /><br />
            Eos unde quisquam corrupti hic non. Rem dicta ad, quidem sit magnam fuga. Porro officiis quod animi quibusdam quaerat atque perferendis, consectetur illo cumque perspiciatis magnam tempore eum iusto numquam?
          </p>
          <Link to='/aboutus'>
            <button className='w-28 border-black border-[0.5px] rounded-md mt-6 py-1 duration-500 hover:bg-[#240b3b] hover:text-white'>
              Learn More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUsHome;

