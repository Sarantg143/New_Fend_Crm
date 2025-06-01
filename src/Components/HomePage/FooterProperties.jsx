import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import properties1 from "../HomePage/Assets/properties1.png";
import Properties2 from "../HomePage/Assets/properties2.png";
import Properties3 from "../HomePage/Assets/properties3.png";
import location1 from "../HomePage/Assets/location1.png";
import bed from "../HomePage/Assets/bed.png";
import bath from "../HomePage/Assets/bath.png";

import { Link } from "react-router-dom";

import footerlogo from "../BuilderInnerPage/Assets/footerlogo.png";
import facebook from "../BuilderInnerPage/Assets/facebook.png";
import twitter from "../BuilderInnerPage/Assets/twitter.png";
import instagram from "../BuilderInnerPage/Assets/instagram.png";
import linkedin from "../BuilderInnerPage/Assets/linkedin.png";
import phone from "../BuilderInnerPage/Assets/phone.png";
import email from "../BuilderInnerPage/Assets/email.png";
import location from "../BuilderInnerPage/Assets/location.png";
import footerbackground from "../BuilderInnerPage/Assets/Footer background.png";

const FeaturedProperties = () => {
  const [activeCity, setActiveCity] = useState("All");
  const navigate = useNavigate();

  const properties = [
    {
      title: "Luxury Villa in Palm Jumeirah",
      price: "₹20,00,000",
      image: properties1,
      city: "Hyderabad",
      beds: "5",
      bath: "6",
    },
    {
      title: "Luxury Villa in Palm Jumeirah",
      price: "₹20,00,000",
      city: "Hyderabad",
      image: Properties2,
      beds: "5",
      bath: "6",
    },
    {
      title: "Luxury Villa in Palm Jumeirah",
      price: "₹20,00,000",
      image: Properties3,
      city: "Hyderabad",
      beds: "5",
      bath: "6",
    },
    {
      title: "Luxury Villa in Palm Jumeirah",
      price: "₹20,00,000",
      image: Properties3,
      city: "Chennai",
      beds: "5",
      bath: "6",
    },
  ];

  const cities = [
    "All",
    "Chennai",
    "Bengaluru",
    "Coimbatore",
    "Hyderabad",
    "Singapore",
  ];

  const filteredProperties =
    activeCity === "All"
      ? properties
      : properties.filter(
          (property) => property.city.toLowerCase() === activeCity.toLowerCase()
        );

  return (
    <>
      <div className="mt-2 p-6 md:p-8 animate-fadeIn">
        <div className="text-sm text-gray-600 mb-6">
          <span className="font-medium">Home</span> &gt;{" "}
          <span>Properties</span>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold">
              Exclusive properties in your city
            </h2>
          </div>
        </div>

        {/* City Filter Buttons with enhanced active state */}
        <div className="flex space-x-4 mb-6 overflow-x-auto pb-2">
          {cities.map((city) => (
            <button
              key={city}
              className={`px-4 py-2 whitespace-nowrap rounded-full transition-all duration-300 ${
                activeCity === city
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg font-medium"
                  : "border border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-800"
              }`}
              onClick={() => setActiveCity(city)}
            >
              {city}
            </button>
          ))}
        </div>

        {/* Property Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProperties.map((property, index) => (
            <div
              key={index}
              className="rounded-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-lg"
            >
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-48 lg:w-[320px] object-cover rounded-md opacity-90 hover:opacity-100 transition duration-500"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{property.title}</h3>
                <p className="text-red-600 mb-2">{property.price}</p>
                <div className="flex gap-2 items-center mb-2">
                  <img
                    src={location1}
                    alt=""
                    className="w-4 h-4 filter invert brightness-75"
                  />
                  <span className="text-gray-400">{property.city}</span>
                </div>
                <div className="p-2">
                  <div className="border-b"></div>
                </div>
                <div className="flex gap-4 text-gray-400">
                  <p className="flex gap-2 items-center">
                    <img
                      src={bed}
                      alt=""
                      className="w-5 h-5 filter invert brightness-75"
                    />
                    {property.beds} Beds
                  </p>
                  <p className="flex gap-2 items-center">
                    <img
                      src={bath}
                      alt=""
                      className="w-5 h-5 filter invert brightness-75"
                    />
                    {property.bath} Bath
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-black text-white pt-16 pb-8 px-6 mt-3">
        <div className="max-w-7xl mx-auto">
          <div
            className="relative bg-cover bg-center rounded-lg p-6 md:p-10 flex flex-col items-center text-center text-white bg-opacity-80 transition-transform transform hover:scale-105"
             style={{ backgroundImage: `url(${footerbackground})` }}
          >
            <h2 className="text-2xl md:text-3xl font-bold">
              LOOKING FOR MORE <br />
              PROPERTIES?
            </h2>
            <p className="mt-2 text-gray-300">
              Let's work together! <br />
              Drop us a line to see how we can help.
            </p>
            <Link
              to="/contact"
              className="mt-4 px-6 py-2 border border-white rounded-lg hover:bg-white hover:text-black transition duration-300 ease-in-out"
            >
              Contact us
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 border-t border-gray-700 pt-8 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start">
              <Link to="/">
                <img
                  src={footerlogo}
                  alt="Footer Logo"
                  className="mx-auto md:mx-0 hover:scale-110 transition duration-300"
                />
              </Link>
              <p className="text-gray-400 mt-2">
                Welcome to Asset Build Ventures, a premier real estate and
                construction company based in Chennai.
              </p>
              <div className="flex space-x-4 mt-4">
                {[facebook, twitter, linkedin, instagram].map((icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="hover:opacity-75 transition transform hover:scale-110"
                  >
                    <img src={icon} alt="Social" className="h-6" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xl font-bold">Quick Links</h4>
              <ul className="mt-2 space-y-2 text-gray-400">
                <li>
                  <Link
                    to="/"
                    className="hover:text-white transition duration-300 ease-in-out"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="hover:text-white transition duration-300 ease-in-out"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/why-us"
                    className="hover:text-white transition duration-300 ease-in-out"
                  >
                    Why Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/footerproperties"
                    className="hover:text-white transition duration-300 ease-in-out"
                  >
                    Properties
                  </Link>
                </li>
                <li>
                  <Link
                    to="/testimonials"
                    className="hover:text-white transition duration-300 ease-in-out"
                  >
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-white transition duration-300 ease-in-out"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-bold">Contact Us</h4>
              <ul className="mt-2 space-y-2 text-gray-400">
                {[
                  { icon: phone, text: "+91 8056666902" },
                  { icon: email, text: "assetbuildventures@gmail.com" },
                  {
                    icon: location,
                    text: "Ground floor, H-block, 5th street, Anna Nagar, Chennai-600040",
                  },
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-center md:justify-start gap-2 hover:text-white transition duration-300"
                  >
                    <img src={item.icon} alt="Icon" className="h-5" />{" "}
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-bold">Signup to get more updates</h4>
              <div className="mt-2 flex flex-col items-center md:items-start">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="p-2 w-full bg-white rounded-lg focus:ring focus:ring-orange-400 transition"
                />
                <button className="bg-orange-500 px-4 py-2 mt-4 rounded-full hover:bg-orange-600 transition duration-300">
                  Submit
                </button>
              </div>
            </div>
          </div>

          <p className="text-center text-gray-500 text-sm mt-8">
            Copyright &copy; 2025 Asset Build Ventures. All rights reserved
          </p>
        </div>
      </div>
      {/* Footer */}
    </>
  );
};

export default FeaturedProperties;