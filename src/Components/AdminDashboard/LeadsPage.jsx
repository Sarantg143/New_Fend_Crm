import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MoreVertical,
  Edit2,
  Trash2,
  Send,
  Voicemail,
  Building2,
  History,
} from "lucide-react";

const BASE_URL = "https://crm-bcgg.onrender.com";
const token = JSON.parse(sessionStorage.getItem("logindata"))?.token;

const LeadsPage = () => {
  const [leads, setLeads] = useState([]);
  const [users, setUsers] = useState([]); // Added users state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch leads
        const leadsResponse = await axios.get(`${BASE_URL}/api/leads/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLeads(leadsResponse.data);

        // Fetch users (you'll need to adjust this endpoint based on your API)
        const usersResponse = await axios.get(`${BASE_URL}/api/users/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(usersResponse.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const [statusFilter, setStatusFilter] = useState("All");
  const [builders, setBuilders] = useState([]);
  const [projects, setProjects] = useState([]);
  const [units, setUnits] = useState([]);

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const response = await axios.get(
          "https://crm-bcgg.onrender.com/api/properties/units"
        );
        setUnits(response.data);
      } catch (error) {
        console.error("Error fetching units:", error);
      }
    };

    fetchUnits();
  }, []);

  const [newLead, setNewLead] = useState({
    name: "",
    email: "",
    phone: "",
    status: "new",
    source: "website",
    interestedIn: {
      builder: null,
      project: null,
      unit: null,
    },
    assignedTo: "",
    notes: [],
    createdAt: "",
    avatar: "",
  });
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [builderRes, unitRes] = await Promise.all([
          axios.get(
            "https://crm-bcgg.onrender.com/api/properties/builder-profile"
          ),
          axios.get("https://crm-bcgg.onrender.com/api/properties/units"),
        ]);
        setBuilders(builderRes.data);
        setUnits(unitRes.data);
      } catch (err) {
        console.error("Initial fetch error", err);
      }
    };

    fetchInitialData();
  }, []);

  const handleInterestedInChange = async (e) => {
    const { name, value } = e.target;

    if (name === "builder") {
      try {
        const res = await axios.get(
          `https://crm-bcgg.onrender.com/api/properties/projects/by-builder/${value}`
        );
        setProjects(res.data);
        setNewLead((prev) => ({
          ...prev,
          interestedIn: {
            ...prev.interestedIn,
            builder: value,
            project: "",
            unit: "",
          },
        }));
      } catch (err) {
        console.error("Error fetching projects", err);
      }
    } else {
      setNewLead((prev) => ({
        ...prev,
        interestedIn: {
          ...prev.interestedIn,
          [name]: value,
        },
      }));
    }
  };

  const [showPopup, setShowPopup] = useState(false);
  const [editingLeadIndex, setEditingLeadIndex] = useState(null);
  const [actionMenuIndex, setActionMenuIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewLead((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewLead((prev) => ({
          ...prev,
          avatar: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNoteChange = (e) => {
    const note = e.target.value;
    setNewLead((prev) => ({
      ...prev,
      notes: note
        ? [
            {
              note,
              date: new Date().toISOString().split("T")[0],
              addedBy: null,
            },
          ]
        : [],
    }));
  };

  const getUserName = (userId) => {
    if (!userId) return "Unassigned";
    const user = users.find((u) => u._id === userId); // Changed to _id as most APIs use this
    return user ? user.name : "Unassigned";
  };

  const handleSaveLead = async () => {
    if (!newLead.name) {
      alert("Name is required.");
      return;
    }

    try {
      if (editingLeadIndex !== null) {
        // Update existing lead
        const leadToUpdate = leads[editingLeadIndex];
        const response = await axios.put(
          `${BASE_URL}/api/leads/${leadToUpdate._id}`,
          newLead,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const updatedLeads = leads.map((lead, index) =>
          index === editingLeadIndex ? response.data : lead
        );
        setLeads(updatedLeads);
      } else {
        // Create new lead
        const response = await axios.post(
          `${BASE_URL}/api/leads/`,
          {
            ...newLead,
            notes:
              newLead.notes.length > 0
                ? newLead.notes
                : [
                    {
                      note: "Initial contact",
                      date: new Date().toISOString().split("T")[0],
                      addedBy: null,
                    },
                  ],
            createdAt:
              newLead.createdAt || new Date().toISOString().split("T")[0],
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLeads([...leads, response.data]);
      }

      resetForm();
      setShowPopup(false);
      setEditingLeadIndex(null);
    } catch (error) {
      console.error("Failed to save lead:", error);
      alert("Failed to save lead. Please try again.");
    }
  };

  const handleEditLead = (index) => {
    setNewLead(JSON.parse(JSON.stringify(leads[index])));
    setEditingLeadIndex(index);
    setShowPopup(true);
    setActionMenuIndex(null);
  };

  const handleDeleteLead = async (index) => {
    const leadToDelete = leads[index];
    try {
      await axios.delete(`${BASE_URL}/api/leads/${leadToDelete._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLeads(leads.filter((_, i) => i !== index));
      setActionMenuIndex(null);
    } catch (error) {
      console.error("Failed to delete lead:", error);
      alert("Failed to delete lead. Please try again.");
    }
  };

  const resetForm = () => {
    setNewLead({
      name: "",
      email: "",
      phone: "",
      status: "new",
      source: "website",
      interestedIn: {
        builder: null,
        project: null,
        unit: null,
      },
      assignedTo: "",
      notes: [],
      createdAt: "",
      avatar: "",
    });
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800";
      case "contacted":
        return "bg-purple-100 text-purple-800";
      case "interested":
        return "bg-yellow-100 text-yellow-800";
      case "converted":
        return "bg-green-100 text-green-800";
      case "not interested":
        return "bg-gray-100 text-gray-800";
      case "lost":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredLeads =
    statusFilter === "All"
      ? leads
      : leads.filter((lead) => lead.status === statusFilter);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="p-3 text-lg font-semibold">Lead Management</h1>

      {/* Filter + Add Lead */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded max-w-xs"
        >
          <option value="All">All Statuses</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="interested">Interested</option>
          <option value="not interested">Not Interested</option>
          <option value="converted">Converted</option>
          <option value="lost">Lost</option>
        </select>
        <button
          onClick={() => {
            resetForm();
            setShowPopup(true);
          }}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          + Add Lead
        </button>
      </div>

      {/* Lead Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        {filteredLeads.map((lead, index) => (
          <div
            key={lead._id || index}
            className="bg-white p-4 rounded-lg shadow relative"
          >
            <div className="absolute top-3 right-3">
              <button
                onClick={() =>
                  setActionMenuIndex(index === actionMenuIndex ? null : index)
                }
                className="text-gray-500 hover:text-gray-700"
              >
                <MoreVertical size={20} />
              </button>
              {actionMenuIndex === index && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow z-10">
                  <div className="px-4 py-2 font-semibold text-sm text-gray-700 border-b">
                    Actions
                  </div>
                  <button
                    onClick={() => handleEditLead(index)}
                    className="w-full px-4 py-2 text-sm flex items-center gap-2 hover:bg-gray-100"
                  >
                    <Edit2 size={16} /> Edit Lead
                  </button>
                  <button
                    onClick={() => handleDeleteLead(index)}
                    className="w-full px-4 py-2 text-sm text-red-600 flex items-center gap-2 hover:bg-gray-100"
                  >
                    <Trash2 size={16} /> Delete Lead
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 mb-2">
              <img
                src={lead.avatar || "https://via.placeholder.com/40"}
                alt={lead.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg">{lead.name}</h3>
                <p className="text-sm text-gray-500 capitalize">
                  {lead.source}
                </p>
              </div>
            </div>
            <div className="text-sm text-gray-600 space-y-2 mt-2">
              <p className="flex items-center gap-2">
                <Send size={16} /> {lead.email}
              </p>
              <p className="flex items-center gap-2">
                <Voicemail size={16} /> {lead.phone}
              </p>
              <p className="flex items-center gap-2">
                <Building2 size={16} />
                {lead.notes.length > 0 ? lead.notes[0].note : "No notes"}
              </p>
              <p className="flex items-center gap-2">
                <History size={16} /> Created: {lead.createdAt}
              </p>
              <p className="flex items-center gap-2">
                Assigned To: {getUserName(lead.assignedTo)}
              </p>
            </div>
            <div className="flex justify-between items-center mt-4">
              <span
                className={`text-xs px-2 py-1 rounded-full font-semibold capitalize ${getStatusStyle(
                  lead.status
                )}`}
              >
                {lead.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Popup Form */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {editingLeadIndex !== null ? "Edit Lead" : "Add New Lead"}
              </h2>
              <button
                onClick={() => {
                  setShowPopup(false);
                  setEditingLeadIndex(null);
                }}
                className="text-gray-500 hover:text-red-500 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Avatar Image */}
              <div className="flex flex-col md:col-span-2">
                <label className="mb-1 font-medium" htmlFor="avatar">
                  Avatar Image
                </label>
                <div className="flex items-center gap-4">
                  {/* <img
                    src={newLead.avatar || "https://via.placeholder.com/100"}
                    alt="Avatar preview"
                    className="w-16 h-16 rounded-full object-cover"
                  /> */}
                  <input
                    type="file"
                    id="avatar"
                    name="avatar"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="border p-2 rounded"
                  />
                </div>
              </div>

              {/* Name */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium" htmlFor="name">
                  Name *
                </label>
                <input
                  id="name"
                  name="name"
                  value={newLead.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="border p-2 rounded"
                  required
                />
              </div>
              {/* Email */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  value={newLead.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="border p-2 rounded"
                />
              </div>
              {/* Phone */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium" htmlFor="phone">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  value={newLead.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  className="border p-2 rounded"
                />
              </div>
              {/* Status */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium" htmlFor="status">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={newLead.status}
                  onChange={handleChange}
                  className="border p-2 rounded"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="interested">Interested</option>
                  <option value="not interested">Not Interested</option>
                  <option value="converted">Converted</option>
                  <option value="lost">Lost</option>
                </select>
              </div>
              {/* Source */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium" htmlFor="source">
                  Source
                </label>
                <select
                  id="source"
                  name="source"
                  value={newLead.source}
                  onChange={handleChange}
                  className="border p-2 rounded"
                >
                  <option value="website">Website</option>
                  <option value="referral">Referral</option>
                  <option value="phone">Phone</option>
                  <option value="email">Email</option>
                  <option value="walk-in">Walk-in</option>
                  <option value="advertisement">Advertisement</option>
                  <option value="other">Other</option>
                </select>
              </div>
              {/* Assigned To */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium" htmlFor="assignedTo">
                  Assigned To
                </label>
                <select
                  id="assignedTo"
                  name="assignedTo"
                  value={newLead.assignedTo}
                  onChange={handleChange}
                  className="border p-2 rounded"
                >
                  <option value="">Select User</option>
                  {users.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* Interested In - Builder */}
              {/* Builder Select */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium" htmlFor="builder">
                  Interested in Builder
                </label>
                <select
                  id="builder"
                  name="builder"
                  value={newLead.interestedIn.builder || ""}
                  onChange={handleInterestedInChange}
                  className="border p-2 rounded"
                >
                  <option value="">Select Builder</option>
                  {builders.map((builder) => (
                    <option key={builder._id} value={builder._id}>
                      {builder.companyName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Project Select */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium" htmlFor="project">
                  Interested in Project
                </label>
                <select
                  id="project"
                  name="project"
                  value={newLead.interestedIn.project || ""}
                  onChange={handleInterestedInChange}
                  className="border p-2 rounded"
                >
                  <option value="">Select Project</option>
                  {projects.map((project) => (
                    <option key={project._id} value={project._id}>
                      {project.projectName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Unit Select */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium" htmlFor="unit">
                  Interested in Unit
                </label>
                <select
                  id="unit"
                  name="unit"
                  value={newLead.interestedIn.unit || ""}
                  onChange={handleInterestedInChange}
                  className="border p-2 rounded"
                >
                  <option value="">Select Unit</option>
                  {units.map((unit) => (
                    <option key={unit._id} value={unit._id}>
                      {unit.propertyType} - {unit.bhkType}
                    </option>
                  ))}
                </select>
              </div>

              {/* Notes */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium" htmlFor="notes">
                  Notes
                </label>
                <input
                  id="notes"
                  name="notes"
                  value={newLead.notes.length > 0 ? newLead.notes[0].note : ""}
                  onChange={handleNoteChange}
                  placeholder="Initial note"
                  className="border p-2 rounded"
                />
              </div>
              {/* Created At */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium" htmlFor="createdAt">
                  Created At
                </label>
                <input
                  type="date"
                  id="createdAt"
                  name="createdAt"
                  value={newLead.createdAt}
                  onChange={handleChange}
                  placeholder="YYYY-MM-DD"
                  className="border p-2 rounded"
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => {
                  setShowPopup(false);
                  setEditingLeadIndex(null);
                }}
                className="mr-2 px-4 py-2 border rounded text-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveLead}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
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

export default LeadsPage;
