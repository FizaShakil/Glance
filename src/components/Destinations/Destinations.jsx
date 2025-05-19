import React from 'react'
import Heading from '../Reusable-components/Heading'
import list from '../../list'
import { Link } from 'react-router-dom'

const Destinations = () => {

  return (
    <div>
      <Heading h={'Destinations'}/>
      <div>
          <div className="w-[90%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8 mt-8 mb-8">
        {list.map((dest) => (
          <div
            key={dest.id}
            className="bg-[#d7cfe7] shadow-md rounded-2xl p-4 text-center hover:shadow-2xl transition duration-300"
          >
                  {/* Product Image */}
                  <Link to={`/destpage/${dest.id}`}>
                <img
                     src={dest.image || ""}
                    alt={dest.destName || "Product Image"}
                    className="w-full h-44 object-cover border-[0.1px] border-black rounded-md mb-2"
                 />
                 </Link>

                  {/* Product Name */}
                 <h3 className="text-xl destName font-semibold">{dest.destName}</h3>

          </div>
        ))}
        </div>
      </div>
    </div>
  )
}

export default Destinations