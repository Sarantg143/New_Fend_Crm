// Components/AdminDashboard/AdminLayout.jsx

import PropertySidebar from "./PropertySidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const PropertiesLayout = () => {
  return (
    <div className="flex">
      <div className="fixed h-screen bg-white shadow ">
        <PropertySidebar />
      </div>
      <div className="flex-1 ml-64 overflow-y-auto min-h-screen p-4">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default PropertiesLayout;
