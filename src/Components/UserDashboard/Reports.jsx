import React, { useState } from "react";

const ReportsPage = () => {
  const [reports, setReports] = useState([
    {
      id: 1,
      date: "2025-04-20",
      type: "Application",
      status: "Approved",
      reportedBy: "John Doe",
      profileImage: "https://i.pravatar.cc/100?img=1",
      description: "Application for Flat #12A",
      property: "Casagrand Athens",
    },
    {
      id: 2,
      date: "2025-04-18",
      type: "Inquiry",
      status: "Pending",
      reportedBy: "Jane Smith",
      profileImage: "https://i.pravatar.cc/100?img=2",
      description: "Inquiry about villa prices",
      property: "Radiant Villas",
    },
    {
      id: 1,
      date: "2025-04-20",
      type: "Application",
      status: "Approved",
      reportedBy: "John Doe",
      profileImage: "https://i.pravatar.cc/100?img=1",
      description: "Application for Flat #12A",
      property: "Casagrand Athens",
    },
  ]);

  const [showPopup, setShowPopup] = useState(false);
  const [newReport, setNewReport] = useState({
    date: "",
    type: "Application",
    status: "Approved",
    reportedBy: "",
    profileImage: "",
    description: "",
    property: "",
  });

  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const filteredReports = reports.filter((report) => {
    const matchesType = typeFilter === "All" || report.type === typeFilter;
    const matchesStatus =
      statusFilter === "All" || report.status === statusFilter;
    const matchesFromDate = !fromDate || report.date >= fromDate;
    const matchesToDate = !toDate || report.date <= toDate;
    return matchesType && matchesStatus && matchesFromDate && matchesToDate;
  });

  const handleDownload = (format) => {
    alert(`Downloaded as ${format}`);
  };

  const handleAddReport = () => {
    const newId = reports.length + 1;
    const defaultImage = "https://i.pravatar.cc/100"; // fallback image
    setReports([
      ...reports,
      {
        id: newId,
        ...newReport,
        profileImage: newReport.profileImage || defaultImage,
      },
    ]);
    setNewReport({
      date: "",
      type: "Application",
      status: "Approved",
      reportedBy: "",
      profileImage: "",
      description: "",
      property: "",
    });
    setShowPopup(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Activity Reports</h1>
        <button
          onClick={() => setShowPopup(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Report
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="All">All Types</option>
          <option value="Application">Application</option>
          <option value="Inquiry">Inquiry</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="All">All Status</option>
          <option value="Approved">Approved</option>
          <option value="Pending">Pending</option>
          <option value="Rejected">Rejected</option>
          <option value="Resolved">Resolved</option>
        </select>

        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="p-2 border rounded"
        />

        <div className="flex gap-2">
          <button
            onClick={() => handleDownload("PDF")}
            className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
          >
            PDF
          </button>
          <button
            onClick={() => handleDownload("CSV")}
            className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700"
          >
            CSV
          </button>
        </div>
      </div>

      {/* Reports */}
      {filteredReports.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="border rounded-lg p-4 shadow hover:shadow-md transition"
            >
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={report.profileImage}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold">{report.reportedBy}</div>
                  <div className="text-sm text-gray-500">{report.date}</div>
                </div>
              </div>
              <div className="mb-1">
                <span className="font-semibold">Type: </span>
                {report.type}
              </div>
              <div className="mb-1">
                <span className="font-semibold">Status: </span>
                {report.status}
              </div>
              <div className="mb-1">
                <span className="font-semibold">Property: </span>
                {report.property}
              </div>
              <div>
                <span className="font-semibold">Description: </span>
                {report.description}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-6">No reports found.</div>
      )}

      {/* Add Report Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Add New Report</h2>
            <div className="space-y-4">
              <input
                type="date"
                value={newReport.date}
                onChange={(e) =>
                  setNewReport({ ...newReport, date: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
              <select
                value={newReport.type}
                onChange={(e) =>
                  setNewReport({ ...newReport, type: e.target.value })
                }
                className="w-full p-2 border rounded"
              >
                <option value="Application">Application</option>
                <option value="Inquiry">Inquiry</option>
              </select>
              <select
                value={newReport.status}
                onChange={(e) =>
                  setNewReport({ ...newReport, status: e.target.value })
                }
                className="w-full p-2 border rounded"
              >
                <option value="Approved">Approved</option>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
                <option value="Resolved">Resolved</option>
              </select>
              <input
                type="text"
                placeholder="Reported By"
                value={newReport.reportedBy}
                onChange={(e) =>
                  setNewReport({ ...newReport, reportedBy: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
              <input
                type="url"
                placeholder="Profile Image URL"
                value={newReport.profileImage}
                onChange={(e) =>
                  setNewReport({ ...newReport, profileImage: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Property Name"
                value={newReport.property}
                onChange={(e) =>
                  setNewReport({ ...newReport, property: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
              <textarea
                placeholder="Description"
                value={newReport.description}
                onChange={(e) =>
                  setNewReport({ ...newReport, description: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setShowPopup(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddReport}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsPage;
