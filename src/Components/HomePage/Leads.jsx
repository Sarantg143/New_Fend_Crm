import React, { useEffect, useState } from "react";
import { Phone, Home, Link2 } from "lucide-react";

const LeadsPage = () => {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    // Replace this with your actual API call
    const fetchLeads = async () => {
      const mockData = [
        {
          name: "John Doe",
          contact: "john@example.com",
          property: "Green Villa, Miami",
          source: "Website",
          hasEnquired: false,
          image:
            "https://tse3.mm.bing.net/th?id=OIP.pAyRN_lNf6IPukCMXYcRcQHaHa&pid=Api&P=0&h=180",
        },
        {
          name: "Jane Smith",
          contact: "jane@gmail.com",
          property: "Ocean Heights, LA",
          source: "Referral",
          hasEnquired: true,
          image:
            "https://tse4.mm.bing.net/th?id=OIP.tX36supoUyT_GOZtBHrQJgHaHa&pid=Api&P=0&h=180",
        },
        {
          name: "Mike Johnson",
          contact: "+1 555 555 1234",
          property: "Sunset Condo, NYC",
          source: "Social Media",
          hasEnquired: false,
          image:
            "https://tse4.mm.bing.net/th?id=OIP.tX36supoUyT_GOZtBHrQJgHaHa&pid=Api&P=0&h=180",
        },
      ];
      setLeads(mockData);
    };

    fetchLeads();
  }, []);

  const getStatusStyle = (hasEnquired) => {
    const base = "text-sm px-2 py-1 rounded-full font-medium";
    return hasEnquired
      ? `${base} bg-yellow-100 text-yellow-700` // Contacted
      : `${base} bg-blue-100 text-blue-700`; // New
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold mb-6">Lead Overview</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {leads.length === 0 ? (
            <p className="text-center text-gray-500 col-span-full">
              No leads available.
            </p>
          ) : (
            leads.map((lead, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow border border-gray-200 p-4 space-y-4"
              >
                {/* Lead Image and Name */}
                <div className="flex flex-col justify-between items-center sm:flex-row sm:items-start mb-4">
                  <img
                    src={lead.image}
                    alt={lead.name}
                    className="w-20 h-20 rounded-full object-cover border-2 border-gray-300 mb-4 sm:mb-0 sm:mr-4"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{lead.name}</h2>
                    <span className={getStatusStyle(lead.hasEnquired)}>
                      {lead.hasEnquired ? "Contacted" : "New"}
                    </span>
                  </div>
                </div>

                {/* Lead Details with Lucide Icons */}
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  {lead.contact}
                </p>
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <Home className="w-4 h-4 text-gray-500" />
                  {lead.property}
                </p>
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <Link2 className="w-4 h-4 text-gray-500" />
                  Source: {lead.source}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadsPage;
