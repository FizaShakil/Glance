import React from 'react';
import purpleHotelImage from '../../assets/purpleHotelImage.jpg';
import Heading from '../Reusable-components/Heading';
import { Link } from 'react-router-dom';

const AboutUsHome = () => {
  return (
    <div>
      <Heading h={'About'} />
      
      {/* Responsive container: column on small, row on medium+ */}
      <div className='flex flex-col-reverse md:flex-row justify-around mt-7 items-center'>

        {/* Text Section */}
        <div className='w-[90%] md:w-[400px] md:mr-[9%] text-center md:text-left mt-6 md:mt-0'>
          <p className='headFont1'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, magnam suscipit voluptatibus dolorem repellat voluptatum hic nisi saepe id nemo officiis maxime dolores, officia quo voluptate quod? Dolore, placeat assumenda. <br /> <br />
            Eos unde quisquam corrupti hic non. Rem dicta ad, quidem sit magnam fuga. Porro officiis quod animi quibusdam quaerat atque perferendis, consectetur illo cumque perspiciatis magnam tempore eum iusto numquam?
          </p>
          <Link to='/aboutus'>
            <button className='w-28 border-black border-[0.5px] rounded-md mt-6 py-1 duration-500 hover:bg-[#240b3b] hover:text-white'>
              Learn More
            </button>
          </Link>
        </div>

        {/* Image Section */}
        <div className='w-[90%] md:w-[400px] md:ml-[9%] hover:shadow-lg hover:shadow-black hover:ease-linear duration-300 mb-6 md:mb-0'>
          <img
            src={purpleHotelImage}
            alt="aboutImage"
            className='bg-cover w-full rounded-xl'
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUsHome;
