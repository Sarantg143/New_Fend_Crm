import React, { useState } from "react";
import { FaDownload } from "react-icons/fa";

const ReportsPage = () => {
  const [reports, setReports] = useState([
    { id: 1, date: "2025-04-01", type: "Rental Payment", status: "Completed" },
    {
      id: 2,
      date: "2025-04-02",
      type: "Property Occupancy",
      status: "Pending",
    },
    {
      id: 3,
      date: "2025-04-03",
      type: "Maintenance Request",
      status: "Completed",
    },
    { id: 4, date: "2025-04-04", type: "Rental Payment", status: "Failed" },
  ]);

  const [filters, setFilters] = useState({
    type: "",
    dateFrom: "",
    dateTo: "",
    status: "",
  });

  const [searchTerm, setSearchTerm] = useState("");

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const filteredReports = reports.filter((report) => {
    return (
      (report.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.date.includes(searchTerm)) &&
      (!filters.type || report.type === filters.type) &&
      (!filters.status || report.status === filters.status) &&
      (!filters.dateFrom ||
        new Date(report.date) >= new Date(filters.dateFrom)) &&
      (!filters.dateTo || new Date(report.date) <= new Date(filters.dateTo))
    );
  });

  const handleDownloadReport = () => {
    alert("Report downloaded (PDF/CSV simulation)");
  };

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <h2 className="text-xl font-semibold">Reports</h2>
        {/* You can optionally re-enable the search input here */}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div className="flex flex-col">
          <label htmlFor="type" className="text-sm mb-1">
            Type:
          </label>
          <select
            id="type"
            name="type"
            className="border p-2 rounded"
            value={filters.type}
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            <option value="Rental Payment">Rental Payment</option>
            <option value="Property Occupancy">Property Occupancy</option>
            <option value="Maintenance Request">Maintenance Request</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="status" className="text-sm mb-1">
            Status:
          </label>
          <select
            id="status"
            name="status"
            className="border p-2 rounded"
            value={filters.status}
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="dateFrom" className="text-sm mb-1">
            From Date:
          </label>
          <input
            type="date"
            id="dateFrom"
            name="dateFrom"
            className="border p-2 rounded"
            value={filters.dateFrom}
            onChange={handleFilterChange}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="dateTo" className="text-sm mb-1">
            To Date:
          </label>
          <input
            type="date"
            id="dateTo"
            name="dateTo"
            className="border p-2 rounded"
            value={filters.dateTo}
            onChange={handleFilterChange}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left text-sm">Date</th>
              <th className="p-3 text-left text-sm">Report Type</th>
              <th className="p-3 text-left text-sm">Status</th>
              <th className="p-3 text-left text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((report) => (
              <tr key={report.id} className="border-b">
                <td className="p-3 text-sm">{report.date}</td>
                <td className="p-3 text-sm">{report.type}</td>
                <td className="p-3 text-sm">{report.status}</td>
                <td className="p-3">
                  <button
                    onClick={handleDownloadReport}
                    className="flex items-center bg-blue-600 text-white px-4 py-2 rounded text-sm"
                  >
                    <FaDownload className="mr-2 w-4 h-4" />
                    Download
                  </button>
                </td>
              </tr>
            ))}
            {filteredReports.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="text-center p-4 text-sm text-gray-500"
                >
                  No reports found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportsPage;
