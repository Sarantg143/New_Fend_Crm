import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Avenuepark from "../HomePage/Assets/Avenuepark.png";
import offer from "../HomePage/Assets/offer.png";
import slide1 from "../HomePage/Assets/slide1.jpg";
import slide2 from "../HomePage/Assets/slide2.webp";
import slide3 from "../HomePage/Assets/slide3.webp";
import slide4 from "../HomePage/Assets/slide4.webp";
import highlightsline from "../BuilderInnerPage/Assets/highlightsline.png";
import { Link, useNavigate } from "react-router-dom";

const images = [slide1, slide2, slide3, slide4];

const PropertyHighlights = ({
  scrollToApartments,
  scrollToIndividualHouse,
  scrollToTopProjects,
}) => {
  const [activeTab, setActiveTab] = useState("BUY");
  const [location, setLocation] = useState("Chennai");
  const [propertyType, setPropertyType] = useState("Apartment");
  const [priceRange, setPriceRange] = useState("2Cr-5Cr");
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[100dvh]">
      <img
        src={images[currentImage]}
        alt="Property highlight"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Navbar */}
      {/* <div className="absolute top-5 left-1/2 transform -translate-x-1/2 hidden md:flex w-[100%] max-w-7xl items-center text-white font-semibold text-sm lg:text-base">
        <div className="flex flex-1 justify-center space-x-6 lg:space-x-10">
          <h1
            onClick={scrollToApartments}
            className="cursor-pointer flex-shrink-0"
          >
            Apartments
          </h1>
          <h1 onClick={scrollToTopProjects} className="cursor-pointer">
            Ongoing Projects
          </h1>
          <h1 onClick={scrollToIndividualHouse} className="cursor-pointer">
            Individual House
          </h1>
          <h1 onClick={() => navigate("/contact")} className="cursor-pointer">
            Contact Us
          </h1>
        </div>
        <div className="flex space-x-3">
          <Link to="/login">
            <button className="px-4 py-2 bg-white text-black rounded hover:bg-blue-700 hover:text-white transition">
              Get Started
            </button>
          </Link>
        </div>
      </div> */}

      {/* Logo */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-10 md:left-16 bg-white p-2 sm:p-3 rounded-md shadow-lg">
        <img
          src={Avenuepark}
          alt="Casagrand Avenuepark Logo"
          className="w-20 sm:w-28 md:w-32 h-auto"
        />
      </div>

      {/* Text content */}
      <div className="absolute top-24 left-5 sm:top-32 sm:left-10 md:top-40 md:left-16 text-white">
        <h1 className="text-xl sm:text-3xl md:text-4xl font-bold leading-snug">
          Casagrand Avenuepark <br /> highlight
        </h1>
        {/* <button
  className="mt-4 px-4 py-2 md:px-6 md:py-2 border-2 border-white text-white font-medium rounded-md hover:bg-white hover:text-black transition"
>
  Explore properties
</button> */}

        <img src={highlightsline} alt="" className="mt-6 h-1 sm:mt-8" />
      </div>

      {/* Offer badge */}
      <div className="absolute bottom-24 right-4 sm:bottom-28 sm:right-6 md:bottom-32 md:right-10 w-16 sm:w-20 md:w-auto">
        <img src={offer} alt="Offer Badge" />
      </div>

      {/* Bottom Search Card */}
      {/* <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-[95%] sm:w-[600px] md:w-[900px] bg-white shadow-xl rounded-tr-lg rounded-br rounded-bl p-4 sm:p-6"> */}
        {/* Tabs */}
        {/* <div className="absolute -top-9 left-0 flex space-x-3 sm:space-x-4 md:space-x-6 text-xs sm:text-sm font-semibold">
          <span className="cursor-pointer px-4 py-2 rounded-tr-lg rounded-tl-lg border-b-2 transition-all bg-gray-100 text-black shadow-md border-gray-200">
            {activeTab}
          </span>
        </div> */}

        {/* Filters */}
        {/* <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6">
          <div className="flex flex-col text-center sm:text-left sm:pr-10 md:pr-24 md:border-r border-gray-300">
            <label className="text-gray-700 text-xs sm:text-sm font-semibold">
              Location
            </label>
            <select
              className="text-gray-500 text-xs sm:text-sm bg-transparent focus:outline-none text-center sm:text-left"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="Chennai">Chennai</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Mumbai">Mumbai</option>
            </select>
          </div>

          <div className="flex flex-col text-center sm:text-left sm:pr-10 md:pr-24 md:border-r border-gray-300">
            <label className="text-gray-700 text-xs sm:text-sm font-semibold">
              Property Type
            </label>
            <select
              className="text-gray-500 text-xs sm:text-sm bg-transparent focus:outline-none text-center sm:text-left"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
            >
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Independent House">Independent House</option>
            </select>
          </div>

          <div className="flex flex-col text-center sm:text-left pr-2">
            <label className="text-gray-700 text-xs sm:text-sm font-semibold">
              Price Range
            </label>
            <select
              className="text-gray-500 text-xs sm:text-sm bg-transparent focus:outline-none text-center sm:text-left"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            >
              <option value="50L-1Cr">50L-1Cr</option>
              <option value="1Cr-2Cr">1Cr-2Cr</option>
              <option value="2Cr-5Cr">2Cr-5Cr</option>
            </select>
          </div>

          <button className="bg-orange-500 p-3 rounded-lg text-white hover:bg-orange-600 transition">
            <FaSearch size={18} />
          </button>
        </div> */}
      {/* </div> */}
    </div>
  );
};

export default PropertyHighlights;
