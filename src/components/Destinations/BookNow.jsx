import React from 'react';
import { useParams } from 'react-router-dom';
import list from '../../list';

const BookNow = () => {
  const { id } = useParams();
  const dest = list.find((item) => item.id === parseInt(id));
  const defaultImage = "https://via.placeholder.com/150";

  if (!dest) {
    return (
      <div className="text-center text-3xl font-bold text-[#240b3b] py-10">
        Destination not found!
      </div>
    );
  }

  return (
    <div className="min-h-screen headFont1 text-[#240b3b] bg-gradient-to-br from-purple-100 to-purple-300 py-12 px-4">
      <div className="max-w-6xl mx-auto bg-white/30 backdrop-blur-md border border-purple-300 shadow-xl rounded-3xl p-8">
        <h1 className="text-3xl md:text-4xl font-bold headFont text-[#2d145b] text-center mb-10">
          Book Your Stay in {dest.destName}
        </h1>

        <div className="md:flex gap-10">
          {/* Left Side: Image + Summary */}
          <div className="md:w-1/2">
            <img
              src={dest.image || defaultImage}
              alt={dest.destName}
              className="rounded-2xl shadow-md w-full h-64 object-cover mb-6"
            />
            <h2 className="text-3xl destName font-semibold mb-2">{dest.destName}</h2>
            <p className="">{dest.desc}</p>
          </div>

          {/* Right Side: Booking Form */}
          <div className="md:w-1/2 mt-10 md:mt-0">
            <form className="space-y-6">
              {/* Dates */}
              <div>
                <label className="block font-medium mb-1">Check-in Date</label>
                <input type="date" className="w-full p-2 rounded-md border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400" />
              </div>
              <div>
                <label className="block  font-medium mb-1">Check-out Date</label>
                <input type="date" className="w-full p-2 rounded-md border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400" />
              </div>

              {/* Guests */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block  font-medium mb-1">Adults</label>
                  <input type="number" min="1" defaultValue="2" className="w-full p-2 rounded-md border border-purple-300" />
                </div>
              </div>

              {/* Room Type */}
              <div>
                <label className="block font-medium mb-1">Room Type</label>
                <select className="w-full p-2 rounded-md border border-purple-300">
                  <option>Standard Room</option>
                  <option>Ocean View Suite</option>
                  <option>Beachfront Villa</option>
                </select>
              </div>

              {/* Add-ons */}
              <div>
                <label className="block font-medium mb-1">Extras</label>
                <div className="space-y-2 pl-2 ">
                  <label className="block"><input type="checkbox" className="mr-2" />Snorkeling Adventure</label>
                  <label className="block"><input type="checkbox" className="mr-2" />Spa Package</label>
                  <label className="block"><input type="checkbox" className="mr-2" />Private Dinner</label>
                </div>
              </div>

              {/* Personal Info */}
              <div>
                <label className="block font-medium mb-1">Full Name</label>
                <input type="text" className="w-full p-2 rounded-md border border-purple-300" />
              </div>
              <div>
                <label className="block font-medium mb-1">Email Address</label>
                <input type="email" className="w-full p-2 rounded-md border border-purple-300" />
              </div>

              {/* Pricing Summary */}
              <div className=" font-semibold mt-4">
                <p>🏝 Base Price: <span className="float-right">$1,200</span></p>
                <p>🧾 Taxes & Fees: <span className="float-right">$150</span></p>
                <hr className="my-2 border-purple-300" />
                <p className="text-xl font-bold">Total: <span className="float-right">$1,350</span></p>
              </div>

              {/* Submit Button */}
              <button type="submit" className="w-full py-3 bg-[#240b3b] hover:bg-[#43275e]  text-white font-semibold rounded-full transition duration-300 shadow-lg">
                Confirm & Pay
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookNow;
