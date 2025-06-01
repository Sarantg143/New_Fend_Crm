import React, { useState, useEffect } from "react";
import { Pencil, Trash2, Plus, X } from "lucide-react";

const defaultForm = {
  title: "",
  description: "",
  propertyId: "",
  unitNumber: "",
  tenantId: "",
  priority: "Low",
  status: "New",
  category: "",
  dateSubmitted: "",
  assignedTo: "",
  estimateCost: "",
  notes: "",
};

const defaultRequests = [
  {
    id: 1,
    title: "Leaky Faucet in Kitchen",
    description: "The kitchen faucet is leaking and needs to be fixed.",
    propertyId: "Greenview Apartments",
    unitNumber: "A-101",
    tenantId: "John Doe",
    priority: "Medium",
    status: "New",
    category: "Plumbing",
    dateSubmitted: "2025-05-01",
    assignedTo: "Plumber Mike",
    estimateCost: "$50",
    notes: "Tenant reported via email",
  },
  {
    id: 2,
    title: "Broken Window",
    description: "Living room window glass is cracked.",
    propertyId: "Sunrise Villas",
    unitNumber: "B-202",
    tenantId: "Jane Smith",
    priority: "High",
    status: "Assigned",
    category: "Windows",
    dateSubmitted: "2025-04-30",
    assignedTo: "GlassFix Co.",
    estimateCost: "$120",
    notes: "",
  },
  {
    id: 3,
    title: "AC Not Cooling",
    description: "Air conditioner not cooling properly.",
    propertyId: "Palm Residency",
    unitNumber: "C-303",
    tenantId: "Robert Brown",
    priority: "High",
    status: "In Progress",
    category: "HVAC",
    dateSubmitted: "2025-04-29",
    assignedTo: "CoolAir Services",
    estimateCost: "$200",
    notes: "Technician scheduled for May 6",
  },
];

const MaintenanceRequests = () => {
  const [requests, setRequests] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [form, setForm] = useState(defaultForm);
  const [isOpen, setIsOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Load default requests only once
    setRequests(defaultRequests);
  }, []);

  useEffect(() => {
    setFiltered(
      requests.filter((r) =>
        r.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, requests]);

  const handleSubmit = () => {
    if (editId) {
      setRequests((prev) =>
        prev.map((r) => (r.id === editId ? { ...form, id: editId } : r))
      );
    } else {
      setRequests((prev) => [...prev, { ...form, id: Date.now() }]);
    }
    resetForm();
  };

  const handleEdit = (req) => {
    setForm(req);
    setEditId(req.id);
    setIsOpen(true);
  };

  const handleDelete = (id) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  const resetForm = () => {
    setForm(defaultForm);
    setIsOpen(false);
    setEditId(null);
  };

  const getPriorityBadge = (priority) => {
    const base = "text-xs px-2 py-1 rounded-full";
    switch (priority) {
      case "High":
        return (
          <span className={`${base} bg-orange-100 text-orange-700`}>
            High Priority
          </span>
        );
      case "Medium":
        return (
          <span className={`${base} bg-yellow-100 text-yellow-700`}>
            Medium Priority
          </span>
        );
      case "Low":
        return (
          <span className={`${base} bg-blue-100 text-blue-700`}>
            Low Priority
          </span>
        );
      default:
        return null;
    }
  };

  const getStatusBadge = (status) => {
    const base = "text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700";
    return <span className={base}>{status}</span>;
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          Maintenance Requests
        </h2>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <Plus size={18} /> Add New Request
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
        {["All Requests", "New", "Assigned", "In Progress", "Completed"].map(
          (label, index) => (
            <div
              key={index}
              className="border rounded-lg px-4 py-3 text-center shadow-sm hover:shadow transition"
            >
              <h3 className="text-sm text-gray-600">{label}</h3>
              <p className="text-xl font-semibold">
                {label === "All Requests"
                  ? requests.length
                  : requests.filter((r) => r.status === label).length}
              </p>
            </div>
          )
        )}
      </div>

      {/* Search Input */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-2">
        <input
          type="text"
          placeholder="Search maintenance requests..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className=" w-[250px] px-4 py-2 border rounded"
        />
      </div>

      {/* Request Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((req) => (
          <div key={req.id} className="border rounded-lg p-4 shadow-sm">
            <h3 className="text-lg font-semibold">{req.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{req.description}</p>
            <div className="text-sm text-gray-700 mb-1">
              <strong>Property:</strong> {req.propertyId} &nbsp; | &nbsp;
              <strong>Unit:</strong> {req.unitNumber} &nbsp; | &nbsp;
              <strong>Tenant:</strong> {req.tenantId}
            </div>
            <div className="text-sm text-gray-700 mb-1">
              <strong>Category:</strong> {req.category} &nbsp; | &nbsp;
              <strong>Submitted:</strong> {req.dateSubmitted}
            </div>
            <div className="text-sm text-gray-700 mb-1">
              <strong>Assigned To:</strong> {req.assignedTo || "N/A"} &nbsp; |
              &nbsp;
              <strong>Estimate Cost:</strong> {req.estimateCost || "N/A"}
            </div>
            {req.notes && (
              <div className="text-sm text-gray-700 mb-2">
                <strong>Notes:</strong> {req.notes}
              </div>
            )}
            <div className="flex items-center gap-2 mb-2">
              {getPriorityBadge(req.priority)}
              {getStatusBadge(req.status)}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(req)}
                className="border px-4 py-2 rounded flex items-center gap-1"
              >
                <Pencil size={16} /> Edit
              </button>
              <button
                onClick={() => handleDelete(req.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex items-center gap-1"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Form Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={resetForm}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-bold mb-4">
              {editId ? "Edit Request" : "Add New Request"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="border p-2 rounded"
              />
              <input
                placeholder="Property"
                value={form.propertyId}
                onChange={(e) =>
                  setForm({ ...form, propertyId: e.target.value })
                }
                className="border p-2 rounded"
              />
              <input
                placeholder="Unit Number"
                value={form.unitNumber}
                onChange={(e) =>
                  setForm({ ...form, unitNumber: e.target.value })
                }
                className="border p-2 rounded"
              />
              <input
                placeholder="Tenant"
                value={form.tenantId}
                onChange={(e) => setForm({ ...form, tenantId: e.target.value })}
                className="border p-2 rounded"
              />
              <select
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
                className="border p-2 rounded"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="border p-2 rounded"
              >
                <option>New</option>
                <option>Assigned</option>
                <option>In Progress</option>
                <option>Completed</option>
                <option>Cancelled</option>
              </select>
              <input
                placeholder="Category"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="border p-2 rounded"
              />
              <input
                placeholder="Date Submitted"
                value={form.dateSubmitted}
                onChange={(e) =>
                  setForm({ ...form, dateSubmitted: e.target.value })
                }
                className="border p-2 rounded"
              />
              <input
                placeholder="Assigned To"
                value={form.assignedTo}
                onChange={(e) =>
                  setForm({ ...form, assignedTo: e.target.value })
                }
                className="border p-2 rounded"
              />
              <input
                placeholder="Estimate Cost"
                value={form.estimateCost}
                onChange={(e) =>
                  setForm({ ...form, estimateCost: e.target.value })
                }
                className="border p-2 rounded"
              />
            </div>
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="border p-2 rounded w-full mt-4"
            />
            <textarea
              placeholder="Notes"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="border p-2 rounded w-full mt-2"
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                {editId ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MaintenanceRequests;
