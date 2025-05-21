import React from 'react';

const amenities = [
  {
    icon: 'fa-solid fa-wifi',
    title: 'Free Wi-Fi',
    desc: 'Stay connected with high-speed internet throughout the resort.',
  },
  {
    icon: 'fa-solid fa-utensils',
    title: 'All-Inclusive Dining',
    desc: 'Enjoy gourmet meals and tropical delicacies all day long.',
  },
  {
    icon: 'fa-solid fa-spa',
    title: 'Luxury Spa',
    desc: 'Rejuvenate with relaxing massages and tropical spa therapies.',
  },
  {
    icon: 'fa-solid fa-dumbbell',
    title: 'Fitness Center',
    desc: 'Stay active with our state-of-the-art gym facilities.',
  },
  {
    icon: 'fa-solid fa-swimming-pool',
    title: 'Infinity Pool',
    desc: 'Swim with a view in our scenic oceanfront infinity pool.',
  },
  {
    icon: 'fa-solid fa-umbrella-beach',
    title: 'Private Beach',
    desc: 'Access a serene private beach with sunbeds and umbrellas.',
  },
];

const Amenities = () => {
  return (
    <div className=" headFont1 py-12 px-4 sm:px-8 md:px-16">
      <h2 className="text-center text-3xl md:text-4xl text-[#240b3b] mb-10">Amenities You'll Love</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {amenities.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-2xl transition duration-300"
          >
            <div className="text-[#451b6c] text-4xl mb-4">
              <i className={item.icon}></i>
            </div>
            <h3 className="text-xl text-[#452384] mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Amenities;
