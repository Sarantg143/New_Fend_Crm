import React, { useState } from "react";
import { FaHome, FaCity, FaEnvelope } from "react-icons/fa";

const PropertyList = () => {
  const [properties, setProperties] = useState([
    {
      name: "Oakwood Apartments",
      address: "123 Main St",
      city: "Austin",
      state: "TX",
      zipcode: "78701",
      image:
        "https://cdnassets.hw.net/04/2c/967deff449bd8a24c5fbb96dccd2/6474f8a03a894163ac235432988b491f.png",
      description: "Modern apartment complex with great amenities.",
      status: "Occupied",
    },
    {
      name: "Riverside Townhomes",
      address: "456 River Rd",
      city: "Austin",
      state: "TX",
      zipcode: "78702",
      image:
        "https://cdnassets.hw.net/04/2c/967deff449bd8a24c5fbb96dccd2/6474f8a03a894163ac235432988b491f.png",
      description: "Charming townhomes by the river.",
      status: "Vacant",
    },
    {
      name: "Downtown Lofts",
      address: "789 Commerce St",
      city: "Austin",
      state: "TX",
      zipcode: "78703",
      image:
        "https://cdnassets.hw.net/04/2c/967deff449bd8a24c5fbb96dccd2/6474f8a03a894163ac235432988b491f.png",
      description: "Luxury lofts in downtown Austin.",
      status: "Maintenance",
    },
  ]);

  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const emptyForm = {
    name: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    image: "",
    description: "",
    status: "Vacant",
  };

  const [formData, setFormData] = useState(emptyForm);

  const openAddForm = () => {
    setFormData(emptyForm);
    setEditingIndex(null);
    setShowForm(true);
  };

  const openEditForm = (index) => {
    setFormData(properties[index]);
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = () => {
    if (
      formData.name &&
      formData.address &&
      formData.city &&
      formData.state &&
      formData.zipcode &&
      formData.image
    ) {
      if (editingIndex !== null) {
        const updated = [...properties];
        updated[editingIndex] = formData;
        setProperties(updated);
      } else {
        setProperties((prev) => [...prev, formData]);
      }
      setShowForm(false);
      setEditingIndex(null);
      setFormData(emptyForm);
    } else {
      alert("Please fill all required fields.");
    }
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      const updated = properties.filter((_, i) => i !== index);
      setProperties(updated);
    }
  };

  const statusColors = {
    Occupied: "bg-green-100 text-green-700",
    Vacant: "bg-red-100 text-red-700",
    Maintenance: "bg-yellow-100 text-yellow-700",
  };

  const filteredProperties =
    filter === "All"
      ? properties
      : properties.filter((p) => p.status === filter);

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-semibold"> Properties</h1>
        <div className="flex gap-3">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded px-3 py-1"
          >
            <option value="All">All</option>
            <option value="Occupied">Occupied</option>
            <option value="Vacant">Vacant</option>
            <option value="Maintenance">Maintenance</option>
          </select>
          <button
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
            onClick={openAddForm}
          >
            ➕ Add Property
          </button>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="flex flex-wrap gap-8">
        {filteredProperties.map((property, index) => (
          <div
            key={index}
            className="rounded-lg overflow-hidden w-full sm:w-[350px]"
          >
            <img
              src={property.image}
              alt={property.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">{property.name}</h2>
                <span
                  className={`text-sm px-2 py-1 rounded ${
                    statusColors[property.status]
                  }`}
                >
                  {property.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                {property.address}, {property.city}, {property.state}{" "}
                {property.zipcode}
              </p>

              <div className="flex justify-between text-gray-600 text-sm mb-3">
                <div className="flex items-center gap-1">
                  <FaHome className="text-blue-600" />
                  <span>Home</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaCity className="text-purple-600" />
                  <span>{property.city}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaEnvelope className="text-red-600" />
                  <span>{property.zipcode}</span>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                {property.description}
              </p>
              <div className="mt-2 flex justify-between">
                <button
                  onClick={() => openEditForm(index)}
                  className="flex items-center gap-1 px-4 py-1 border rounded hover:bg-gray-100"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="flex items-center gap-1 px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Popup Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[95%] sm:w-[600px] max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">
              {editingIndex !== null ? "Edit Property" : "Add New Property"}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                name="name"
                type="text"
                placeholder="Name *"
                className="border p-2 rounded"
                value={formData.name}
                onChange={handleFormChange}
              />
              <input
                name="address"
                type="text"
                placeholder="Address *"
                className="border p-2 rounded"
                value={formData.address}
                onChange={handleFormChange}
              />
              <input
                name="city"
                type="text"
                placeholder="City *"
                className="border p-2 rounded"
                value={formData.city}
                onChange={handleFormChange}
              />
              <input
                name="state"
                type="text"
                placeholder="State *"
                className="border p-2 rounded"
                value={formData.state}
                onChange={handleFormChange}
              />
              <input
                name="zipcode"
                type="text"
                placeholder="Zipcode *"
                className="border p-2 rounded"
                value={formData.zipcode}
                onChange={handleFormChange}
              />
              <input
                name="image"
                type="text"
                placeholder="Image URL *"
                className="border p-2 rounded"
                value={formData.image}
                onChange={handleFormChange}
              />
              <textarea
                name="description"
                placeholder="Description"
                className="border p-2 rounded col-span-2"
                value={formData.description}
                onChange={handleFormChange}
              />
              <select
                name="status"
                className="border p-2 rounded"
                value={formData.status}
                onChange={handleFormChange}
              >
                <option value="Occupied">Occupied</option>
                <option value="Vacant">Vacant</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>
            <div className="mt-4 flex gap-2 justify-end">
              <button
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                onClick={handleFormSubmit}
              >
                {editingIndex !== null ? "Update" : "Save"}
              </button>
              <button
                className="border px-4 py-2 rounded"
                onClick={() => {
                  setShowForm(false);
                  setEditingIndex(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyList;
