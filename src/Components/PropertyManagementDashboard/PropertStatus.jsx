import React, { useState } from "react";
import status1 from "../PropertyManagementDashboard/Assets/status1.png";
import status2 from "../PropertyManagementDashboard/Assets/status2.png";
import status3 from "../PropertyManagementDashboard/Assets/status3.png";
import status4 from "../PropertyManagementDashboard/Assets/status4.png";
import status5 from "../PropertyManagementDashboard/Assets/status5.png";
import status6 from "../PropertyManagementDashboard/Assets/status6.png";

const properties = [
  {
    id: 1,
    image: status1,
    name: "Sunset Apartments",
    address: "24, Broad Street, TN",
    info: "Rental Income: ₹25,000/mo",
  },
  {
    id: 2,
    image: status2,
    name: "Sunset Apartments",
    address: "24, Broad Street, TN",
    info: "Awaiting permit: Approval",
  },
  {
    id: 3,
    image: status3,
    name: "Sunset Apartments",
    address: "24, Broad Street, TN",
    info: "Quote price: 15,00,000",
  },
  {
    id: 4,
    image: status4,
    name: "Oakwood Residency",
    address: "12, Elm Street, NY",
    info: "Under maintenance",
  },
  {
    id: 5,
    image: status5,
    name: "Maple Heights",
    address: "77, Pine Avenue, CA",
    info: "Rental Income: ₹18,500/mo",
  },
  {
    id: 6,
    image: status6,
    name: "River View Towers",
    address: "102, River Lane, TX",
    info: "New listing",
  },
];

const PropertyStatus = () => {
  const [showAll, setShowAll] = useState(false);

  const displayedProperties = showAll ? properties : properties.slice(0, 3);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Property Status</h2>
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-blue-500 text-sm"
        >
          {showAll ? "Show less" : "View all"}
        </button>
      </div>

      {/* Property List */}
      <div>
        {displayedProperties.map((property) => (
          <div
            key={property.id}
            className="flex items-center mb-4 border-b pb-2"
          >
            <img
              src={property.image}
              alt={property.name}
              className="w-16 h-16 rounded-md object-cover mr-4"
            />
            <div>
              <h3 className="font-semibold">{property.name}</h3>
              <p className="text-gray-500 text-sm">{property.address}</p>
              <p className="text-gray-700 text-sm">{property.info}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyStatus;
