import React, { useState, useEffect } from "react";
import { Heart, HeartIcon, MapPin, Home, DollarSign } from "lucide-react";
import axios from "axios";

const SavedProperties = () => {
  const [savedList, setSavedList] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSavedProperties = async () => {
      try {
        const loginData = sessionStorage.getItem("logindata");
        if (!loginData) {
          throw new Error("No login data found");
        }

        const { token } = JSON.parse(loginData);
        
        const response = await axios.get(
          "https://crm-bcgg.onrender.com/api/saved-property/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const mappedProperties = response.data.map(property => ({
          id: property._id,
          name: `${property.unit?.floor?.building?.project?.projectName || "Property"} - ${property.unit?.unitNumber || ""}`,
          location: `${property.unit?.floor?.building?.project?.location?.area || "Unknown Area"}, ${property.unit?.floor?.building?.project?.location?.city || "Unknown City"}`,
          type: property.unit?.bhkType || "Property",
          price: property.unit?.price?.totalPrice || 0,
          liked: true,
          image: property.unit?.photos?.[0]?.url || 
                property.unit?.floor?.building?.project?.media?.photos?.[0]?.url || 
                "https://via.placeholder.com/300x200?text=No+Image",
          unitDetails: {
            size: property.unit?.sizeSqFt,
            facing: property.unit?.facing,
            availability: property.unit?.availability
          }
        }));

        setSavedList(mappedProperties);
      } catch (err) {
        console.error("Error fetching saved properties:", err);
        setError(err.message || "Failed to load saved properties");
      } finally {
        setLoading(false);
      }
    };

    fetchSavedProperties();
  }, []);

  const handleRemove = async (id) => {
    try {
      const loginData = sessionStorage.getItem("logindata");
      if (!loginData) {
        throw new Error("No login data found");
      }

      const { token } = JSON.parse(loginData);
      
      await axios.delete(
        `https://crm-bcgg.onrender.com/api/saved-property/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSavedList(prev => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Error removing property:", err);
      setError("Failed to remove property");
    }
  };

  const toggleLike = async (id) => {
    try {
      const loginData = sessionStorage.getItem("logindata");
      if (!loginData) {
        throw new Error("No login data found");
      }

      const { token } = JSON.parse(loginData);
      
      await axios.delete(
        `https://crm-bcgg.onrender.com/api/saved-property/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSavedList(prev => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Error removing property:", err);
      setError("Failed to remove property");
    }
  };

  const sortedList = [...savedList].sort((a, b) => {
    if (sortBy === "price") return a.price - b.price;
    if (sortBy === "location") return a.location.localeCompare(b.location);
    return 0;
  });

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Saved Properties</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
              <div className="w-full h-48 bg-gray-200"></div>
              <div className="p-4">
                <div className="h-6 w-3/4 bg-gray-200 rounded mb-4"></div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
                  <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
                  <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
                </div>
                <div className="h-10 w-full bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Saved Properties</h1>
        <div className="text-red-500 p-4 bg-red-50 rounded-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-semibold mb-4 md:mb-0">Saved Properties</h1>
        
        <div className="flex items-center">
          <label className="mr-2 font-medium text-gray-700">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">None</option>
            <option value="price">Price</option>
            <option value="location">Location</option>
          </select>
        </div>
      </div>

      {sortedList.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No saved properties found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedList.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative">
                <img
                  src={property.image}
                  alt={property.name}
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={() => toggleLike(property.id)}
                  className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                >
                  {property.liked ? (
                    <Heart className="text-red-500 fill-current" size={20} />
                  ) : (
                    <HeartIcon className="text-gray-400" size={20} />
                  )}
                </button>
              </div>

              <div className="p-4">
                <h2 className="text-lg font-bold mb-2 text-gray-800">{property.name}</h2>
                
                <div className="flex flex-wrap gap-2 mb-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="mr-1" size={14} />
                    <span>{property.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Home className="mr-1" size={14} />
                    <span>{property.type}</span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="mr-1" size={14} />
                    <span>₹{property.price.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleRemove(property.id)}
                  className="w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedProperties;