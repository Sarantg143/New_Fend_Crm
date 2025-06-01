import React from "react";
import Bouganville from "../BookingInnerPage/Assets/Bouganville.png";
import Booklocation from "../BookingInnerPage/Assets/booklocation.png";
import sqft from "../BookingInnerPage/Assets/sqft.png";
import bed from "../BookingInnerPage/Assets/bed.png";
import Apartment from "../BookingInnerPage/Assets/Apartment.png";


const BookingDetails = () => {
  return (
    <div className="w-full p-6">
      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Booking Form */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Booking Details</h2>
          <form className="space-y-2">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="First name*"
                className="border border-gray-300 p-2 rounded text-sm w-full"
                required
              />
              <input
                type="text"
                placeholder="Last name*"
                className="border border-gray-300 p-2 rounded text-sm w-full"
                required
              />
            </div>

            {/* Country */}
            <input
              type="text"
              placeholder="United States ( US )"
              className="border border-gray-300 p-2 rounded text-sm w-full"
              readOnly
            />

            {/* Address */}
            <input
              type="text"
              placeholder="Street Address*"
              className="border border-gray-300 p-2 rounded text-sm w-full"
              required
            />
            <input
              type="text"
              placeholder="Town / City*"
              className="border border-gray-300 p-2 rounded text-sm w-full"
              required
            />
            <input
              type="text"
              placeholder="ZIP Code"
              className="border border-gray-300 p-2 rounded text-sm w-full"
            />

            {/* Email & Phone */}
            <input
              type="email"
              placeholder="Email Address*"
              className="border border-gray-300 p-2 rounded text-sm w-full"
              required
            />
            <input
              type="tel"
              placeholder="Phone*"
              className="border border-gray-300 p-2 rounded text-sm w-full"
              required
            />

            {/* Additional Message */}
            <textarea
              placeholder="Add Something"
              className="border border-gray-300 p-2 rounded text-sm w-full h-16"
            ></textarea>

            {/* Submit Button */}
            <button className="bg-orange-500 text-white font-bold py-2 px-4 rounded w-full text-sm">
              Book Now
            </button>
          </form>
        </div>

        {/* Property Details */}
        <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
          {/* Property Image */}
          <img
            src={Bouganville}
            alt="Property"
            className="w-full h-52 object-cover"
          />

          {/* Property Details */}
          <div className="p-4">
            <h2 className="text-lg font-semibold text-red-600">Bouganville</h2>
            <div className="flex items-center text-gray-600 text-xs mt-1">
              <img
                src={Booklocation}
                alt="Location"
                className="w-4 h-6 mr-2"
              />
              <span className="text-sm">Koyambedu, Chennai</span>
            </div>
            <p className="text-orange-600 font-bold text-base mt-2">
              ₹2CR - 2.5CR
            </p>

            {/* Property Features */}
            <div className="border-t border-gray-300 mt-3 pt-2 text-gray-700 text-sm">
              <div className="flex gap-4 p-2">
                <div className="flex items-center">
                  <img
                    src={sqft}
                    alt="Sqft"
                    className="w-4 h-6 mr-1"
                  />
                  <span>Sqft: 3567</span>
                </div>
                <div className="flex items-center">
                  <img
                    src={bed}
                    alt="Units"
                    className="w-4 h-5 mr-1"
                  />
                  <span>Units: 2BHK</span>
                </div>
              </div>
              <div className="flex p-2 items-center  mt-2">
                <img
                  src={Apartment}
                  alt="Building Type"
                  className="w-4 h-5 mr-1"
                />
                <span>Type: Residential Apartment</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
