import React, { useEffect, useState } from "react";
import axios from "axios";
import Popup from "./Popup";
import { Link, useNavigate } from "react-router-dom";


const categories = ["All", "Apartment", "Villa", "Plot", "Land"];

const Apartments = () => {

  const [properties, setProperties] = useState([]);
  const [selected, setSelected] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get("https://crm-bcgg.onrender.com/api/properties/builder-profile");
        setProperties(response.data);
      } catch (err) {
        setError("Failed to fetch properties.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const filteredProperties = Array.isArray(properties) ? properties.filter((property) => {
  // Add a check here
  if (property.type === undefined) {
    console.warn('Property type is undefined for an item:', property);
  }
  const matchesCategory =
    selected === "All" ||
    (property.type && property.type.toLowerCase() === selected.toLowerCase()); // Add a check before toLowerCase
  const matchesLocation =
    !selectedLocation || property.location === selectedLocation;
  return matchesCategory && matchesLocation;
}) : [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 mt-10">
      {/* Location Popup */}
      <Popup
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
      />

      {/* Location Filter Display */}
      {selectedLocation && (
        <div className="mb-4 flex items-center gap-2">
          <span className="text-sm">Filtering by location: </span>
          <span className="font-semibold">{selectedLocation}</span>
          <button
            onClick={() => setSelectedLocation(null)}
            className="ml-2 text-sm text-red-500 hover:text-red-700"
          >
            Clear
          </button>
        </div>
      )}

      {/* Heading and View All */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold leading-snug">
            Explore Properties That Suit
            <br />
            Your Lifestyle
          </h2>
        </div>
        <Link
          to="/login"
          className="text-white bg-orange-600 hover:bg-orange-700 px-4 py-2 text-sm rounded"
        >
          View all
          </Link>
      </div>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelected(cat)}
            className={`px-4 py-1 rounded-full border ${
              selected === cat
                ? "bg-orange-600 text-white border-orange-600"
                : "text-gray-700 border-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Property Grid */}
      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading properties...</div>
      ) : error ? (
        <div className="text-center py-10 text-red-500">{error}</div>
      ) : filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <div
              key={property.id}
              className="relative w-full h-[300px] rounded-lg overflow-hidden shadow-md group"
            >
              <img
                onClick={() =>
                  navigate("/builder", {
                  state: { builderId: property._id },
                  })
                }
                src={
        property.coverPhotos?.length > 0
          ? property.coverPhotos[0].url
          : property.logo
      }
      alt={property.companyName}
      className="w-full h-full object-cover transition-transform group-hover:scale-105"
    />

              <div className="absolute top-2 left-2 bg-white bg-opacity-80 text-black text-xs font-medium px-3 py-1 rounded-r-lg shadow">
                {property.address.city}
              </div>
              <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-sm px-3 py-1 rounded-l-lg shadow">
                {property.companyName}
              </div>
              <div className="absolute flex gap-2 bottom-0 left-0 w-full bg-black bg-opacity-10 text-white text-xs px-4 py-2">
                <p className="border border-white rounded-full px-2 py-1">
                  {property.bed} Bed
                </p>
                <p className="border border-white rounded-full px-2 py-1">
                  {property.bath} Bath
                </p>
                <p className="border border-white rounded-full px-2 py-1">
                  {property.kitchen} Kitchen
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500">
            No properties found matching your filters.
          </p>
          <button
            onClick={() => {
              setSelected("All");
              setSelectedLocation(null);
            }}
            className="mt-4 text-orange-600 hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Apartments;