import React from "react";
import Avenuepark from "../HomePage/Assets/Avenuepark.png";
import offer from "../HomePage/Assets/offer.png";
import highlightsline from "../BuilderInnerPage/Assets/highlightsline.png";
import slide1 from "../BuilderInnerPage/Assets/slide1.jpg";

const PropertyHighlights = () => {
  return (
    <div
      className="relative w-full h-screen flex items-center justify-center bg-black"
      style={{
        backgroundImage: `url(${slide1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* navbar */}
      <div className="absolute top-5 left-1/2 transform -translate-x-1/2 flex space-x-8 text-white font-semibold">
        <h1>Apartments</h1>
        <h1>Individual House</h1>
        <h1>Ongoing products</h1>
        <h1>Contact Us</h1>
        <h1>Blogs</h1>
      </div>
      {/* navbar */}

      {/* Logo */}
      <div className="absolute top-5 left-5 md:top-10 md:left-16 bg-white p-2 md:p-3 rounded-md shadow-lg">
        <img
          src={Avenuepark}
          alt="Casagrand Avenuepark Logo"
          className="w-24 md:w-32 h-auto"
        />
      </div>

      {/* Main Content */}
      <div className="absolute top-24 left-5 md:top-40 md:left-16 text-white">
        <h1 className="text-3xl md:text-5xl font-bold leading-snug">
          Casagrand Avenuepark <br /> highlight
        </h1>
        {/* <button className="mt-4 px-4 py-2 md:px-6 md:py-2 border-2 border-white text-white font-medium rounded-md hover:bg-white hover:text-black transition">
          Explore properties
        </button> */}
        <img src={highlightsline} alt="" className="mt-12" />
      </div>

      {/* Offer Badge (Bottom Right) */}
      <div className="absolute bottom-24 right-5 md:bottom-28 md:right-10 w-24 md:w-auto">
        <img src={offer} alt="Offer Badge" />
      </div>
    </div>
  );
};

export default PropertyHighlights;