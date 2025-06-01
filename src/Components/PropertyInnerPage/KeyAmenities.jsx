


import React from "react";
import air from "../PropertyInnerPage/Assets/air.png";
import fire from "../PropertyInnerPage/Assets/fire.png";
import sports from "../PropertyInnerPage/Assets/sports.png";
import smoke from "../PropertyInnerPage/Assets/smoke.png";
import kids from "../PropertyInnerPage/Assets/kids.png";
import pet from "../PropertyInnerPage/Assets/pet.png";
import elevator from "../PropertyInnerPage/Assets/elevator.png";
import laundry from "../PropertyInnerPage/Assets/laundry.png";

const amenities = [
  { image: air, label: "Air conditioner" },
  { image: fire, label: "Fire extinguisher" },
  { image: sports, label: "Sports field" },
  { image: smoke, label: "Smoking area" },
  { image: kids, label: "Kids zone" },
  { image: pet, label: "Pet friendly" },
  { image: elevator, label: "Elevator" },
  { image: laundry, label: "Laundry" },
];

const KeyAmenities = () => {
  return (
    <div className="p-6 w-full max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold">Key Amenities</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-6 mt-6 justify-center">
        {amenities.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <img src={item.image} alt={item.label} className="w-12 h-12" />
            <span className="text-gray-700 text-sm mt-2 text-center">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold">Payment Calculator</h2>
        <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
          <p className="text-3xl font-bold">₹30,0000/month</p>
          <p className="text-orange-500 cursor-pointer">Reset</p>
        </div>

        <div className="relative w-full h-4 rounded-lg bg-gray-300 mt-4">
          <div
            className="absolute top-0 left-0 h-full bg-orange-500 rounded-l-lg"
            style={{ width: "60%" }}
          ></div>
          <div
            className="absolute top-0 left-[60%] h-full bg-yellow-500"
            style={{ width: "20%" }}
          ></div>
          <div
            className="absolute top-0 left-[80%] h-full bg-black rounded-r-lg"
            style={{ width: "10%" }}
          ></div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center text-sm text-gray-700 mt-4">
          <div>
            <p className="text-orange-500">⬤ Principal & interest</p>
            <p>₹20,000</p>
          </div>
          <div>
            <p className="text-yellow-500">⬤ Property taxes</p>
            <p>₹20,000</p>
          </div>
          <div>
            <p className="text-black">⬤ Homeowners insurance</p>
            <p>₹20,000</p>
          </div>
        </div>
      </div>

      <div className="mt-10 border border-gray-400 p-6 rounded-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className="text-center border-r">
          <p className="text-gray-600 text-sm">Down payment</p>
          <p className="font-semibold">20% (₹3,00,000) ✏</p>
        </div>
        <div className="text-center border-r">
          <p className="text-gray-600 text-sm">Home price</p>
          <p className="font-semibold">₹2CR ✏</p>
        </div>
        <div className="text-center border-r">
          <p className="text-gray-600 text-sm">Loan details</p>
          <p className="font-semibold">30-yr Nego. 6.67% ✏</p>
        </div>
        <div className="text-center">
          {/* <p className="text-gray-600 text-sm">Additional Info</p> */}
          <p className="">...</p>
        </div>
      </div>
    </div>
  );
};

export default KeyAmenities;
