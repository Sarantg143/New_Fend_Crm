import { useState } from "react";

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

const TestimonialsPage = () => {
  const [activeCity, setActiveCity] = useState("All Cities");

  const cities = [
    "All Cities",
    "Delhi/NCR",
    "Mumbai",
    "Pune",
    "Bangalore",
    "Kolkata",
    "Chennai",
    "Hyderabad",
  ];

  const testimonials = [
    {
      id: 1,
      name: "Santosh Bhagawan Dhumane",
      role: "Owner Sangamvadi",
      city: "Pune",
      rating: 4,
      content:
        "My office space at Pune got leased out through 99 acres & My RM Shivam Bathala cooperated me very nicely.",
      happyCustomer: true,
      initials: "SD",
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      role: "Business Owner",
      city: "Delhi/NCR",
      rating: 5,
      content:
        "Excellent service! Found my dream office space in Gurgaon within a week of searching.",
      happyCustomer: true,
      initials: "RK",
    },
    {
      id: 3,
      name: "Priya Sharma",
      role: "Startup Founder",
      city: "Bangalore",
      rating: 4,
      content:
        "The team helped me navigate through multiple options and found the perfect coworking space for my startup.",
      happyCustomer: true,
      initials: "PS",
    },
    {
      id: 4,
      name: "Amit Patel",
      role: "IT Professional",
      city: "Hyderabad",
      rating: 3,
      content:
        "Good experience overall, though the process took longer than expected.",
      happyCustomer: false,
      initials: "AP",
    },
    {
      id: 5,
      name: "Neha Gupta",
      role: "Retail Store Owner",
      city: "Mumbai",
      rating: 5,
      content:
        "Amazing support throughout the leasing process. Highly recommended for commercial property in Mumbai.",
      happyCustomer: true,
      initials: "NG",
    },
    {
      id: 6,
      name: "Vikram Singh",
      role: "Corporate Office Manager",
      city: "Chennai",
      rating: 4,
      content:
        "Reliable service with good options in prime locations. Negotiation support was particularly helpful.",
      happyCustomer: true,
      initials: "VS",
    },
  ];

  const filteredTestimonials =
    activeCity === "All Cities"
      ? testimonials
      : testimonials.filter((testimonial) => testimonial.city === activeCity);

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex mb-6" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <a
                  href="#"
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
                >
                  <svg
                    className="w-3 h-3 mr-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                  </svg>
                  Home
                </a>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg
                    className="w-3 h-3 text-gray-400 mx-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                    Testimonials
                  </span>
                </div>
              </li>
            </ol>
          </nav>

          {/* Page Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Testimonials
          </h1>

          {/* City Filters */}
          <div className="flex flex-wrap gap-2 mb-10">
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setActiveCity(city)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCity === city
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {city}
              </button>
            ))}
          </div>

          {/* Testimonials Grid */}
          {filteredTestimonials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTestimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  {/* Rating */}
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < testimonial.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-gray-600 mb-4">{testimonial.content}</p>

                  {/* Author */}
                  <div className="flex items-center">
                    <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center text-blue-600 font-medium mr-3">
                      {testimonial.initials}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {testimonial.role}, {testimonial.city}
                      </p>
                    </div>
                  </div>

                  {/* Happy Customer Tag */}
                  {testimonial.happyCustomer && (
                    <div className="mt-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <svg
                          className="-ml-0.5 mr-1.5 h-2 w-2 text-green-400"
                          fill="currentColor"
                          viewBox="0 0 8 8"
                        >
                          <circle cx="4" cy="4" r="3" />
                        </svg>
                        HAPPY CUSTOMER
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-xl text-center">
              <p className="text-gray-500">
                No testimonials found for {activeCity}
              </p>
            </div>
          )}
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

export default TestimonialsPage;