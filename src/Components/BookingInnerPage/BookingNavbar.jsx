



import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // For responsive menu icon
import abvlogo from "../HomePage/Assets/logo.png";

export default function BookingNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold flex items-center">
          <img src={abvlogo} alt="ABV Logo" className="h-10 mr-2" />
        </div>

        {/* Navigation Links - Hidden on mobile */}
        <ul className="hidden md:flex space-x-6 text-gray-700">
          <li>
            <a href="#" className="hover:text-orange-500">
              Apartments
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-orange-500">
              Individual house
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-orange-500">
              Ongoing projects
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-orange-500">
              Contact us
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-orange-500">
              Blogs
            </a>
          </li>
        </ul>

        {/* Buttons */}
        <div className="hidden md:flex space-x-4">
          <button className="border border-orange-500 text-orange-500 px-4 py-2 rounded-md hover:bg-orange-100">
            Post your property
          </button>
          <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600">
            Login
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-gray-100 p-4 mt-2 rounded-lg shadow-md">
          <ul className="flex flex-col space-y-3 text-gray-700">
            <li>
              <a href="#" className="hover:text-orange-500">
                Apartments
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-500">
                Individual house
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-500">
                Ongoing projects
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-500">
                Contact us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-500">
                Blogs
              </a>
            </li>
          </ul>

          <div className="flex flex-col space-y-3 mt-4">
            <button className="border border-orange-500 text-orange-500 px-4 py-2 rounded-md hover:bg-orange-100">
              Post your property
            </button>
            <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600">
              Login
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
