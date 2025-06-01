import React, { useState, useEffect } from "react";
import Avenuepark from "../HomePage/Assets/Avenuepark.png";
import offer from "../HomePage/Assets/offer.png";
import highlightsline from "../BuilderInnerPage/Assets/highlightsline.png";
import slide1 from "../BuilderInnerPage/Assets/slide1.jpg";
import slide2 from "../BuilderInnerPage/Assets/slide2.webp";
import slide3 from "../BuilderInnerPage/Assets/slide3.webp";
import slide4 from "../BuilderInnerPage/Assets/slide4.webp";

const slides = [slide1, slide2, slide3, slide4];

const PropertyHighlights = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-black">
      {/* Slideshow */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide}
            alt={`Slide ${index + 1}`}
            className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

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
        <button className="mt-4 px-4 py-2 md:px-6 md:py-2 border-2 border-white text-white font-medium rounded-md hover:bg-white hover:text-black transition">
          Explore properties
        </button>
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
