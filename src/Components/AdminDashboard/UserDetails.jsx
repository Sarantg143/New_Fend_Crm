// src/Components/UserDetails.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const UserDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state || !state.user) {
    return (
      <div className="p-6">
        <p className="text-red-500">No user data found.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  const {
    name,
    username,
    email,
    phone,
    companyName,
    role,
    isVerified,
    isActive,
    profilepic,
    profilebanner,
    likedUnits,
    socialId,
    googleId,
    token,
  } = state.user;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-semibold mb-4">User Details</h2>
      <div className="bg-white p-6 rounded shadow-md max-w-8xl mx-auto">
        {profilebanner && (
          <img
            src={profilebanner}
            alt="Banner"
            className="w-full h-40 object-cover rounded"
          />
        )}
        {profilepic && (
          <img
            src={profilepic}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto -mt-12 border-4 border-white"
          />
        )}

        <div className="grid grid-cols-2 gap-x-6 mt-6">
          {[
            { label: "Name:", value: name || "N/A" },
            { label: "Username:", value: username },
            { label: "Email:", value: email },
            { label: "Phone:", value: phone },
            { label: "Company:", value: companyName },
            { label: "Role:", value: role },
            { label: "Verified:", value: isVerified ? "Yes" : "No" },
            { label: "Active:", value: isActive ? "Yes" : "No" },
            ...(socialId ? [{ label: "Social ID:", value: socialId }] : []),
            ...(googleId ? [{ label: "Google ID:", value: googleId }] : []),
            ...(token ? [{ label: "Token:", value: token }] : []),
            { label: "Liked Units:", value: likedUnits?.length || 0 },
          ].map(({ label, value }, idx) => (
            <React.Fragment key={idx}>
              <p className="font-semibold text-right pr-4  border-gray-300 py-2">
                {label}
              </p>
              <p className=" border-gray-300 py-2">{value}</p>
            </React.Fragment>
          ))}
        </div>

        <button
          onClick={() => navigate(-1)}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default UserDetails;
