import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Sidebar Area */}
      <Sidebar />

      {/* Content Area */}
      <div className="flex-1 lg:ml-64 p-4">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
