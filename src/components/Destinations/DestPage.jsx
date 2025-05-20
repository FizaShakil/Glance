import React from 'react';
import list from '../../list';
import { Link, useParams } from 'react-router-dom';

const DestPage = () => {
  const { id } = useParams();
  const dest = list.find((item) => item.id === parseInt(id));

  if (!dest) {
    return (
      <div className="text-center text-3xl font-bold bg-[#240b3b] py-10">
        Destination not found!
      </div>
    );
  }

  const defaultImage = "https://via.placeholder.com/150";

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-300 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full bg-white/30 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:flex md:space-x-10 border border-purple-200">
        {/* Image Section */}
        <div className="md:w-1/2">
          <img
            src={dest.image || defaultImage}
            alt={dest.destName || "Destination Image"}
            className="w-full h-64 md:h-[60vh] object-cover rounded-2xl shadow-md"
          />
        </div>

        {/* Details Section */}
        <div className="md:w-1/2 mt-8 md:mt-0 flex flex-col justify-center">
          <h2 className="destName text-4xl font-bold text-[#240b3b] mb-6 tracking-wide">
            {dest.destName}
          </h2>
          <h3 className="text-lg text-[#371f4e] underline font-bold mb-2">About this tropical destination</h3>
          <p className="text-[#43275e] headFont1 text-sm leading-relaxed">
            {dest.desc} <br /> <br /> {dest.desc}
          </p>

          {/* Call to Action */}
          <div className="mt-8">
            <Link to={`/booknow/${dest.id}`}>
            <button className="px-6 py-3 rounded-full bg-[#240b3b] text-white font-semibold hover:bg-[#43275e] transition duration-500 shadow-lg">
              Book Now
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestPage;
