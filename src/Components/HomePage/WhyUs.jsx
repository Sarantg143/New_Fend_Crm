import React from "react";

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

const WhyUs = () => {
  return (
    <>
      <div className="max-w-7xl mx-auto p-8 bg-white">
        <div className="text-sm text-gray-600 mb-6">Home &gt; Why us</div>

        {/* 1st section */}
        <div className="flex flex-col md:flex-row items-center gap-8 my-12">
          {/* Content on the left */}
          <div className="flex-1 space-y-6 flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-gray-900">
              The best agents powered by the best technology
            </h1>
            <p className="text-xl text-gray-700">
              We pair local Redfin agents with powerful technology to help you
              find the right home, sell your current home for top dollar, and
              save thousands on fees.
            </p>
          </div>

          {/* Image on the right */}
          <div className="flex-1 h-96 flex items-center justify-center">
            <img
              src="https://tse2.mm.bing.net/th?id=OIP.sYdvOYajosjnTSLAlTCKygHaE8&pid=Api&P=0&h=180"
              alt="Redfin agents"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>

        {/* 2nd section */}
        <div className="flex flex-col md:flex-row items-center gap-8 my-12">
          {/* Image on the left */}
          <div className="flex-1 h-96 flex items-center justify-center">
            <img
              src="https://tse2.mm.bing.net/th?id=OIP.sYdvOYajosjnTSLAlTCKygHaE8&pid=Api&P=0&h=180"
              alt="Redfin agents"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Content on the right */}
          <div className="flex-1 space-y-6 flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-gray-900">
              The best agents powered by the best technology
            </h1>
            <p className="text-xl text-gray-700">
              We pair local Redfin agents with powerful technology to help you
              find the right home, sell your current home for top dollar, and
              save thousands on fees.
            </p>
          </div>
        </div>

        {/* 3rd section */}
        <div className="flex flex-col md:flex-row items-center gap-8 my-12">
          {/* Content on the left */}
          <div className="flex-1 space-y-6 flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-gray-900">
              The best agents powered by the best technology
            </h1>
            <p className="text-xl text-gray-700">
              We pair local Redfin agents with powerful technology to help you
              find the right home, sell your current home for top dollar, and
              save thousands on fees.
            </p>
          </div>

          {/* Image on the right */}
          <div className="flex-1 h-96 flex items-center justify-center">
            <img
              src="https://tse2.mm.bing.net/th?id=OIP.sYdvOYajosjnTSLAlTCKygHaE8&pid=Api&P=0&h=180"
              alt="Redfin agents"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>

        {/* 4th section */}
        <div className="flex flex-col md:flex-row items-center gap-8 my-12">
          {/* Image on the left */}
          <div className="flex-1 h-96 flex items-center justify-center">
            <img
              src="https://tse2.mm.bing.net/th?id=OIP.sYdvOYajosjnTSLAlTCKygHaE8&pid=Api&P=0&h=180"
              alt="Redfin agents"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Content on the right */}
          <div className="flex-1 space-y-6 flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-gray-900">
              The best agents powered by the best technology
            </h1>
            <p className="text-xl text-gray-700">
              We pair local Redfin agents with powerful technology to help you
              find the right home, sell your current home for top dollar, and
              save thousands on fees.
            </p>
          </div>
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

export default WhyUs;