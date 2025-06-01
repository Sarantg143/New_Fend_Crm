import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "https://crm-bcgg.onrender.com";
const UPLOAD_URL = "https://z-backend-2xag.onrender.com/api/upload/type";

const ProfileCard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({
    name: "",
    email: "",
    username: "",
    role: "",
    profilepic: "",
    profilebanner: "",
    phone: "",
    companyName: "",
    likedUnits: [],
  });

  // Get token and user ID from session storage
  const logindata = JSON.parse(sessionStorage.getItem("logindata"));
  const token = logindata?.token;
  const userId = logindata?.user?.id;

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Fetch unit numbers for liked units
        const likedUnitsWithNumbers = await Promise.all(
          response.data.likedUnits.map(async (unitId) => {
            try {
              const unitResponse = await axios.get(
                `${BASE_URL}/api/properties/unit/${unitId}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              return unitResponse.data.unitNumber || unitId; // Fallback to ID if unitNumber not available
            } catch (error) {
              console.error(`Error fetching unit ${unitId}:`, error);
              return unitId; // Return ID if there's an error
            }
          })
        );

        setUser({
          ...response.data,
          likedUnits: likedUnitsWithNumbers,
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to load user data");
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId, token]);

  const handleInputChange = (field, value) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (field, file) => {
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", field === "profilepic" ? "profile" : "banner");

      const response = await axios.post(UPLOAD_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.fileUrl) {
        setUser((prev) => ({ ...prev, [field]: response.data.fileUrl }));
      }
    } catch (error) {
      console.error(`Error uploading ${field}:`, error);
      alert(`Failed to upload ${field}. Please try again.`);
    }
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmit = async () => {
    try {
      // Remove likedUnits from the data we're sending since they're not editable
      const { likedUnits, ...userDataToUpdate } = user;

      await axios.put(`${BASE_URL}/api/users/${userId}`, userDataToUpdate, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating user data:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-purple-100 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-purple-100 flex items-center justify-center">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-purple-100 py-10 px-4">
      <div className="relative max-w-6xl mx-auto bg-white rounded-3xl shadow-lg">
        {/* Banner */}
        <div
          className="h-48 bg-cover bg-center rounded-t-3xl"
          style={{
            backgroundImage: `url(${
              user.profilebanner || "https://via.placeholder.com/1200x300"
            })`,
            backgroundColor: !user.profilebanner ? "#eee" : undefined,
          }}
        >
          {isEditing && (
            <div className="absolute right-4 top-4 bg-white bg-opacity-80 p-2 rounded">
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleImageUpload("profilebanner", e.target.files[0])
                }
              />
            </div>
          )}
        </div>

        {/* Profile + Edit */}
        <div className="relative -mt-16 px-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src={user.profilepic || "https://via.placeholder.com/100"}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
                />
                {isEditing && (
                  <div className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow">
                    <input
                      type="file"
                      accept="image/*"
                      className="w-6 h-6 opacity-0 absolute cursor-pointer"
                      onChange={(e) =>
                        handleImageUpload("profilepic", e.target.files[0])
                      }
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V7.414a2 2 0 00-.586-1.414l-3.414-3.414A2 2 0 0012.586 2H4zm6 5a3 3 0 110 6 3 3 0 010-6z" />
                    </svg>
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  {user.name}
                </h2>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
            <button
              className="border border-purple-600 text-purple-700 px-4 py-2 rounded hover:bg-purple-100 transition"
              onClick={isEditing ? handleSubmit : handleEditClick}
            >
              {isEditing ? "Save" : "Edit"}
            </button>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 py-10">
          {/* General Info */}
          <div className="bg-gray-50 rounded-xl shadow p-6">
            <h3 className="text-xl font-semibold mb-4">General Information</h3>
            <div className="space-y-4">
              <Field
                label="Name"
                value={user.name}
                isEditing={isEditing}
                onChange={(val) => handleInputChange("name", val)}
              />
              <Field
                label="Email"
                value={user.email}
                isEditing={isEditing}
                onChange={(val) => handleInputChange("email", val)}
              />
              <Field
                label="Username"
                value={user.username}
                isEditing={isEditing}
                onChange={(val) => handleInputChange("username", val)}
              />
              <Field
                label="Role"
                value={user.role}
                readOnly={true}
                isEditing={isEditing}
              />
              <Field
                label="Phone"
                value={user.phone}
                isEditing={isEditing}
                onChange={(val) => handleInputChange("phone", val)}
              />
            </div>
          </div>

          {/* Professional Info */}
          <div className="bg-gray-50 rounded-xl shadow p-6">
            <h3 className="text-xl font-semibold mb-4">Professional Details</h3>
            <div className="space-y-4">
              <Field
                label="Company Name"
                value={user.companyName}
                isEditing={isEditing}
                onChange={(val) => handleInputChange("companyName", val)}
              />

              {/* Liked Units - Display only (non-editable) */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-1">
                  Liked Units
                </label>
                <div className="flex flex-wrap gap-2">
                  {user.likedUnits.length > 0 ? (
                    user.likedUnits.map((unit, index) => (
                      <div
                        key={index}
                        className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full"
                      >
                        <span>{unit}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No liked units</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Field Component
const Field = ({
  label,
  value,
  isEditing = false,
  onChange,
  readOnly = false,
}) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-600 mb-1">{label}</label>
    <input
      type="text"
      value={value || ""}
      readOnly={!isEditing || readOnly}
      onChange={(e) => onChange && onChange(e.target.value)}
      className={`bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-800 ${
        !isEditing || readOnly ? "cursor-not-allowed bg-gray-100" : ""
      }`}
    />
  </div>
);

export default ProfileCard;