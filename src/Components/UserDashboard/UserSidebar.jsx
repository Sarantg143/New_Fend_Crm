import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import sidebar1 from "../AdminDashboard/Assets/sidebar1.png";
import sidebar2 from "../AdminDashboard/Assets/sidebar2.png";
import sidebar3 from "../AdminDashboard/Assets/sidebar3.png";
import sidebar4 from "../AdminDashboard/Assets/sidebar4.png";
import sidebar5 from "../AdminDashboard/Assets/sidebar5.png";
import sidebar6 from "../AdminDashboard/Assets/sidebar6.png";
import setting from "../AdminDashboard/Assets/setting.png";
import help from "../AdminDashboard/Assets/help.png";
import logout from "../AdminDashboard/Assets/logout.png";
import sidebarlogo from "../AdminDashboard/Assets/sidebarlogo.png";

const UserSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) =>
    location.pathname === path
      ? "text-blue-500 font-medium"
      : "text-gray-700 hover:text-blue-500";

  const handleLogout = () => {
    // Perform logout actions here (e.g., clearing localStorage/session if needed)
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
          <Link
            to="/user"
            className={`flex items-center cursor-pointer ${isActive(
              "/dashboard"
            )}`}
          >
            <img src={sidebar1} alt="Dashboard" className="w-5 h-5 mr-3" />
            Dashboard
          </Link>

          <Link
            to="/userproperties"
            className={`flex items-center cursor-pointer ${isActive(
              "/userproperties"
            )}`}
          >
            <img className="w-5 h-5 mr-3" src={sidebar2} alt="Properties" />
            Properties
          </Link>

          <Link
            to="/savedproperties"
            className={`flex items-center cursor-pointer ${isActive(
              "/savedproperties"
            )}`}
          >
            <img
              className="w-5 h-5 mr-3"
              src={sidebar3}
              alt="Saved properties"
            />
            Saved properties
          </Link>

          {/* <Link
            to="/reports"
            className={`flex items-center cursor-pointer ${isActive(
              "/reports"
            )}`}
          >
            <img className="w-5 h-5 mr-3" src={sidebar4} alt="Reports" />
            Reports
          </Link> */}

          {/* <Link
            to="/clientpage"
            className={`flex items-center cursor-pointer ${isActive(
              "/clientpage"
            )}`}
          >
            <img className="w-5 h-5 mr-3" src={sidebar5} alt="Clients" />
            Clients
          </Link> */}

          <Link
            to="/usercalendar"
            className={`flex items-center cursor-pointer ${isActive(
              "/usercalendar"
            )}`}
          >
            <img className="w-5 h-5 mr-3" src={sidebar6} alt="Calendar" />
            Calendar
          </Link>
        </ul>
      </nav>

      {/* Footer Links */}
      <div className="mt-auto space-y-6">
        <Link
          to="/settings"
          className={`flex items-center cursor-pointer ${isActive(
            "/settings"
          )}`}
        >
          <img className="w-5 h-5 mr-3" src={setting} alt="Settings" />
          Settings
        </Link>

        <Link
          to="/help"
          className={`flex items-center cursor-pointer ${isActive("/help")}`}
        >
          <img className="w-5 h-5 mr-3" src={help} alt="Help" />
          Help
        </Link>

        <div
          onClick={handleLogout}
          className="flex items-center text-red-500 hover:text-red-700 cursor-pointer"
        >
          <img className="w-5 h-5 mr-3" src={logout} alt="Logout" />
          Logout
        </div>
      </div>
    </div>
  );
};

export default UserSidebar;
