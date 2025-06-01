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

const AboutUs = () => {
  return (
    <div className="bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600 mb-6">
          <span className="font-medium">Home</span> &gt; <span>About Us</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Section */}
          <div className="lg:w-1/2">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">About Us</h1>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Gone are the days when people used to deal property matters on the
              basis of "mouth to mouth publicity" or nearby dealers.
              Globalization and fast lifestyle has encouraged the real estate
              industry to step in E-World. Now active partakers of real estate
              world are eagerly seeking the right options to establish
              themselves in E-Real Estate World. RealestateIndia.Com is a
              solution to all what bothers to people who all are dealing in
              properties or people who all are searching property. As one of the
              leading property portals, RealestateIndia has tuned itself with
              pulse of real estate sector. Moving ahead with esteemed registered
              users and regularly visited by players of real estate industry,
              RealestateIndia.Com has become the pivot for real-estate sector.
            </p>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Our Mission
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Our mission is to touch the horizon where our capabilities may
                successfully meet with the requirements of our clients, that too
                with ultimate transparency and cost-effectiveness.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Know us</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                We are serving this industry since 1997 by providing an online
                platform acting as a search engine or advertising agency. With
                our vast experience in the same field, we have emerged as the
                solitary solution provider. With such an immense exposure in the
                said domain, we completely understand the needs of our consumers
                and strive hard to meet the same.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Being substantial in the realm of Real estate, we have stridden
                a long way in a short span of time. With our resolution to raise
                high, we beat the all hurdles and stood against all odds. This
                marvelous achievement has been the upshot of the trust, which
                our clients have shown over the years.
              </p>
              <p className="text-gray-700 leading-relaxed">
                RealestateIndia.Com is owned and managed by Weblink.in Pvt. Ltd,
                a leading brand in web designing services and e-commerce
                solutions. Weblink.in Pvt. Ltd. is counted for its expertise in
                web solutions and its top ranking business portals. Our
                invincible expertise and rich experience has raised our spirit
                to reach ahead from our client's expectation. Commercialize
                success rate of other portals managed by Weblink is a live
                paradigm of our work excellence.
              </p>
            </div>
          </div>

          {/* Right Section */}
          <div className="lg:w-1/2 space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Vision</h2>
              <p className="text-gray-700 leading-relaxed">
                To sow the seeds of par-excellence services with customer
                centric approach and reap the trust of worldwide clients.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Core Values
              </h2>

              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Transpicuous Work Culture
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Our words and actions always go hand-in-hand. We strongly
                  preserve transparency to be correct ethically, legally and
                  socially as well.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Result-Operation
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  By setting clear goals, fixing the priorities, organizing the
                  resources-and rigorously monitoring the growth of project.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Fast Facts
              </h2>
              <ul className="list-disc pl-5 text-gray-700 space-y-2 leading-relaxed">
                <li>Incepted in 1997</li>
                <li>
                  Recognized as Single platform for versatile needs of Real
                  estate World.
                </li>
                <li>
                  Regularly visited by All the active partakers of Real estate
                  industry.
                </li>
                <li>Crowded by industrial leaders of real estate world.</li>
                <li>Visitors landing Per day More than 1, 00,000.</li>
                <li>
                  Services Offered : Provides Advertising platform to Agents,
                  Buyers and Sellers.
                </li>
                <li>
                  Property categories available industrial, commercial,
                  residential, agricultural and all other types of properties.
                </li>
                <li>
                  Recognized as Single platform for versatile needs of Real
                  estate World.
                </li>
                <li>
                  Regularly visited by All the active partakers of Real estate
                  industry.
                </li>
              </ul>
            </div>
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
    </div>
  );
};

export default AboutUs;