import React from "react";

const UserDetails = () => {
  const user = {
    name: "Rohit Sharma",
    avatar: "https://i.pravatar.cc/150?img=5",
    email: "rohit.sharma@realbuilds.com",
    phone: "+91 90876 54321",
    company: "RealBuilds Pvt Ltd",
    role: "Admin",
    isVerified: true,
    status: "Active",
    createdAt: "12 March, 2023",
    assignedProperties: [
      "Skyview Residency",
      "Palm County Villas",
      "Golden Square Apartments",
    ],
  };

  const statusBadge = {
    Active: "bg-green-100 text-green-700",
    Inactive: "bg-red-100 text-red-700",
    Pending: "bg-yellow-100 text-yellow-700",
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md max-w-3xl mx-auto mt-6 text-gray-800">
      {/* Header */}
      <div className="flex items-center gap-4 border-b pb-4 mb-4">
        <img
          src={user.avatar}
          alt="avatar"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex-1">
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-sm text-gray-500">
            {user.role} at {user.company}
          </p>
        </div>
        <span
          className={`px-3 py-1 text-sm rounded-full font-medium ${
            statusBadge[user.status]
          }`}
        >
          {user.status}
        </span>
      </div>

      {/* Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 text-sm">
        <div>
          <p className="text-gray-500">Email</p>
          <p className="font-medium">{user.email}</p>
        </div>
        <div>
          <p className="text-gray-500">Phone</p>
          <p className="font-medium">{user.phone}</p>
        </div>
        <div>
          <p className="text-gray-500">Company</p>
          <p className="font-medium">{user.company}</p>
        </div>
        <div>
          <p className="text-gray-500">Role</p>
          <p className="font-medium">{user.role}</p>
        </div>
        <div>
          <p className="text-gray-500">Created On</p>
          <p className="font-medium">{user.createdAt}</p>
        </div>
        <div>
          <p className="text-gray-500">Verification</p>
          <p
            className={`font-medium ${
              user.isVerified ? "text-green-600" : "text-red-600"
            }`}
          >
            {user.isVerified ? "Verified ✅" : "Not Verified ❌"}
          </p>
        </div>
      </div>

      {/* Assigned Properties */}
      <div>
        <p className="text-gray-500 text-sm mb-2">Assigned Properties</p>
        <ul className="list-disc list-inside text-sm text-gray-700">
          {user.assignedProperties.map((property, index) => (
            <li key={index}>{property}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserDetails;
