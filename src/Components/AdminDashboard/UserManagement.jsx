import React, { useState, useRef, useEffect } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://crm-bcgg.onrender.com";
const UPLOAD_URL = "https://z-backend-2xag.onrender.com/api/upload/type";
const USERS_API = `${BASE_URL}/api/users/`;
const token = JSON.parse(sessionStorage.getItem("logindata"))?.token;

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [approvals, setApprovals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [filterAdmin, setFilterAdmin] = useState(false);
  const [filterVerified, setFilterVerified] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const filterRef = useRef(null);
  const buttonRef = useRef(null);
  const navigate = useNavigate();

  // Fetch all users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(USERS_API, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
        setApprovals(data.map((user) => user.isVerified));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Upload image to server
  const uploadImage = async (file, type) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);

    try {
      const response = await fetch(UPLOAD_URL, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      return data.fileUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  // Handle profile picture change
  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setEditingUser((prev) => ({ ...prev, profilepic: previewUrl }));

      // Upload the file to server
      const fileUrl = await uploadImage(file, "profile");
      if (fileUrl) {
        setEditingUser((prev) => ({ ...prev, profilepic: fileUrl }));
      }
    }
  };

  // Handle profile banner change
  const handleProfileBannerChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setEditingUser((prev) => ({ ...prev, profilebanner: previewUrl }));

      // Upload the file to server
      const fileUrl = await uploadImage(file, "banner");
      if (fileUrl) {
        setEditingUser((prev) => ({ ...prev, profilebanner: fileUrl }));
      }
    }
  };

  // Toggle user verification status
  const toggleApproval = async (index, userId) => {
    const newStatus = !approvals[index];

    try {
      const response = await fetch(`${USERS_API}${userId}/role`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isVerified: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update verification status");
      }

      const updatedApprovals = [...approvals];
      updatedApprovals[index] = newStatus;
      setApprovals(updatedApprovals);

      // Update local users state
      setUsers((prev) =>
        prev.map((user) =>
          user._id === userId ? { ...user, isVerified: newStatus } : user
        )
      );
    } catch (error) {
      console.error("Error updating verification status:", error);
    }
  };

  // Update user role
  const handleRoleChange = async (index, userId, newRole) => {
    try {
      const response = await fetch(`${USERS_API}${userId}/role`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role: newRole }),
      });

      if (!response.ok) {
        throw new Error("Failed to update role");
      }

      // Update local state
      setUsers((prev) => {
        const updatedUsers = [...prev];
        updatedUsers[index].role = newRole;
        return updatedUsers;
      });
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  // Delete user
  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const response = await fetch(`${USERS_API}${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      setUsers((prev) => prev.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Open edit modal with selected user
  const handleEdit = (user) => {
    setEditingUser({ ...user });
  };

  // Save edited user data
  const handleSave = async () => {
    try {
      const { _id, ...userData } = editingUser;

      const response = await fetch(`${USERS_API}${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      const updatedUser = await response.json();

      // Update local state
      setUsers((prev) =>
        prev.map((user) => (user._id === updatedUser._id ? updatedUser : user))
      );

      setEditingUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingUser(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowFilterPopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredUsers = users
    .map((user, index) => ({ ...user, verified: approvals[index], index }))
    .filter(
      (user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (!filterAdmin || user.role === "admin") &&
        (!filterVerified || user.verified === true)
    );

  if (loading) {
    return <div className="min-h-screen bg-gray-100 p-4">Loading users...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-gray-100 p-4">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 relative">
      <h2 className="text-2xl font-semibold mb-4">User Management</h2>

      <div className="bg-white p-6 rounded-md shadow-md">
        <div className="flex justify-start items-center mb-4 space-x-4">
          <input
            type="text"
            placeholder="Filter by username..."
            className="w-1/2 px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="relative">
            <button
              ref={buttonRef}
              onClick={() => setShowFilterPopup((prev) => !prev)}
              className="bg-white text-black px-4 py-2 rounded shadow border hover:bg-gray-100 "
            >
              Sort
            </button>

            {showFilterPopup && (
              <div
                ref={filterRef}
                className="absolute top-12 right-0 bg-white border shadow-lg rounded p-4 z-10 w-48"
              >
                <label className="block mb-2">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={filterAdmin}
                    onChange={() => setFilterAdmin(!filterAdmin)}
                  />
                  Admin
                </label>
                <label className="block">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={filterVerified}
                    onChange={() => setFilterVerified(!filterVerified)}
                  />
                  Verified
                </label>
              </div>
            )}
          </div>
        </div>

        <div className="overflow-auto">
          <table className="min-w-full table-auto border-collapse border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">S.No</th>
                <th className="px-4 py-2">Username</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Phone</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Verified</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, idx) => (
                <tr key={user._id} className="hover:bg-gray-50 border-b">
                  <td className="px-4 py-2 text-center">{idx + 1}</td>
                  <td className="px-4 py-2">{user.username}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.phone}</td>
                  <td className="px-4 py-2 text-center">
                    <select
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user.index, user._id, e.target.value)
                      }
                      className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none"
                    >
                      <option value="user">user</option>
                      <option value="admin">admin</option>
                      <option value="directBuilder">DirectBuilder</option>
                    </select>
                  </td>
                  <td className="px-4 py-2 text-center">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={approvals[user.index]}
                        onChange={() => toggleApproval(user.index, user._id)}
                      />
                      <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-500 relative">
                        <div
                          className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                            approvals[user.index] ? "translate-x-5" : ""
                          }`}
                        ></div>
                      </div>
                    </label>
                  </td>
                  <td className="px-4 py-2 text-center space-x-4">
                    <button
                      title="View"
                      className="text-green-500 hover:text-green-700"
                      onClick={() =>
                        navigate("/user-details", { state: { user } })
                      }
                    >
                      <FaEye />
                    </button>
                    <button
                      title="Edit"
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => handleEdit(user)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      title="Delete"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(user._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredUsers.length === 0 && (
            <div className="text-center text-gray-500 py-4">
              No users match the selected filters.
            </div>
          )}
        </div>
      </div>

      {/* Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-8xl max-w-full max-h-[95vh] overflow-auto">
            <h3 className="text-xl font-semibold mb-4">
              Edit User: {editingUser.username}
            </h3>

            <label className="block mb-2">
              Name:
              <input
                type="text"
                className="w-full border rounded px-3 py-2 mt-1"
                value={editingUser.name}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, name: e.target.value })
                }
              />
            </label>

            <label className="block mb-2">
              Username:
              <input
                type="text"
                className="w-full border rounded px-3 py-2 mt-1"
                value={editingUser.username}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, username: e.target.value })
                }
              />
            </label>

            <label className="block mb-2">
              Email:
              <input
                type="email"
                className="w-full border rounded px-3 py-2 mt-1"
                value={editingUser.email}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, email: e.target.value })
                }
              />
            </label>

            <label className="block mb-2">
              Password:
              <input
                type="password"
                className="w-full border rounded px-3 py-2 mt-1"
                value={editingUser.password}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, password: e.target.value })
                }
              />
            </label>

            <label className="block mb-2">
              Role:
              <select
                className="w-full border rounded px-3 py-2 mt-1"
                value={editingUser.role}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, role: e.target.value })
                }
              >
                <option value="user">user</option>
                <option value="admin">admin</option>
                <option value="directBuilder">DirectBuilder</option>
              </select>
            </label>

            {/* Profile Picture */}
            <label className="block mb-2">
              Profile Picture:
              <input
                type="file"
                accept="image/*"
                id="profilePicInput"
                style={{ display: "none" }}
                onChange={handleProfilePicChange}
              />
              {editingUser.profilepic ? (
                <img
                  src={editingUser.profilepic}
                  alt="Profile Preview"
                  className="mt-2 w-24 h-24 object-cover rounded-full border cursor-pointer"
                  onClick={() =>
                    document.getElementById("profilePicInput").click()
                  }
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              ) : (
                <button
                  type="button"
                  className="mt-2 px-2 py-1 text-sm text-blue-600 hover:underline"
                  onClick={() =>
                    document.getElementById("profilePicInput").click()
                  }
                >
                  Upload Profile Picture
                </button>
              )}
            </label>

            {/* Profile Banner */}
            <label className="block mb-2">
              Profile Banner:
              <input
                type="file"
                accept="image/*"
                id="profileBannerInput"
                style={{ display: "none" }}
                onChange={handleProfileBannerChange}
              />
              {editingUser.profilebanner ? (
                <img
                  src={editingUser.profilebanner}
                  alt="Banner Preview"
                  className="mt-2 w-full max-h-40 object-cover rounded border cursor-pointer"
                  onClick={() =>
                    document.getElementById("profileBannerInput").click()
                  }
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              ) : (
                <button
                  type="button"
                  className="mt-2 px-2 py-1 text-sm text-blue-600 hover:underline"
                  onClick={() =>
                    document.getElementById("profileBannerInput").click()
                  }
                >
                  Upload Banner
                </button>
              )}
            </label>

            <label className="block mb-2">
              Phone:
              <input
                type="text"
                className="w-full border rounded px-3 py-2 mt-1"
                value={editingUser.phone}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, phone: e.target.value })
                }
              />
            </label>

            <label className="block mb-2">
              Company Name:
              <input
                type="text"
                className="w-full border rounded px-3 py-2 mt-1"
                value={editingUser.companyName}
                onChange={(e) =>
                  setEditingUser({
                    ...editingUser,
                    companyName: e.target.value,
                  })
                }
              />
            </label>

            <label className="block mb-2">
              Liked Units (comma separated IDs):
              <input
                type="text"
                className="w-full border rounded px-3 py-2 mt-1"
                value={editingUser.likedUnits?.join(",") || ""}
                onChange={(e) =>
                  setEditingUser({
                    ...editingUser,
                    likedUnits: e.target.value.split(",").map((s) => s.trim()),
                  })
                }
              />
            </label>

            <label className="block mb-2 flex items-center space-x-2">
              <input
                type="checkbox"
                checked={editingUser.isActive}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, isActive: e.target.checked })
                }
              />
              <span>Active</span>
            </label>

            <label className="block mb-2 flex items-center space-x-2">
              <input
                type="checkbox"
                checked={editingUser.isVerified}
                onChange={(e) =>
                  setEditingUser({
                    ...editingUser,
                    isVerified: e.target.checked,
                  })
                }
              />
              <span>Verified</span>
            </label>

            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
