import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

import sidebar1 from "../AdminDashboard/Assets/sidebar1.png";
import sidebar2 from "../AdminDashboard/Assets/sidebar2.png";
import sidebar3 from "../AdminDashboard/Assets/sidebar3.png";
import sidebar6 from "../AdminDashboard/Assets/sidebar6.png";
import setting from "../AdminDashboard/Assets/setting.png";
import help from "../AdminDashboard/Assets/help.png";
import logout from "../AdminDashboard/Assets/logout.png";
import sidebarlogo from "../AdminDashboard/Assets/sidebarlogo.png";

const navItems = [
  { icon: sidebar1, label: "Dashboard", link: "/admin" },
  { icon: sidebar2, label: "Properties", link: "/propertiespage" },
  { icon: sidebar3, label: "Leads", link: "/leadspage" },
  { icon: sidebar6, label: "Brokers & External Agents", link: "/agentpage" },
  { icon: sidebar6, label: "usermanagement", link: "/UserManagement" },
];

const footerItems = [
  { icon: setting, label: "Settings", link: "/settings" },
  { icon: help, label: "Help", link: "/help" },
  { icon: logout, label: "Logout", isLogout: true },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-gradient-to-b from-white to-slate-100 p-4 shadow-lg rounded-tr-3xl rounded-br-3xl w-64">
      {/* Logo */}
      <div className="flex items-center mb-8">
        <img src={sidebarlogo} alt="Logo" className="h-12" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-2">
          {navItems.map(({ icon, label, link }, idx) => {
            const isActive = location.pathname === link;
            return (
              <li
                key={idx}
                onClick={() => {
                  navigate(link);
                  setIsOpen(false); // close on mobile
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer group transition duration-200 ${
                  isActive
                    ? "bg-blue-100 text-blue-600 font-semibold"
                    : "text-gray-600 hover:bg-blue-50 hover:text-blue-500"
                }`}
              >
                <img src={icon} alt={label} className="w-5 h-5" />
                <span>{label}</span>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="space-y-2 pt-4">
        {footerItems.map(({ icon, label, link, isLogout }, idx) => (
          <div
            key={idx}
            onClick={() => {
              if (isLogout) {
                handleLogout();
              } else {
                navigate(link);
                setIsOpen(false);
              }
            }}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition duration-200 ${
              isLogout
                ? "bg-red-100 text-red-500 hover:bg-red-200 hover:text-red-600"
                : "text-gray-600 hover:bg-blue-50 hover:text-blue-500"
            }`}
          >
            <img src={icon} alt={label} className="w-5 h-5" />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle button */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 shadow bg-white">
        <img src={sidebarlogo} alt="Logo" className="h-10" />
        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar for large screen */}
      <div className="hidden lg:flex fixed h-screen z-10">
        <SidebarContent />
      </div>

      {/* Sidebar overlay for small screens */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-40 z-50">
          <div className="absolute left-0 top-0 h-full">
            <SidebarContent />
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
