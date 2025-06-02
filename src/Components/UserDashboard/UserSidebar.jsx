import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import sidebar1 from "../AdminDashboard/Assets/sidebar1.png"; // Dashboard
import sidebar2 from "../AdminDashboard/Assets/sidebar2.png"; // Properties
import sidebar3 from "../AdminDashboard/Assets/sidebar3.png"; // Saved
import sidebar4 from "../AdminDashboard/Assets/sidebar4.png"; // Payments (reused here)
import sidebar6 from "../AdminDashboard/Assets/sidebar6.png"; // Calendar
import setting from "../AdminDashboard/Assets/setting.png";
import help from "../AdminDashboard/Assets/help.png";
import logout from "../AdminDashboard/Assets/logout.png";
import sidebarlogo from "../AdminDashboard/Assets/sidebarlogo.png";

const UserSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) =>
    location.pathname === path
      ? "text-blue-500 font-medium bg-blue-100 rounded-lg px-2 py-1"
      : "text-gray-700 hover:text-blue-500";

  const handleLogout = () => {
    // Clear auth data if stored in localStorage/sessionStorage
    sessionStorage.clear();

    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="hidden h-screen lg:flex w-64 bg-white shadow-md flex-col p-4">
      {/* Logo Section */}
      <div className="flex items-center mb-6">
        <img src={sidebarlogo} alt="Logo" className="h-12 mr-2" />
      </div>

      {/* Navigation Links */}
      <nav className="flex-1">
        <ul className="space-y-6">
          <li>
            <Link
              to="/user"
              className={`flex items-center ${isActive("/user")}`}
            >
              <img src={sidebar1} alt="Dashboard" className="w-5 h-5 mr-3" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/userproperties"
              className={`flex items-center ${isActive("/userproperties")}`}
            >
              <img src={sidebar2} alt="Properties" className="w-5 h-5 mr-3" />
              Properties
            </Link>
          </li>
          <li>
            <Link
              to="/payments"
              className={`flex items-center ${isActive("/payments")}`}
            >
              <img src={sidebar4} alt="Payments" className="w-5 h-5 mr-3" />
              Payments
            </Link>
          </li>
          <li>
            <Link
              to="/savedproperties"
              className={`flex items-center ${isActive("/savedproperties")}`}
            >
              <img
                src={sidebar3}
                alt="Saved Properties"
                className="w-5 h-5 mr-3"
              />
              Saved Properties
            </Link>
          </li>
          <li>
            <Link
              to="/usercalendar"
              className={`flex items-center ${isActive("/usercalendar")}`}
            >
              <img src={sidebar6} alt="Calendar" className="w-5 h-5 mr-3" />
              Calendar
            </Link>
          </li>
        </ul>
      </nav>

      {/* Footer Links */}
      <div className="mt-auto space-y-6">
        <li>
          <Link
            to="/settings"
            className={`flex items-center ${isActive("/settings")}`}
          >
            <img src={setting} alt="Settings" className="w-5 h-5 mr-3" />
            Settings
          </Link>
        </li>
        <li>
          <Link to="/help" className={`flex items-center ${isActive("/help")}`}>
            <img src={help} alt="Help" className="w-5 h-5 mr-3" />
            Help
          </Link>
        </li>
        <li>
          <div
            onClick={handleLogout}
            className="flex items-center text-red-500 hover:text-red-700 cursor-pointer"
          >
            <img src={logout} alt="Logout" className="w-5 h-5 mr-3" />
            Logout
          </div>
        </li>
      </div>
    </div>
  );
};

export default UserSidebar;
