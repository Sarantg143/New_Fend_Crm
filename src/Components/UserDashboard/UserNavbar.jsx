import { Search, Plus } from "lucide-react";
import searchright from "../UserDashboard/Assests/searchright.png";
import bellicon from "../UserDashboard/Assests/bellicon.png";
import defaultProfile from "../UserDashboard/Assests/Navprofile.png"; // Renamed for clarity
import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://crm-bcgg.onrender.com"; // Replace with your actual base URL

export default function UserNavbar() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // First get basic data from session storage
        const loginData = sessionStorage.getItem("logindata");
        if (loginData) {
          const parsedData = JSON.parse(loginData);
          setUser(parsedData.user); // Set initial user data

          // Then fetch complete user details from API
          const response = await axios.get(
            `${BASE_URL}/api/users/${parsedData.user.id}`,
            {
              headers: {
                Authorization: `Bearer ${parsedData.token}`,
              },
            }
          );

          // Update user with complete data including profile picture
          setUser({
            ...parsedData.user,
            profilepic: response.data.profilepic || defaultProfile,
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-between bg-white px-6 py-3 shadow-md">
        <div className="animate-pulse h-6 w-48 bg-gray-200 rounded"></div>
        <div className="flex items-center gap-3">
          <div className="animate-pulse h-10 w-10 rounded-full bg-gray-200"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between bg-white px-6 py-3 shadow-md">
      {/* Greeting Text */}
      <h1 className="text-lg font-semibold">
        Good morning, {user?.name?.split(' ')[0] || "User"}
      </h1>

      {/* Search Bar & Icons */}
      <div className="flex items-center gap-3">
        {/* Search Input */}
        <div className="relative flex items-center bg-gray-100 rounded-lg px-3 py-1">
          <Search className="w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Quick Search..."
            className="ml-2 w-full bg-transparent outline-none text-sm placeholder-gray-500"
          />
          <img src={searchright} alt="Search" className="w-4 h-4 ml-2" />
        </div>

        {/* Add Icon */}
        <Plus className="w-5 h-5 text-blue-500 cursor-pointer" />

        {/* Notification Icon */}
        <img
          src={bellicon}
          alt="Notifications"
          className="w-5 h-5 cursor-pointer"
        />

        {/* Profile Image */}
        <div className="flex items-center">
          <img
            src={user?.profilepic || defaultProfile}
            alt={user?.name || "User"}
            className="w-10 h-10 rounded-full object-cover"
            onError={(e) => {
              e.target.src = defaultProfile; // Fallback if image fails to load
            }}
          />
          <span className="ml-2 font-medium">{user?.name || "User"}</span>
        </div>
      </div>
    </div>
  );
}