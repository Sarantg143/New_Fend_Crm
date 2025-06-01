import { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaBed } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

export default function PropertyCards() {
  const [selectedType, setSelectedType] = useState("All");
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { propertyId } = location.state;
  const selectedBuilder = location.state?.builderName;
  const builderId = location.state?.builderId; // Get builderId from location state

  const BASE_URL = "https://crm-bcgg.onrender.com";
  const token = JSON.parse(sessionStorage.getItem("logindata"))?.token;

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        let url = `${BASE_URL}/api/properties/projects`;
        
        // If builderId is available, fetch properties by builder
        if (builderId) {
          url = `${BASE_URL}/api/properties/projects/by-builder/${builderId}`;
        }

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        // Transform API data to match your expected format
        const formattedProperties = response.data.map(property => ({
  id: property._id,
  name: property.projectName,
  type: property.propertyType || "Apartments",
  price: property.price ? `₹${property.price}` : "Price on request",
  location: `${property.location?.city || 'Unknown City'}, ${property.location?.area || ''}`,
  bed: property.bedrooms || 0,
  bath: property.bathrooms || 0,
  sqft: property.area || 0 ,
  buildername: property.builder?.name || "Unknown Builder",
  images: property.media?.photos?.length > 0 
    ? property.media.photos.map(photo => photo.url) 
    : ["https://cdnassets.hw.net/04/2c/967deff449bd8a24c5fbb96dccd2/6474f8a03a894163ac235432988b491f.png"],
  videos: property.media?.videos?.map(video => video.url) || [],
  threeDVideos: property.media?.threeDVideo?.map(video => video.url) || [],
  description: property.description || '',
  amenities: property.amenities || [],
  possessionDate: property.possessionDate,
  specifications: property.specifications || ''
}));

        setProperties(formattedProperties);
      } catch (err) {
        console.error("Failed to fetch properties:", err);
        setError("Failed to load properties. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [builderId, token]);

  // Filter by both type and builder if builder is selected
  const filteredProperties = properties.filter((property) => {
    const typeMatch = selectedType === "All" || property.type === selectedType;
    const builderMatch =
      !selectedBuilder || property.buildername === selectedBuilder;
    return typeMatch && builderMatch;
  });

  if (loading) {
    return (
      <div className="p-4 md:p-6 flex flex-col items-center">
        <div className="w-full max-w-6xl text-center py-20">
          <p>Loading properties...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 md:p-6 flex flex-col items-center">
        <div className="w-full max-w-6xl text-center py-20 text-red-500">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 flex flex-col items-center">
      <motion.div
        className="w-full max-w-5xl text-center mb-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ amount: 0.5 }}
      >
        <p className="text-lg font-semibold mb-4">
          {selectedBuilder
            ? `${selectedBuilder} Properties`
            : "Explore the properties that suit your lifestyle"}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {["All", "Apartments", "Villas", "Plots", "Land"].map((type) => (
            <motion.button
              key={type}
              onClick={() => setSelectedType(type)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full border text-sm md:text-base transition-all duration-300 ${
                selectedType === type
                  ? "border-orange-500 text-orange-500 bg-orange-100 shadow-md"
                  : "border-gray-500 text-gray-500 bg-transparent"
              }`}
            >
              {type}
            </motion.button>
          ))}
        </div>
      </motion.div>
      
      {filteredProperties.length === 0 ? (
        <div className="w-full max-w-6xl text-center py-20">
          <p>No properties found matching your criteria.</p>
        </div>
      ) : (
        <motion.div
          className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ amount: 0.5 }}
        >
          {filteredProperties.map((property, index) => (
            <motion.div
              key={property.id}
              className="rounded-2xl overflow-hidden relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ amount: 0.5 }}
            >
              <div className="relative">
                <img
                  src={property.images[0]}
                  alt={property.name}
                  className="w-full h-48 sm:h-56 object-cover"
                />
                <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs font-medium px-3 py-1 rounded">
                  {property.buildername}
                </div>
              </div>
              <div className="p-4 md:p-5">
                <span className="bg-orange-400 text-white text-xs font-semibold px-2 py-1 rounded">
                  New Launch
                </span>
                <h2 className="text-lg font-semibold mt-2 text-left">
                  {property.name}
                </h2>
                <p className="text-orange-600 font-bold text-sm text-left">
                  {property.price}
                </p>
                <p className="text-gray-600 flex items-center text-sm mt-2 text-left">
                  <FaMapMarkerAlt className="mr-2" /> {property.location}
                </p>
                <p className="text-gray-600 flex items-center text-sm mt-2 text-left">
                  <FaBed className="mr-2" /> {property.bed} Beds, {property.bath}{" "}
                  Baths, {property.sqft} sqft
                </p>
                <div className="flex mt-4">
                  <button
                   onClick={() => {  console.log("Clicked property ID:", property.id);navigate("/property", { state: { propertyId: property.id } });
}}
                    className="bg-black text-white px-4 py-2 rounded-lg text-sm md:text-base"
                  >
                    View More
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}