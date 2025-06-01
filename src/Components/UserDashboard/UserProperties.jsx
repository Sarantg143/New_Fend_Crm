import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PropertiesPage = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("https://crm-bcgg.onrender.com/api/properties/project");
        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }
        const data = await response.json();
        setProperties(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const handlePropertyClick = (propertyId) => {
    console.log("Navigating with property ID:", propertyId);
    navigate("/property", { state: { propertyId } });
  };

  const formatLocation = (location) => {
    if (!location) return "Location not available";
    if (typeof location === "string") return location;
    return `${location.city || ""}, ${location.area || ""} ${location.pincode ? `- ${location.pincode}` : ""}`.trim();
  };

  if (loading) {
    return <div className="max-w-7xl mx-auto p-4 text-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-4 text-center text-red-500">
        Error: {error}
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="max-w-7xl mx-auto p-4 text-center">
        No properties found
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {properties.map((property, index) => {
        const firstPhoto = property.media?.photos?.[0]?.url || "/images/fallback-property.jpg";

        return (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 cursor-pointer hover:shadow-lg transition-shadow duration-300"
            onClick={() => handlePropertyClick(property._id)} // Changed to pass property._id
          >
            <div className="relative">
              <img
                src={firstPhoto}
                alt="Property"
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/images/fallback-property.jpg";
                }}
              />
              <span className="absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                {property.propertyType || "Property"}
              </span>
            </div>

            <div className="p-4">
              <h2 className="text-lg font-semibold mb-1">
                {property.projectName || "N/A"}
              </h2>
              <p className="text-sm text-gray-600 mb-1">
                {property.propertyType || "Not specified"}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                📍 {formatLocation(property.location)}
              </p>

              <div className="flex items-center justify-between text-sm text-gray-700 mb-2">
                <span>📐 {property.sqft || "N/A"} Sq.ft</span>
                <span>🛁 {property.bath || "N/A"} Bathrooms</span>
                <span>📅 {property.possessionDate ? new Date(property.possessionDate).toLocaleDateString() : "N/A"}</span>
              </div>

              <div className="text-base text-gray-600 mb-2">
                ₹ {property.price || "N/A"}{" "}
                {property.sqft && property.price && (
                  <span className="text-sm text-gray-600">
                    ( ₹ {Math.round(property.price / property.sqft)} per Sq.Ft. )
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PropertiesPage;