import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Home,
  DollarSign,
  User,
  Calendar,
  Plus,
  X,
} from "lucide-react";

const UserClients = () => {
  const [clients, setClients] = useState([
    {
      id: 1,
      name: "David Martinez",
      email: "david.martinez@example.com",
      phone: "(555) 456-7890",
      image: "https://i.pravatar.cc/100?u=1",
      location: "Chennai",
      propertyType: "Apartment",
      budgetMin: 50000,
      budgetMax: 80000,
      status: "Contacted",
      lastContacted: "2025-05-07",
      agent: "Sarah Agent",
      notes: "Interested in 3BHK near metro station.",
    },
    {
      id: 1,
      name: "David Martinez",
      email: "david.martinez@example.com",
      phone: "(555) 456-7890",
      image: "https://i.pravatar.cc/100?u=1",
      location: "Chennai",
      propertyType: "Apartment",
      budgetMin: 50000,
      budgetMax: 80000,
      status: "Contacted",
      lastContacted: "2025-05-07",
      agent: "Sarah Agent",
      notes: "Interested in 3BHK near metro station.",
    },
    {
      id: 1,
      name: "David Martinez",
      email: "david.martinez@example.com",
      phone: "(555) 456-7890",
      image: "https://i.pravatar.cc/100?u=1",
      location: "Chennai",
      propertyType: "Apartment",
      budgetMin: 50000,
      budgetMax: 80000,
      status: "Contacted",
      lastContacted: "2025-05-07",
      agent: "Sarah Agent",
      notes: "Interested in 3BHK near metro station.",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newClient, setNewClient] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    propertyType: "",
    budgetMin: "",
    budgetMax: "",
    status: "",
    lastContacted: "",
    agent: "",
    notes: "",
    image: "https://i.pravatar.cc/100", // Default
  });

  const handleAddClient = () => {
    const id = Date.now(); // simple unique ID
    setClients([...clients, { ...newClient, id }]);
    setShowModal(false);
    setNewClient({
      name: "",
      email: "",
      phone: "",
      location: "",
      propertyType: "",
      budgetMin: "",
      budgetMax: "",
      status: "",
      lastContacted: "",
      agent: "",
      notes: "",
      image: "https://i.pravatar.cc/100",
    });
  };

  return (
    <>
      <div className="p-4 flex justify-between items-center">
        <p className="text-lg font-semibold">Clients</p>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <Plus size={16} />
          Add Client
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold mb-4">Add New Client</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: "name", label: "Name" },
                { name: "email", label: "Email" },
                { name: "phone", label: "Phone" },
                { name: "location", label: "Location" },
                { name: "propertyType", label: "Property Type" },
                { name: "budgetMin", label: "Budget Min" },
                { name: "budgetMax", label: "Budget Max" },
                { name: "status", label: "Status" },
                { name: "lastContacted", label: "Last Contacted (YYYY-MM-DD)" },
                { name: "agent", label: "Assigned Agent" },
                { name: "notes", label: "Notes", type: "textarea" },
              ].map((field) => (
                <div key={field.name} className="col-span-1">
                  <label className="block text-sm mb-1">{field.label}</label>
                  {field.type === "textarea" ? (
                    <textarea
                      name={field.name}
                      value={newClient[field.name]}
                      onChange={(e) =>
                        setNewClient({
                          ...newClient,
                          [field.name]: e.target.value,
                        })
                      }
                      className="w-full p-2 border rounded"
                      rows={2}
                    />
                  ) : (
                    <input
                      type="text"
                      name={field.name}
                      value={newClient[field.name]}
                      onChange={(e) =>
                        setNewClient({
                          ...newClient,
                          [field.name]: e.target.value,
                        })
                      }
                      className="w-full p-2 border rounded"
                    />
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={handleAddClient}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
            >
              Save Client
            </button>
          </div>
        </div>
      )}

      {/* Client Cards */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {clients.map((client) => (
          <div
            key={client.id}
            className="bg-white rounded-xl shadow p-4 space-y-3"
          >
            <div className="flex items-center space-x-4">
              <img
                src={client.image}
                alt={client.name}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <p className="text-lg font-semibold">{client.name}</p>
                <p className="text-sm text-gray-500">{client.status}</p>
              </div>
            </div>

            <div className="text-sm text-gray-700 space-y-2">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-blue-500" />
                <span>{client.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-blue-500" />
                <span>{client.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-green-500" />
                <span>{client.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Home size={16} className="text-purple-500" />
                <span>{client.propertyType}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign size={16} className="text-yellow-500" />
                <span>
                  ₹{parseInt(client.budgetMin).toLocaleString()} - ₹
                  {parseInt(client.budgetMax).toLocaleString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-gray-600" />
                <span>Last Contacted: {client.lastContacted}</span>
              </div>
              <div className="flex items-center gap-2">
                <User size={16} className="text-red-500" />
                <span>Agent: {client.agent}</span>
              </div>
              <div className="text-gray-500 mt-1">
                <strong>Notes:</strong> {client.notes}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserClients;
