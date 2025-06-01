import React, { useState, useEffect } from "react";
import { Dialog, Menu } from "@headlessui/react";
import { Plus, MoreVertical, Edit, Trash2, MapPin } from "lucide-react";
import axios from "axios";

const token = JSON.parse(sessionStorage.getItem("logindata"))?.token;

export default function BrokerAgentPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [filterType, setFilterType] = useState("All");
  const [properties, setProperties] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const BASE_URL = "https://crm-bcgg.onrender.com";

  const [brokers, setBrokers] = useState([]);
  const [users, setUsers] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileUrl, setFileUrl] = useState("");

  useEffect(() => {
    fetchBrokers();
    fetchUsers();
    fetchProperties();
  }, []);

  const fetchBrokers = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/broker/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      // Ensure user data is properly formatted
      const formattedBrokers = data.map((broker) => ({
        ...broker,
        user: broker.user || null, // Ensure user is either an object or null
      }));
      setBrokers(formattedBrokers);
    } catch (err) {
      console.error("Error fetching brokers:", err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const fetchProperties = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/properties/units`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setProperties(data);
    } catch (err) {
      console.error("Error fetching properties:", err);
    }
  };

  const [formData, setFormData] = useState({
    user: "",
    companyName: "",
    avatarUrl: "",
    properties: "",
    name: "",
    email: "",
    phone: "",
    location: "",
    selectType: "",
    activeListings: "",
    closedDeals: "",
    commissionRate: "",
  });

  const uploadSingleFile = async (file) => {
    // Create FormData object to send the file
    const formData = new FormData();
    formData.append("file", file); // Changed from "files" to "file" since we're uploading single file

    try {
      const response = await axios.post(
        "https://z-backend-2xag.onrender.com/api/upload", // Your upload endpoint
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          // Progress tracking callback
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadProgress(percentCompleted);
            }
          },
        }
      );

      // Return the uploaded file URL
      // Adjust this based on your API response structure
      return (
        response.data.fileUrl || response.data.url || response.data.urls?.[0]
      );
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error; // Re-throw the error for the calling function to handle
    }
  };

  // Example usage:
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setUploadProgress(0); // Reset progress
      const fileUrl = await uploadSingleFile(file);
      console.log("File uploaded successfully:", fileUrl);
      // Do something with the fileUrl (e.g., update state)
    } catch (error) {
      alert("File upload failed. Please try again.");
    } finally {
      setUploadProgress(0); // Reset progress when done
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const payload = {
      ...formData,
      ActiveListings: parseInt(formData.ActiveListings),
      closedDeals: parseInt(formData.closedDeals),
      commissionRate: parseInt(formData.commissionRate),
    };

    try {
      if (isEdit && editIndex !== null) {
        const brokerToEdit = brokers[editIndex];
        const res = await fetch(
          `${BASE_URL}/api/broker/${brokerToEdit._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
          }
        );

        if (!res.ok) throw new Error("Failed to update broker");
      } else {
        const res = await fetch(`${BASE_URL}/api/broker/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error("Failed to add broker");
      }

      await fetchBrokers(); // Refresh list
      setIsOpen(false);
      resetForm();
    } catch (err) {
      console.error(err);
    }
  };

  const resetForm = () => {
    setFormData({
      user: "",
      companyName: "",
      avatarUrl: "",
      properties: "",
      name: "",
      email: "",
      phone: "",
      location: "",
      selectType: "",
      activeListings: "",
      closedDeals: "",
      commissionRate: "",
    });
    setPreviewUrl("");
    setSelectedFile(null);
    setIsEdit(false);
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    const brokerToEdit = brokers[index];
    setFormData({
      user: brokerToEdit.user?._id || brokerToEdit.user || "",
      companyName: brokerToEdit.companyName || "",
      avatarUrl: brokerToEdit.avatarUrl || "",
      properties: brokerToEdit.properties || "",
      name: brokerToEdit.name || "",
      email: brokerToEdit.email || "",
      phone: brokerToEdit.phone || "",
      location: brokerToEdit.location || "",
      selectType: brokerToEdit.selectType || "",
      activeListings: brokerToEdit.activeListings?.toString() || "",
      closedDeals: brokerToEdit.closedDeals?.toString() || "",
      commissionRate: brokerToEdit.commissionRate?.toString() || "",
    });
    setPreviewUrl(brokerToEdit.avatarUrl || "");
    setIsEdit(true);
    setEditIndex(index);
    setIsOpen(true);
  };

  const handleDelete = async (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this broker?"
    );
    if (!confirmDelete) return;

    try {
      const brokerToDelete = brokers[index];
      const res = await fetch(`${BASE_URL}/broker/${brokerToDelete._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to delete broker");

      await fetchBrokers();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const filteredBrokers =
    filterType === "All"
      ? brokers
      : brokers.filter((b) => b.type === filterType);

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <h1 className="font-semibold text-xl text-gray-800 mb-6">
        Brokers & Agents
      </h1>

      {/* Top Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search brokers & agents..."
            className="border rounded px-4 py-2 shadow-sm md:w-64"
          />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border px-3 py-2 rounded shadow-sm text-sm"
          >
            <option value="All">All Types</option>
            <option value="Broker">Broker</option>
            <option value="Agent">Agent</option>
            <option value="Internal">Internal</option>
          </select>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded shadow hover:bg-purple-700 flex items-center gap-2"
        >
          <Plus size={18} /> Add Broker/Agent
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredBrokers.map((broker, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-md p-5 relative">
            <Menu as="div" className="absolute right-4 top-4 text-right z-10">
              <Menu.Button className="p-1 hover:bg-gray-100 rounded-full">
                <MoreVertical size={20} />
              </Menu.Button>
              <Menu.Items className="absolute right-0 mt-2 w-44 bg-white border rounded shadow-md z-20">
                <div className="px-4 py-2 font-semibold text-sm text-gray-700">
                  Actions
                </div>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => handleEdit(idx)}
                      className={`w-full px-4 py-2 text-sm flex items-center gap-2 ${
                        active ? "bg-gray-100" : ""
                      }`}
                    >
                      <Edit size={16} /> Edit
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => handleDelete(idx)}
                      className={`w-full px-4 py-2 text-sm text-red-600 flex items-center gap-2 ${
                        active ? "bg-gray-100" : ""
                      }`}
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>

            <div className="flex flex-col">
              <div className="flex items-start gap-4">
                <img
                  src={broker.avatarUrl || "https://via.placeholder.com/80"}
                  className="w-20 h-20 rounded-full mb-2"
                  alt={broker.name}
                />
                <div>
                  <span className="bg-purple-500 text-white w-[100px] text-center text-xs px-3 py-1 rounded-full mb-2">
                    {broker.selectType}
                  </span>
                  <div className="flex items-center gap-2 text-lg">
                    {broker.name}
                    <span className="flex items-center text-sm text-gray-500 gap-1">
                      <MapPin size={14} className="text-gray-400" />
                      {broker.location}
                    </span>
                  </div>
                  {broker.companyName && (
                    <div className="text-sm text-gray-600 mt-1">
                      {broker.companyName}
                    </div>
                  )}
                </div>
              </div>
              <div className="text-sm text-gray-600 mt-2 space-y-1">
                <div className="flex items-center gap-2">
                  <span>📧</span> {broker.email}
                </div>
                <div className="flex items-center gap-2">
                  <span>📞</span> {broker.phone}
                </div>
                {broker.user && (
                  <div className="flex items-center gap-2">
                    <span>👤</span>
                    {typeof broker.user === "object"
                      ? broker.user.name ||
                        broker.user.username ||
                        broker.user.email ||
                        "User"
                      : broker.user}
                  </div>
                )}
                {broker.properties && (
                  <div className="flex items-center gap-2">
                    <span>🏠</span>
                    {typeof broker.properties === "object"
                      ? broker.properties.unitNumber || broker.properties._id
                      : broker.properties.unitNumber}
                  </div>
                )}
              </div>
              <div className="flex justify-between w-full mt-4 border-t pt-3 text-sm">
                <div className="w-1/3 text-center">
                  <div className="text-purple-700 font-bold">
                    {broker.activeListings}
                  </div>
                  <div className="text-gray-500">Listings</div>
                </div>
                <div className="w-1/3 text-center">
                  <div className="text-purple-700 font-bold">
                    {broker.closedDeals}
                  </div>
                  <div className="text-gray-500">Deals</div>
                </div>
                <div className="w-1/3 text-center">
                  <div className="text-purple-700 font-bold">
                    {broker.commissionRate}%
                  </div>
                  <div className="text-gray-500">Commission</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Dialog */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30"
      >
        <Dialog.Panel className="bg-white p-6 rounded shadow-md w-full max-w-lg mx-4 max-h-[80vh] overflow-y-auto">
          <Dialog.Title className="text-lg font-bold mb-4">
            {isEdit ? "Edit Broker/Agent" : "Add Broker/Agent"}
          </Dialog.Title>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* New fields added at the beginning */}
            <div className="space-y-1 sm:col-span-2">
              <label
                htmlFor="user"
                className="block text-sm font-medium text-gray-700"
              >
                User
              </label>
              <select
                id="user"
                name="user"
                value={formData.user}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              >
                <option value="">Select User</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name} ({user.email})
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label
                htmlFor="companyName"
                className="block text-sm font-medium text-gray-700"
              >
                Company Name
              </label>
              <input
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                placeholder="Company Name"
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor="avatarUrl"
                className="block text-sm font-medium text-gray-700"
              >
                Avatar Image
              </label>
              <div className="flex items-center gap-4">
                {previewUrl && (
                  <img
                    src={previewUrl}
                    className="w-16 h-16 rounded-full object-cover"
                    alt="Preview"
                  />
                )}
                <div>
                  <input
                    type="file"
                    id="avatarUrl"
                    name="avatarUrl"
                    onChange={handleFileChange}
                    className="border p-2 rounded w-full"
                    accept="image/*"
                  />
                  {formData.avatarUrl && (
                    <p className="text-xs text-gray-500 mt-1 truncate">
                      {formData.avatarUrl}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <label
                htmlFor="properties"
                className="block text-sm font-medium text-gray-700"
              >
                Properties
              </label>
              <select
                id="properties"
                name="properties"
                value={formData.properties}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              >
                <option value="">Select Property</option>
                {properties.map((property) => (
                  <option key={property._id} value={property._id}>
                    {property.unitNumber || property.name || property._id}
                  </option>
                ))}
              </select>
            </div>

            {/* Existing fields */}
            <div className="space-y-1">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                placeholder="Name"
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                placeholder="Email"
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                placeholder="Phone"
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700"
              >
                Location
              </label>
              <input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                placeholder="Location"
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor="selectType"
                className="block text-sm font-medium text-gray-700"
              >
                Type
              </label>
              <select
                id="selectType"
                name="selectType"
                value={formData.selectType}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              >
                <option value="selectType">Select Type</option>
                <option value="Internal">Internal</option>
                <option value="Broker">Broker</option>
                <option value="Agent">Agent</option>
              </select>
            </div>
            <div className="space-y-1">
              <label
                htmlFor="activeListings"
                className="block text-sm font-medium text-gray-700"
              >
                Active Listings
              </label>
              <input
                id="activeListings"
                name="activeListings"
                value={formData.activeListings}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                placeholder="ActiveListings"
                type="number"
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor="closedDeals"
                className="block text-sm font-medium text-gray-700"
              >
                Closed Deals
              </label>
              <input
                id="closedDeals"
                name="closedDeals"
                value={formData.closedDeals}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                placeholder="Closed Deals"
                type="number"
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor="commissionRate"
                className="block text-sm font-medium text-gray-700"
              >
                Commission Rate (%)
              </label>
              <input
                id="commissionRate"
                name="commissionRate"
                value={formData.commissionRate}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                placeholder="Commission Rate"
                type="number"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 rounded border"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Save
            </button>
          </div>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
}