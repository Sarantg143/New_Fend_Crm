import React from "react";
import { Link, useNavigate } from "react-router-dom";

import sidebar1 from "../AdminDashboard/Assets/sidebar1.png";
import sidebar2 from "../AdminDashboard/Assets/sidebar2.png";
import sidebar3 from "../AdminDashboard/Assets/sidebar3.png";
import report from "../PropertyManagementDashboard/Assets/report.png";
import maintenance from "../PropertyManagementDashboard/Assets/maintenance.png";
import calander from "../PropertyManagementDashboard/Assets/calander.png";
import setting from "../AdminDashboard/Assets/setting.png";
import help from "../AdminDashboard/Assets/help.png";
import logout from "../AdminDashboard/Assets/logout.png";

import sidebarlogo from "../AdminDashboard/Assets/sidebarlogo.png";

const PropertySidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Any logout logic if needed (e.g., clearing localStorage) can be added here
    sessionStorage.clear();

    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="hidden lg:flex h-screen w-64 bg-white shadow-md flex-col p-4">
      {/* Logo Section */}
      <div className="flex items-center mb-6">
        <img src={sidebarlogo} alt="Logo" className="h-12 mr-2" />
      </div>

      {/* Navigation Links */}
      <nav className="flex-1">
        <ul className="space-y-6">
          <li>
            <Link
              to="/properties"
              className="flex items-center text-blue-500 font-medium"
            >
              <img src={sidebar1} alt="Dashboard" className="w-5 h-5 mr-3" />
              Dashboard
            </Link>
          </li>
          {/* <li>
            <Link
              to="/managementproperties"
              className="flex items-center text-gray-700 hover:text-blue-500"
            >
              <img className="mr-3" src={sidebar2} alt="Properties" />
              Properties
            </Link>
          </li> */}
          {/* <li>
            <Link
              to="/tenants"
              className="flex items-center text-gray-700 hover:text-blue-500"
            >
              <img className="mr-3" src={sidebar3} alt="Tenants" />
              Tenants
            </Link>
          </li> */}
          <li>
            {/* <Link
              to="/propertyreport"
              className="flex items-center text-gray-700 hover:text-blue-500"
            >
              <img className="mr-3" src={report} alt="Reports" />
              Reports
            </Link>
          </li>
          <li>
            <Link
              to="/maintenance"
              className="flex items-center text-gray-700 hover:text-blue-500"
            >
              <img className="mr-3" src={maintenance} alt="Maintenance" />
              Maintenance
            </Link> */}
            <li>
            <Link
              to="/propertypage"
              className="flex items-center text-gray-700 hover:text-blue-500"
            >
              <img className="mr-3" src={sidebar2} alt="Calendar" />
              Properties
            </Link>
          </li>
          </li>
          <li>
            <Link
              to="/propertycalendar"
              className="flex items-center text-gray-700 hover:text-blue-500"
            >
              <img className="mr-3" src={calander} alt="Calendar" />
              Calendar
            </Link>
          </li>
        </ul>
      </nav>

      {/* Footer Links */}
      <div className="mt-auto space-y-6">
        <Link
          to="/settings"
          className="flex items-center text-gray-700 hover:text-blue-500"
        >
          <img className="mr-3" src={setting} alt="Settings" /> Settings
        </Link>
        <Link
          to="/help"
          className="flex items-center text-gray-700 hover:text-blue-500"
        >
          <img className="mr-3" src={help} alt="Help" /> Help
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center text-red-500 hover:text-red-700"
        >
          <img className="mr-3" src={logout} alt="Logout" /> Logout
        </button>
      </div>
    </div>
  );
};

export default PropertySidebar;
