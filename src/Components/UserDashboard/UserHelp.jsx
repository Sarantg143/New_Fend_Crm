import React, { useState } from "react";

const InquiryManagement = () => {
  const [inquiries, setInquiries] = useState([
    {
      _id: "67ee5d2e83fd5d63l8b7ld1",
      user: "user123",
      builder: "builder456",
      project: "project789",
      message: "I'm interested in this property",
      contactEmail: "user@example.com",
      contactPhone: "1234567890",
      status: "new",
      createdAt: "2025-04-04",
      respondedAt: "-",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newInquiry, setNewInquiry] = useState({
    user: "",
    builder: "",
    project: "",
    message: "",
    contactEmail: "",
    contactPhone: "",
    status: "new",
    createdAt: new Date().toISOString().split("T")[0],
    respondedAt: "-",
  });

  // Sample options for select fields
  const builderOptions = [
    { value: "builder456", label: "Builder 456" },
    { value: "builder789", label: "Builder 789" },
    { value: "builder101", label: "Builder 101" },
  ];

  const projectOptions = [
    { value: "project789", label: "Project 789" },
    { value: "project101", label: "Project 101" },
    { value: "project202", label: "Project 202" },
  ];

  const statusOptions = [
    { value: "new", label: "New" },
    { value: "in-progress", label: "In Progress" },
    { value: "closed", label: "Closed" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInquiry({
      ...newInquiry,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newInquiryWithId = {
      ...newInquiry,
      _id:
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15),
    };
    setInquiries([...inquiries, newInquiryWithId]);
    setNewInquiry({
      user: "",
      builder: "",
      project: "",
      message: "",
      contactEmail: "",
      contactPhone: "",
      status: "new",
      createdAt: new Date().toISOString().split("T")[0],
      respondedAt: "-",
    });
    setShowForm(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Inquiry Management</h1>
      <div className="mb-4">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {showForm ? "Cancel" : "Create New Inquiry"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Add New Inquiry</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="user"
                >
                  User
                </label>
                <input
                  type="text"
                  id="user"
                  name="user"
                  value={newInquiry.user}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="builder"
                >
                  Builder
                </label>
                <div className="relative">
                  <select
                    id="builder"
                    name="builder"
                    value={newInquiry.builder}
                    onChange={handleInputChange}
                    className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value="">Select Builder</option>
                    {builderOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="project"
                >
                  Project
                </label>
                <div className="relative">
                  <select
                    id="project"
                    name="project"
                    value={newInquiry.project}
                    onChange={handleInputChange}
                    className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="">Select Project</option>
                    {projectOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="status"
                >
                  Status
                </label>
                <div className="relative">
                  <select
                    id="status"
                    name="status"
                    value={newInquiry.status}
                    onChange={handleInputChange}
                    className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
                  >
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="contactEmail"
                >
                  Contact Email
                </label>
                <input
                  type="email"
                  id="contactEmail"
                  name="contactEmail"
                  value={newInquiry.contactEmail}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="contactPhone"
                >
                  Contact Phone
                </label>
                <input
                  type="tel"
                  id="contactPhone"
                  name="contactPhone"
                  value={newInquiry.contactPhone}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="md:col-span-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={newInquiry.message}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                  rows={3}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Submit Inquiry
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b">User</th>
              <th className="py-2 px-4 border-b">Builder</th>
              <th className="py-2 px-4 border-b">Project</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Created At</th>
              <th className="py-2 px-4 border-b">Responded At</th>
              <th className="py-2 px-4 border-b">Message</th>
              <th className="py-2 px-4 border-b">Contact Email</th>
              <th className="py-2 px-4 border-b">Contact Phone</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inquiry, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="py-2 px-4 border-b">{inquiry.user}</td>
                <td className="py-2 px-4 border-b">{inquiry.builder}</td>
                <td className="py-2 px-4 border-b">{inquiry.project || "-"}</td>
                <td className="py-2 px-4 border-b">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      inquiry.status === "new"
                        ? "bg-blue-200 text-blue-800"
                        : inquiry.status === "in-progress"
                        ? "bg-yellow-200 text-yellow-800"
                        : "bg-green-200 text-green-800"
                    }`}
                  >
                    {inquiry.status}
                  </span>
                </td>
                <td className="py-2 px-4 border-b">{inquiry.createdAt}</td>
                <td className="py-2 px-4 border-b">{inquiry.respondedAt}</td>
                <td className="py-2 px-4 border-b">{inquiry.message}</td>
                <td className="py-2 px-4 border-b">
                  {inquiry.contactEmail || "-"}
                </td>
                <td className="py-2 px-4 border-b">
                  {inquiry.contactPhone || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InquiryManagement;