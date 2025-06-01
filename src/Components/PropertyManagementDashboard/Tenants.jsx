import React, { useState } from "react";
import { Pencil, Trash } from "lucide-react";

const TenantsPage = () => {
  const [tenants, setTenants] = useState([
    {
      id: 1,
      name: "John Doe",
      contact: "john.doe@example.com",
      property: "Green Villa",
      rentStatus: "Paid",
    },
    {
      id: 2,
      name: "Jane Smith",
      contact: "jane.smith@example.com",
      property: "Ocean Apartment",
      rentStatus: "Unpaid",
    },
    {
      id: 3,
      name: "Tom Lee",
      contact: "tom.lee@example.com",
      property: "Sunny House",
      rentStatus: "Paid",
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [newTenant, setNewTenant] = useState({
    name: "",
    contact: "",
    property: "",
    rentStatus: "Paid",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [editingTenant, setEditingTenant] = useState(null);

  const properties = ["Green Villa", "Ocean Apartment", "Sunny House"];

  const handleAddTenant = () => {
    setTenants([
      ...tenants,
      {
        id: Date.now(),
        ...newTenant,
      },
    ]);
    setModalOpen(false);
    setNewTenant({
      name: "",
      contact: "",
      property: "",
      rentStatus: "Paid",
    });
  };

  const handleEditTenant = (tenant) => {
    setEditingTenant(tenant);
    setNewTenant(tenant);
    setModalOpen(true);
  };

  const handleSaveEdit = () => {
    setTenants(
      tenants.map((tenant) =>
        tenant.id === editingTenant.id ? newTenant : tenant
      )
    );
    setModalOpen(false);
    setEditingTenant(null);
    setNewTenant({
      name: "",
      contact: "",
      property: "",
      rentStatus: "Paid",
    });
  };

  const handleDeleteTenant = (id) => {
    setTenants(tenants.filter((tenant) => tenant.id !== id));
  };

  const filteredTenants = tenants.filter(
    (tenant) =>
      tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.property.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-4">
        <h2 className="text-xl font-semibold">Tenants</h2>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <input
            type="text"
            className="border p-2 rounded w-full sm:w-auto"
            placeholder="Search by name or property"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => setModalOpen(true)}
          >
            Add New Tenant
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-sm md:text-base">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left whitespace-nowrap">Tenant Name</th>
              <th className="p-3 text-left whitespace-nowrap">Contact Info</th>
              <th className="p-3 text-left whitespace-nowrap">Property Name</th>
              <th className="p-3 text-left whitespace-nowrap">Rent Status</th>
              <th className="p-3 text-left whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTenants.map((tenant) => (
              <tr key={tenant.id} className="border-b">
                <td className="p-3">{tenant.name}</td>
                <td className="p-3">{tenant.contact}</td>
                <td className="p-3">{tenant.property}</td>
                <td className="p-3">{tenant.rentStatus}</td>
                <td className="p-3">
                  <div className="flex space-x-2">
                    <Pencil
                      className="text-yellow-600 w-4 h-4 cursor-pointer"
                      onClick={() => handleEditTenant(tenant)}
                    />
                    <Trash
                      className="text-red-600 w-4 h-4 cursor-pointer"
                      onClick={() => handleDeleteTenant(tenant.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 px-4">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">
              {editingTenant ? "Edit Tenant" : "Add New Tenant"}
            </h2>
            <div className="space-y-3">
              <input
                type="text"
                className="w-full border p-2 rounded"
                placeholder="Tenant Name"
                value={newTenant.name}
                onChange={(e) =>
                  setNewTenant({ ...newTenant, name: e.target.value })
                }
              />
              <input
                type="email"
                className="w-full border p-2 rounded"
                placeholder="Contact Info"
                value={newTenant.contact}
                onChange={(e) =>
                  setNewTenant({ ...newTenant, contact: e.target.value })
                }
              />
              <select
                className="w-full border p-2 rounded"
                value={newTenant.property}
                onChange={(e) =>
                  setNewTenant({ ...newTenant, property: e.target.value })
                }
              >
                <option value="">Select Property Name</option>
                {properties.map((property, index) => (
                  <option key={index} value={property}>
                    {property}
                  </option>
                ))}
              </select>
              <select
                className="w-full border p-2 rounded"
                value={newTenant.rentStatus}
                onChange={(e) =>
                  setNewTenant({ ...newTenant, rentStatus: e.target.value })
                }
              >
                <option value="Paid">Paid</option>
                <option value="Unpaid">Unpaid</option>
              </select>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded"
                onClick={editingTenant ? handleSaveEdit : handleAddTenant}
              >
                {editingTenant ? "Save Changes" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TenantsPage;
