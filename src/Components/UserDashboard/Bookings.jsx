import React, { useState, useEffect } from "react";
import axios from "axios";
import bookings1 from "../UserDashboard/Assests/bookings1.png";
import bookings2 from "../UserDashboard/Assests/bookings2.png";
import bookings3 from "../UserDashboard/Assests/bookings3.png";
import bookings4 from "../UserDashboard/Assests/bookings4.png";
import sqft from "../UserDashboard/Assests/sqft.png";
import bed from "../UserDashboard/Assests/bed.png";
import location from "../UserDashboard/Assests/location.png";

const Bookings = () => {
  const [viewAll, setViewAll] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const loginData = sessionStorage.getItem("logindata");
        if (!loginData) {
          throw new Error("No login data found");
        }

        const { token } = JSON.parse(loginData);
        
        const response = await axios.get(
          "https://crm-bcgg.onrender.com/api/booking/my",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Map API response to match our component's expected format
        const mappedBookings = response.data.map(booking => ({
          id: booking._id,
          image: booking.property?.images?.[0]?.url || 
                (booking.unit?.photos?.[0]?.url || 
                [bookings1, bookings2, bookings3, bookings4][Math.floor(Math.random() * 4)]),
          title: booking.property?.name || booking.unit?.unitNumber || "Unnamed Property",
          address: `${booking.property?.address?.street || ""}, ${booking.property?.address?.city || ""}`,
          sqft: booking.unit?.sizeSqFt || 0,
          units: booking.unit?.bhkType || "N/A",
          status: booking.status || "Pending",
          bookingDate: new Date(booking.createdAt).toLocaleDateString()
        }));

        setBookings(mappedBookings);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError(err.message || "Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const visibleProperties = viewAll ? bookings : bookings.slice(0, 2);

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Bookings</h2>
          <div className="h-8 w-20 bg-gray-200 rounded"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {[...Array(2)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
              <div className="p-4">
                <div className="h-6 w-3/4 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
                <div className="border mt-2"></div>
                <div className="mt-2 flex">
                  <div className="h-4 w-1/2 bg-gray-200 rounded mr-4"></div>
                  <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Bookings</h2>
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Bookings</h2>
        {bookings.length > 2 && (
          <button
            onClick={() => setViewAll(!viewAll)}
            className="text-blue-600 focus:outline-none"
          >
            {viewAll ? "Show less" : "View all"}
          </button>
        )}
      </div>

      {/* Property Cards */}
      {bookings.length === 0 ? (
        <p className="text-gray-500">No bookings found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {visibleProperties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-48 object-cover rounded-t-lg"
                onError={(e) => {
                  e.target.src = [bookings1, bookings2, bookings3, bookings4][Math.floor(Math.random() * 4)];
                }}
              />
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-blue-600 mt-1 font-semibold hover:underline cursor-pointer">
                    {property.title}
                  </h3>
                  <span className={`text-xs px-2 py-1 rounded ${
                    property.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                    property.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {property.status}
                  </span>
                </div>
                <p className="text-gray-600 mt-1 text-sm flex gap-2 items-center">
                  <img src={location} alt="location" className="w-4 h-4" /> 
                  {property.address || "Address not available"}
                </p>
                <p className="border mt-2"></p>
                <div className="mt-2 flex items-center text-gray-500 text-sm">
                  <span className="mr-4 flex gap-2 items-center">
                    <img src={sqft} alt="sqft" className="w-4 h-4" /> 
                    Sqft: {property.sqft.toLocaleString()}
                  </span>
                  <span className="flex gap-2 items-center">
                    <img src={bed} alt="bed" className="w-4 h-4" /> 
                    Units: {property.units}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                 Booked on: {new Date(property.bookedAt).toLocaleDateString()}

                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookings;