import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import location1 from "../HomePage/Assets/location1.png";
import bed from "../HomePage/Assets/bed.png";
import bath from "../HomePage/Assets/bath.png";

import ApartmentsData from "../HomePage/ApartmentsData.json"; // ✅ JSON data

const FeaturedProperties = () => {
  const [activeCity, setActiveCity] = useState("All");
  const [shuffledProperties, setShuffledProperties] = useState([]);
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  // ✅ Dynamically extract unique city names
  const cities = [
    "All",
    ...new Set(ApartmentsData.map((item) => item.location)),
  ];

  const shuffleArray = (array) => {
    return array
      .map((item) => ({ ...item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ sort, ...item }) => item);
  };

 useEffect(() => {
  const fetchBuilders = async () => {
    try {
      const response = await fetch(
        "https://crm-bcgg.onrender.com/api/properties/builder-profile"
      );
      const data = await response.json();

      const mapped = data.map((item) => ({
        name: item.companyName || "N/A",
        image:
          item.coverPhotos?.[0]?.url ||
          item.gallery?.[0]?.url ||
          "https://via.placeholder.com/300",
        location: `${item.address?.city}, ${item.address?.state}`,
        price: "N/A", // You can leave this out or add static info
        bed: "N/A",   // Not relevant to builder
        bath: "N/A",  // Not relevant to builder
      }));

      setShuffledProperties(shuffleArray(mapped));
    } catch (error) {
      console.error("Failed to fetch builders:", error);
    }
  };

  fetchBuilders();
}, [activeCity]);



  return (
    <motion.div
      ref={sectionRef}
      className="mt-10 px-4 md:px-10 max-w-7xl mx-auto"
      initial={{ x: -100, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.3 }}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <p className="text-sm text-red-600 mb-1">Featured Properties</p>
          <h2 className="text-2xl font-semibold text-gray-800">
            Consolidation of 'exclusive' properties in your city
          </h2>
        </div>
        <button className="bg-black text-white font-bold py-2 px-4 rounded mt-4 md:mt-0 transition duration-300">
          View all
        </button>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        {cities.map((city) => (
          <button
            key={city}
            onClick={() => setActiveCity(city)}
            className={`px-4 py-2 rounded-full text-sm transition duration-300 ${
              activeCity === city
                ? "bg-black text-white"
                : "border border-gray-400 text-gray-600 hover:bg-gray-100"
            }`}
          >
            {city}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {shuffledProperties.map((property, index) => (
            <motion.div
              key={`${property.name}-${property.location}-${index}`}
              className="rounded-xl overflow-hidden transition hover:shadow-xl"
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: index % 2 === 0 ? 100 : -100 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              layout
            >
              <img
  src={property.image}
  alt={property.name}
  className="w-full h-48 object-cover"
/>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {property.name}
                </h3>
                <p className="text-red-600 font-medium mb-2">
                  {property.price}
                </p>
                <div className="flex items-center text-gray-500 mb-2">
                  <img
                    src={location1}
                    alt="location"
                    className="w-4 h-4 mr-2"
                  />
                  <span>{property.location}</span>
                </div>
                <div className="border-b my-2"></div>
                <div className="flex gap-2 text-gray-600 text-sm mt-2">
                  <span className="flex items-center gap-2">
                    <img src={bed} alt="bed" className="w-5 h-5" />
                    {property.bed} Beds
                  </span>
                  <span className="flex items-center gap-2">
                    <img src={bath} alt="bath" className="w-5 h-5" />
                    {property.bath} Bath
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default FeaturedProperties;
