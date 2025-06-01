




import React from "react";
import footerbackground from "./Assets/Footer background.png";
import footerlogo from "./Assets/footerlogo.png";
import facebook from "./Assets/facebook.png";
import twitter from "./Assets/twitter.png";
import instagram from "./Assets/instagram.png";
import linkedin from "./Assets/linkedin.png";
import phone from "./Assets/phone.png";
import email from "./Assets/email.png";
import location from "./Assets/location.png";

const BookingFooter = () => {
  return (
    <div className="bg-black text-white pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Contact Section */}
        <div
          className="relative bg-cover bg-center rounded-lg p-10 flex flex-wrap lg:flex-nowrap justify-between items-center text-white bg-opacity-80"
          style={{ backgroundImage: `url(${footerbackground})` }}
        >
          <div className="max-w-md">
            <h2 className="text-2xl md:text-3xl font-bold text-center md:text-left">
              LOOKING FOR MORE PROPERTIES?
            </h2>
            <p className="mt-2 text-gray-300 text-center md:text-left">
              Let’s work together! Drop us a line to see how we can help.
            </p>
            <div className="flex justify-center md:justify-start">
              <button className="mt-4 px-6 py-2 border border-white rounded-lg hover:bg-white hover:text-black transition">
                Contact us
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white text-black p-6 rounded-lg shadow-lg w-full max-w-md mt-6 lg:mt-0">
            <h3 className="text-lg md:text-xl font-semibold mb-4 text-center">
              Find Your Accessible Homes
            </h3>
            <form className="space-y-3">
              <input
                type="text"
                placeholder="Name"
                className="w-full p-2 border rounded"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 border rounded"
              />
              <input
                type="tel"
                placeholder="Phone number"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Services"
                className="w-full p-2 border rounded"
              />
              <textarea
                placeholder="Write to us"
                className="w-full p-2 border rounded"
              ></textarea>
              <button className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600">
                Submit
              </button>
            </form>
          </div>
        </div>

        {/* Footer Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 border-t border-gray-700 pt-8">
          {/* About Section */}
          <div className="text-center md:text-left">
            <img src={footerlogo} alt="ABV Logo" className="mx-auto md:mx-0" />
            <p className="text-gray-400 mt-2">
              Welcome to Asset Build Ventures, a premier real estate and
              construction company based in Chennai, founded and led by Ganesh
              Veeramuthu.
            </p>
            <div className="flex justify-center md:justify-start space-x-4 mt-4">
              <a href="#" className="hover:opacity-75">
                <img src={facebook} alt="Facebook" className="h-6" />
              </a>
              <a href="#" className="hover:opacity-75">
                <img src={twitter} alt="Twitter" className="h-6" />
              </a>
              <a href="#" className="hover:opacity-75">
                <img src={linkedin} alt="LinkedIn" className="h-6" />
              </a>
              <a href="#" className="hover:opacity-75">
                <img src={instagram} alt="Instagram" className="h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="text-xl font-bold">Quick Links</h4>
            <ul className="mt-2 space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Why Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Properties
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h4 className="text-xl font-bold">Contact Us</h4>
            <ul className="mt-2 space-y-3 text-gray-400">
              <li className="flex items-center justify-center md:justify-start gap-2">
                <img src={phone} alt="Phone" className="h-5" /> +91 8056666902
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <img src={email} alt="Email" className="h-5" />{" "}
                assetbuildventures@gmail.com
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <img src={location} alt="Location" className="h-5" />
                Ground floor, H-block, 5th street, Anna Nagar, Chennai-600040,
                Tamilnadu
              </li>
            </ul>
            <div className="mt-4">
              <h4 className="text-xl font-bold">Signup to get more updates</h4>
              <div className="flex mt-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="p-2 flex-grow rounded-l bg-gray-700 text-white placeholder-gray-400"
                />
                <button className="bg-orange-500 px-4 py-2 rounded-r hover:bg-orange-600">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-center text-gray-500 text-sm mt-8">
          Copyright &copy; 2025 Asset Build Ventures. All rights reserved
        </p>
      </div>
    </div>
  );
};

export default BookingFooter;
