import React from "react";
import footerlogo from "../BuilderInnerPage/Assets/footerlogo.png";
import facebook from "../BuilderInnerPage/Assets/facebook.png";
import twitter from "../BuilderInnerPage/Assets/twitter.png";
import instagram from "../BuilderInnerPage/Assets/instagram.png";
import linkedin from "../BuilderInnerPage/Assets/linkedin.png";
import phone from "../BuilderInnerPage/Assets/phone.png";
import email from "../BuilderInnerPage/Assets/email.png";
import location from "../BuilderInnerPage/Assets/location.png";
import footerbackground from "../BuilderInnerPage/Assets/Footer background.png";

const BuilderFooter = () => {
  return (
    <div className="bg-black text-white pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div
          className="relative bg-cover bg-center rounded-lg p-6 md:p-10 flex flex-col items-center text-center text-white bg-opacity-80 transition-transform transform hover:scale-105"
          style={{ backgroundImage: `url(${footerbackground})` }}
        >
          <h2 className="text-2xl md:text-3xl font-bold">
            LOOKING FOR MORE <br/>PROPERTIES?
          </h2>
          <p className="mt-2 text-gray-300">
            Let’s work together! <br/>Drop us a line to see how we can help.
          </p>
          <button className="mt-4 px-6 py-2 border border-white rounded-lg hover:bg-white hover:text-black transition duration-300 ease-in-out">
            Contact us
          </button>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 border-t border-gray-700 pt-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <img
              src={footerlogo}
              alt="Footer Logo"
              className="mx-auto md:mx-0 hover:scale-110 transition duration-300"
            />
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
              {[
                "About Us",
                "Why Us",
                "Properties",
                "Testimonials",
                "Contact Us",
              ].map((text, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="hover:text-white transition duration-300 ease-in-out"
                  >
                    {text}
                  </a>
                </li>
              ))}
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
                  <img src={item.icon} alt="Icon" className="h-5" /> {item.text}
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
  );
};

export default BuilderFooter;
