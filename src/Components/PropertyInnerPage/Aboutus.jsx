import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import img from "../PropertyInnerPage/Assets/img.webp";
import img6 from "../PropertyInnerPage/Assets/IMG6.jpg";
import img2 from "../PropertyInnerPage/Assets/IMG2.jpg";
import location1 from "../PropertyInnerPage/Assets/location1.png";
import bed from "../PropertyInnerPage/Assets/bed.png";
import sqft from "../PropertyInnerPage/Assets/sqft.png";
import apartment from "../PropertyInnerPage/Assets/apartment.png";

const Aboutus = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { propertyId } = location.state || {};

  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        if (!propertyId) throw new Error("No property ID provided");

        const response = await fetch(
          `https://crm-bcgg.onrender.com/api/properties/buildings/by-project/${propertyId}`
        );

        if (!response.ok) throw new Error("Failed to fetch property data");

        const data = await response.json();
        setBuildings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyData();
  }, [propertyId]);

  if (loading) return <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">Loading...</div>;
  if (error) return <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">Error: {error}</div>;
  if (buildings.length === 0) return <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">No buildings found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
      {buildings.map((building) => (
        <div key={building._id} className="mb-16 pb-12 border-b last:border-b-0">
          {/* Image Section */}
          <div className="flex flex-col lg:flex-row gap-6 md:gap-10 lg:gap-14 items-center">
            <img
              src={building.photos?.[0] || img}
              alt="Property"
              className="w-full lg:w-1/2 h-[350px] md:h-[500px] rounded-lg shadow-lg object-cover"
            />
            <div className="flex flex-col gap-4 w-full lg:w-1/2">
              <img
                src={building.photos?.[1] || img2}
                alt="Property"
                className="w-full h-[200px] md:h-[250px] rounded-lg shadow-md object-cover"
              />
              <img
                src={building.photos?.[2] || img6}
                alt="Property"
                className="w-full h-[200px] md:h-[250px] rounded-lg shadow-md object-cover"
              />
            </div>
          </div>

          {/* Details Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
            <div className="lg:col-span-2">
              <h1 className="text-3xl font-bold text-red-600">{building.buildingName || "Bouganville"}</h1>
              <div className="flex flex-col mt-3 space-y-2">
                <p className="text-gray-600 flex items-center gap-2">
                  <img src={location1} alt="Location" className="w-5 h-5" />
                  Koyambedu, Chennai
                </p>
                <p className="text-xl font-semibold text-red-500">
                  ₹2CR - 2.5CR
                </p>
              </div>
              <div className="flex flex-wrap gap-6 mt-6 text-gray-700 text-sm border-b pb-4">
                <p className="flex items-center gap-2">
                  <img src={sqft} alt="Sqft" className="w-5 h-5" />
                  Floors: {building.floorsCount || "10"}
                </p>
                <p className="flex items-center gap-2">
                  <img src={bed} alt="Units" className="w-5 h-5" />
                  Units: 2BHK
                </p>
                <p className="flex items-center gap-2">
                  <img src={apartment} alt="Type" className="w-5 h-5" />
                  Type: Residential Apartment
                </p>
              </div>

              <button
                onClick={() =>
                  navigate("/clientbooking", {
                    state: {
                      propertyId,
                      buildingId: building._id,
                    },
                  })
                }
                className="mt-6 bg-red-500 text-white px-8 py-3 rounded-full shadow-md hover:bg-red-600 transition-all"
              >
                Book Now
              </button>

              <h2 className="mt-8 text-xl font-semibold">About the property</h2>
              <p className="text-gray-600 mt-3 text-base leading-relaxed">
                {building.description ||
                  "Nestled in a prime location, this property is the epitome of luxurious living. Designed for those who seek tranquility without compromising on modern conveniences, this property offers a harmonious blend of sophistication, comfort, and timeless elegance."}
              </p>
            </div>

            {/* Appointment Form */}
            {/* <div className="p-6 rounded-lg shadow-md bg-gray-100">
              <h3 className="text-lg text-center font-semibold mb-6">
                Schedule an Appointment
              </h3>
              <div className="space-y-4">
                <input type="text" placeholder="Full name" className="w-full p-3 bg-transparent border-b focus:ring focus:ring-red-300" />
                <input type="text" placeholder="Your phone" className="w-full p-3 bg-transparent border-b focus:ring focus:ring-red-300" />
                <input type="email" placeholder="Your email" className="w-full bg-transparent border-b p-3 focus:ring focus:ring-red-300" />
                <textarea placeholder="Your message" className="w-full bg-transparent border-b p-3 focus:ring focus:ring-red-300" />
                <button className="w-40 bg-red-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-red-600 transition-all">
                  Submit
                </button>
              </div>
            </div> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Aboutus;