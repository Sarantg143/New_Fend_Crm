import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import location1 from "../HomePage/Assets/location1.png";
import sqftIcon from "../HomePage/Assets/sqft.png";
import bedIcon from "../HomePage/Assets/bed.png";
import bathIcon from "../HomePage/Assets/bath.png";
import Larrow from "../HomePage/Assets/Larrow.png";
import Rarrow from "../HomePage/Assets/Rarrow.png";

import ApartmentsData from "../HomePage/ApartmentsData.json"; // Your local JSON import

const TopApartmentProject = () => {
  const [apartments, setApartments] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;

  useEffect(() => {
    const formattedData = ApartmentsData.map((item) => ({
      name: item.name,
      price: item.price,
      sqft: item.sqft,
      beds: `${item.bed} Beds`,
      baths: `${item.bath} Bath`,
      location: item.location,
      image: item.images[0],
    }));
    setApartments(formattedData);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0
        ? Math.max(apartments.length - itemsPerPage, 0)
        : prevIndex - itemsPerPage
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + itemsPerPage >= apartments.length
        ? 0
        : prevIndex + itemsPerPage
    );
  };

  const visibleApartments = useMemo(() => {
    return apartments.slice(
      currentIndex,
      Math.min(currentIndex + itemsPerPage, apartments.length)
    );
  }, [apartments, currentIndex]);

  return (
    <motion.div className="relative w-full max-w-7xl mx-auto px-10 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Top Apartment Projects</h2>
      </div>

      {apartments.length === 0 ? (
        <p className="text-center text-gray-500">Loading apartments...</p>
      ) : (
        <div className="relative flex items-center justify-center">
          {apartments.length > itemsPerPage && (
            <button
              onClick={goToPrevious}
              className="absolute z-10 p-3 rounded-full hidden sm:block"
              style={{
                top: "50%",
                transform: "translateY(-50%)",
                left: "-30px",
              }}
              aria-label="Previous Slide"
            >
              <img src={Larrow} alt="Previous" className="w-6 h-6" />
            </button>
          )}

          <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-[90%] mx-auto">
            {visibleApartments.map((apartment, index) => (
              <motion.div
                key={index}
                className="rounded-lg overflow-hidden w-[90%] mx-auto"
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
                }}
              >
                <img
                  src={apartment.image}
                  alt={`Image of ${apartment.name}`}
                  className="w-full h-40 sm:h-48 md:h-60 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-bold">{apartment.name}</h2>
                  <p className="text-lg mt-1 text-red-600 font-semibold">
                    {apartment.price}
                  </p>
                  <p className="text-sm mt-1 text-gray-500 flex items-center gap-2">
                    <img src={location1} alt="Location" className="w-4 h-4" />
                    {apartment.location}
                  </p>
                  <p className="border-b p-2"></p>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <img src={sqftIcon} alt="Size Icon" className="w-4 h-4" />
                      {apartment.sqft} Sqft
                    </span>
                    <span className="flex items-center gap-1">
                      <img src={bedIcon} alt="Bed Icon" className="w-4 h-4" />
                      {apartment.beds}
                    </span>
                    <span className="flex items-center gap-1">
                      <img src={bathIcon} alt="Bath Icon" className="w-4 h-4" />
                      {apartment.baths}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {apartments.length > itemsPerPage && (
            <button
              onClick={goToNext}
              className="absolute z-10 p-3 text-xl font-bold hidden sm:block"
              style={{
                top: "50%",
                transform: "translateY(-60%)",
                right: "-30px",
              }}
              aria-label="Next Slide"
            >
              <img src={Rarrow} alt="Next" className="w-6 h-6" />
            </button>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default TopApartmentProject;
