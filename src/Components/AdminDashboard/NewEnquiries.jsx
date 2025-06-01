import { useEffect, useState } from "react";
import axios from "axios";

export default function NewEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        // Get token from session storage
        const loginData = sessionStorage.getItem("logindata");
        if (!loginData) {
          throw new Error("No login data found");
        }

        const { token } = JSON.parse(loginData);
        
        const response = await axios.get(
          "https://crm-bcgg.onrender.com/api/inquiries/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setEnquiries(response.data);
      } catch (err) {
        console.error("Error fetching enquiries:", err);
        setError(err.message || "Failed to load enquiries");
      } finally {
        setLoading(false);
      }
    };

    fetchEnquiries();
  }, []);

  if (loading) {
    return (
      <div className="max-w-md p-4 bg-white shadow-md rounded-lg h-full m-3 w-full">
        <h2 className="text-lg font-semibold mb-4">New Enquiries</h2>
        <div className="space-y-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="flex items-center space-x-4 border-b pb-4 last:border-b-0">
              <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-3 w-32 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md p-4 bg-white shadow-md rounded-lg h-full m-3 w-full">
        <h2 className="text-lg font-semibold mb-4">New Enquiries</h2>
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-md p-4 bg-white shadow-md rounded-lg h-full m-3 w-full">
      <h2 className="text-lg font-semibold mb-4">New Enquiries</h2>
      <div className="space-y-4">
        {enquiries.length > 0 ? (
          enquiries.map((enquiry) => (
            <div
              key={enquiry._id}
              className="flex items-center space-x-4 border-b pb-4 last:border-b-0"
            >
              <img
                src={enquiry.image || "/default-profile.png"} // Fallback image
                alt={enquiry.name}
                className="w-10 h-10 rounded-full object-cover"
                onError={(e) => {
                  // e.target.src = "/default-profile.png"; // Fallback if image fails to load
                }}
              />
              <div>
                <p className="font-semibold">{enquiry.user?.name || "Unknown User"}</p>
                <p className="text-gray-600 text-sm">
                  {enquiry.message || "No message"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No new enquiries</p>
        )}
      </div>
    </div>
  );
}