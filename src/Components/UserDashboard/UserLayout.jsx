// Components/AdminDashboard/UserLayout.jsx

import UserSidebar from "./UserSidebar";
import UserNavbar from "./UserNavbar";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Fixed Sidebar */}
      <div className="w-64 fixed h-full bg-white shadow-md z-10">
        <UserSidebar />
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 ml-64 overflow-y-auto">
        <div className="p-4">
          <UserNavbar />
          <div className="mt-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
