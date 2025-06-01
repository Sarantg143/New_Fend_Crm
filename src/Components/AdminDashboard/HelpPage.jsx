import React, { useState, useEffect } from "react";
import axios from "axios";

const token = JSON.parse(sessionStorage.getItem("logindata"))?.token;
const BASE_URL = "https://crm-bcgg.onrender.com";

const JsonTableDisplay = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/inquiries/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error("Error fetching inquiries:", err);
      }
    };

    fetchData();
  }, []);

  // Function to handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/inquiries/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(data.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error deleting inquiry:", err);
      setError("Failed to delete inquiry");
    }
  };

  // Function to start editing
  const handleEdit = (item) => {
    setEditingId(item._id);
    setEditForm({
      ...item,
      builderName: item.builder?.companyName || "",
      userName: item.user?.name || "",
    });
  };

  // Function to handle edit form changes
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  // Function to save edits
  const handleSave = async () => {
    try {
      // Prepare the data to send - only include fields that should be updated
      const updateData = {
        status: editForm.status,
        message: editForm.message,
        contactEmail: editForm.contactEmail,
        contactPhone: editForm.contactPhone,
      };

      const response = await axios.put(
        `${BASE_URL}/api/inquiries/${editingId}/status/admin`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData(
        data.map((item) => (item._id === editingId ? response.data : item))
      );
      setEditingId(null);
    } catch (err) {
      console.error("Error updating inquiry:", err);
      setError("Failed to update inquiry");
    }
  };

  // Function to cancel editing
  const handleCancel = () => {
    setEditingId(null);
  };

  // Get all field names from the first item (if data exists)
  const allFields =
    data.length > 0
      ? Object.keys(data[0]).filter(
          (field) => field !== "_id" && !field.startsWith("_")
        )
      : [];

  // Custom field display names
  const fieldDisplayNames = {
    user: "User",
    builder: "Builder",
    project: "Project",
    message: "Message",
    contactEmail: "Contact Email",
    contactPhone: "Contact Phone",
    status: "Status",
    createdAt: "Created At",
    respondedAt: "Responded At",
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    let bgColor = "";
    let textColor = "";

    switch (status) {
      case "new":
        bgColor = "bg-red-100";
        textColor = "text-red-800";
        break;
      case "in-progress":
        bgColor = "bg-blue-100";
        textColor = "text-blue-800";
        break;
      case "closed":
        bgColor = "bg-green-100";
        textColor = "text-green-800";
        break;
      default:
        bgColor = "bg-gray-100";
        textColor = "text-gray-800";
    }

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}
      >
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Inquiry Management
          </h1>
          <p>Loading inquiries...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Inquiry Management
          </h1>
          <p className="text-red-500">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Inquiry Management
        </h1>

        {data.length === 0 ? (
          <p>No inquiries found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  {allFields.map((field, index) => (
                    <th
                      key={index}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {fieldDisplayNames[field] || field}
                    </th>
                  ))}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50">
                    {allFields.map((field) => {
                      if (editingId === item._id) {
                        // Render editable fields when in edit mode
                        if (field === "builder") {
                          return (
                            <td
                              key={`${item._id}-${field}`}
                              className="px-6 py-4 whitespace-nowrap"
                            >
                              <input
                                type="text"
                                name="builderName"
                                value={editForm.builderName || ""}
                                onChange={handleEditChange}
                                className="border rounded p-1 w-full"
                                disabled
                              />
                            </td>
                          );
                        } else if (field === "user") {
                          return (
                            <td
                              key={`${item._id}-${field}`}
                              className="px-6 py-4 whitespace-nowrap"
                            >
                              <input
                                type="text"
                                name="userName"
                                value={editForm.userName || ""}
                                onChange={handleEditChange}
                                className="border rounded p-1 w-full"
                                disabled
                              />
                            </td>
                          );
                        } else if (field === "status") {
                          return (
                            <td
                              key={`${item._id}-${field}`}
                              className="px-6 py-4 whitespace-nowrap"
                            >
                              <select
                                name="status"
                                value={editForm.status || ""}
                                onChange={handleEditChange}
                                className="border rounded p-1 w-full"
                              >
                                <option value="new">New</option>
                                <option value="in-progress">In Progress</option>
                                <option value="closed">Closed</option>
                              </select>
                            </td>
                          );
                        } else {
                          return (
                            <td
                              key={`${item._id}-${field}`}
                              className="px-6 py-4 whitespace-nowrap"
                            >
                              <input
                                type={
                                  field.includes("At")
                                    ? "datetime-local"
                                    : "text"
                                }
                                name={field}
                                value={editForm[field] || ""}
                                onChange={handleEditChange}
                                className="border rounded p-1 w-full"
                                disabled={field === "createdAt"}
                              />
                            </td>
                          );
                        }
                      } else {
                        // Render normal fields
                        const fieldValue = item[field];
                        return (
                          <td
                            key={`${item._id}-${field}`}
                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                          >
                            {field === "user" ? (
                              <div>
                                <div className="font-medium">
                                  {fieldValue?.name}
                                </div>
                                <div className="text-gray-500">
                                  {fieldValue?.email}
                                </div>
                              </div>
                            ) : field === "builder" ? (
                              fieldValue?.companyName
                            ) : field === "status" ? (
                              <StatusBadge status={fieldValue} />
                            ) : Array.isArray(fieldValue) ? (
                              <ul className="list-disc pl-5">
                                {fieldValue.map((val, i) => (
                                  <li key={i}>{val}</li>
                                ))}
                              </ul>
                            ) : typeof fieldValue === "object" ? (
                              JSON.stringify(fieldValue)
                            ) : typeof fieldValue === "boolean" ? (
                              fieldValue ? (
                                "Yes"
                              ) : (
                                "No"
                              )
                            ) : fieldValue === null ? (
                              "N/A"
                            ) : (
                              fieldValue
                            )}
                          </td>
                        );
                      }
                    })}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {editingId === item._id ? (
                        <div className="flex space-x-2">
                          <button
                            onClick={handleSave}
                            className="text-green-600 hover:text-green-900"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancel}
                            className="text-gray-600 hover:text-gray-900"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default JsonTableDisplay;