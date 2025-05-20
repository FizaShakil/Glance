import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-[#240b3b] sticky top-0 z-50 shadow-md pb-5">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 pt-7">

          {/* Logo */}
          <div className="text-4xl font-bold destName text-white">
            <Link to='/'>
            Glance
            </Link>
            <p className="text-xs w-[150px]">here the hook line comes</p>
          </div>

          {/* Center Navigation */}
          <div className="hidden headFont1 md:flex space-x-12 text-white text-sm  relative right-16">
            <NavLink to="/"
                 className={({ isActive }) => `hover:text-gray-100 hover:underline ${isActive ? "text-gray-100 underline" : "text-white"}`}>
                  Home
            </NavLink>
            <NavLink to="/aboutus" 
                 className={({ isActive }) => `hover:text-gray-100 hover:underline ${isActive ? "text-gray-100 underline" : "text-white"}`}>
                  About
            </NavLink>
            <NavLink to="/destination" 
            className={({ isActive }) => `hover:text-gray-100 hover:underline ${isActive ? "text-gray-100 underline" : "text-white"}`}>
              Destinations
            </NavLink>
            <NavLink to="/privacypolicy" 
            className={({ isActive }) => `hover:text-gray-100 ml-4 hover:underline ${isActive ? "text-gray-100 underline" : "text-white"}`}>
              Privacy Policy
            </NavLink>
            <NavLink to="/contact" 
            className={({ isActive }) => `hover:text-gray-100 ml-4 hover:underline ${isActive ? "text-gray-100 underline" : "text-white"}`}>
              Contact
            </NavLink>
          </div>
         

          {/* Right Icons */}
          <div className="flex items-center space-x-4">

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white hover:text-gray-100 focus:outline-black"
            >
              <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"} text-lg`}></i>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden headFont1  bg-gray-100 text-sm">
          <NavLink to='/home' className='block px-4 py-2 text-gray-800 hover:bg-gray-200'>Home</NavLink>
          <NavLink to='/aboutus' className='block px-4 py-2 text-gray-800 hover:bg-gray-200'>About</NavLink>
          <NavLink to='/destination' className='block px-4 py-2 text-gray-800 hover:bg-gray-200'>Destinations</NavLink>
          <NavLink to='/privacypolicy' className='block px-4 py-2 text-gray-800 hover:bg-gray-200'>Privacy Policy</NavLink>
          <NavLink to='/contact' className='block px-4 py-2 text-gray-800 hover:bg-gray-200'>Contact</NavLink>
        </div>
      )}
    </nav>
  );
};

export default Header;