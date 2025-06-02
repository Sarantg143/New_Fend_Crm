import React, { useState } from "react";
import {
  CheckSquare,
  Search,
  Home,
  Building,
  Briefcase,
  MapPin,
  ChevronDown,
  Equal,
} from "lucide-react";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import {
  Plus,
  MoreVertical,
  BarChart2,
  List,
  Clock,
  Filter,
  Edit,
  GripVertical,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";


const propertyTypeIcons = {
  Apartment: <Building className="w-4 h-4 text-blue-500" />,
  Villa: <Home className="w-4 h-4 text-green-500" />,
  Office: <Briefcase className="w-4 h-4 text-gray-700" />,
  Land: <MapPin className="w-4 h-4 text-yellow-600" />,
};

const data = [
  {
    summary: "Site inspection for Plot #45",
    status: "PENDING",
    assignee: "Alana Song",
    dueDate: "17 Aug, 2024",
    priority: "Low",
    avatar: "https://i.pravatar.cc/150?img=1",
    propertyType: "Land",
  },
  {
    summary: "Legal verification of Green Acres",
    status: "IN PROGRESS",
    assignee: "Eva Lien",
    dueDate: "29 Sep, 2024",
    priority: "Medium",
    avatar: "https://i.pravatar.cc/150?img=2",
    propertyType: "Apartment",
  },
  {
    summary: "Finalize deal with Urban Builders",
    status: "NEGOTIATION",
    assignee: "Amar Sundaram",
    dueDate: "01 Oct, 2024",
    priority: "High",
    avatar: "https://i.pravatar.cc/150?img=3",
    propertyType: "Villa",
  },
  {
    summary: "Marketing campaign for Lotus Residency",
    status: "COMPLETED",
    assignee: "Sara Nair",
    dueDate: "10 Jul, 2024",
    priority: "Low",
    avatar: "https://i.pravatar.cc/150?img=4",
    propertyType: "Apartment",
  },
  {
    summary: "Design review of Elite Heights",
    status: "IN PROGRESS",
    assignee: "David Gomez",
    dueDate: "22 Aug, 2024",
    priority: "High",
    avatar: "https://i.pravatar.cc/150?img=5",
    propertyType: "Office",
  },
  {
    summary: "Client meeting for Hilltop Estate",
    status: "PENDING",
    assignee: "Neha Patel",
    dueDate: "30 Jun, 2024",
    priority: "Medium",
    avatar: "https://i.pravatar.cc/150?img=6",
    propertyType: "Villa",
  },
  {
    summary: "Document submission for Maple Avenue",
    status: "NEGOTIATION",
    assignee: "Rohan Mehra",
    dueDate: "12 Sep, 2024",
    priority: "High",
    avatar: "https://i.pravatar.cc/150?img=7",
    propertyType: "Land",
  },
  {
    summary: "Photography for Sunset Apartments",
    status: "IN PROGRESS",
    assignee: "Kylie Tran",
    dueDate: "18 Jul, 2024",
    priority: "Low",
    avatar: "https://i.pravatar.cc/150?img=8",
    propertyType: "Apartment",
  },
  {
    summary: "Contract renewal for Midtown Tower",
    status: "COMPLETED",
    assignee: "Jason Roy",
    dueDate: "03 Jun, 2024",
    priority: "Medium",
    avatar: "https://i.pravatar.cc/150?img=9",
    propertyType: "Office",
  },
  {
    summary: "Site clearing at Pine Grove",
    status: "PENDING",
    assignee: "Anjali Rao",
    dueDate: "15 Aug, 2024",
    priority: "High",
    avatar: "https://i.pravatar.cc/150?img=10",
    propertyType: "Land",
  },
];

const getStatusClass = (status) => {
  switch (status) {
    case "PENDING":
      return "text-blue-700 bg-blue-100";
    case "IN PROGRESS":
      return "text-yellow-800 bg-yellow-100";
    case "NEGOTIATION":
      return "text-purple-700 bg-purple-100";
    case "COMPLETED":
      return "text-green-700 bg-green-100";
    default:
      return "text-gray-600 bg-gray-200";
  }
};

const getPriorityIcon = (priority) => {
  switch (priority) {
    case "Low":
      return (
        <div className="flex items-center gap-1 text-blue-500 text-sm">
          <ChevronDown className="w-4 h-4" />
          Low
        </div>
      );
    case "Medium":
      return (
        <div className="flex items-center gap-1 text-yellow-500 text-sm">
          <Equal className="w-4 h-4" />
          Medium
        </div>
      );
    case "High":
      return (
        <div className="flex items-center gap-1 text-red-600 text-sm">
          <MdKeyboardDoubleArrowUp className="w-4 h-4" />
          High
        </div>
      );
    default:
      return "Low";
  }
};

const StyledListView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [priorities, setPriorities] = useState(
    data.reduce((acc, item, idx) => {
      acc[idx] = item.priority;
      return acc;
    }, {})
  );
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const handlePriorityChange = (index, value) => {
    setPriorities({ ...priorities, [index]: value });
    setDropdownOpen(null);
  };

  const filteredData = data.filter((item) => {
    const matchesSearch = item.summary
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || item.status === statusFilter;
    const matchesType =
      typeFilter === "All" || item.propertyType === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });
const navigate = useNavigate();
  return (
    <div className="p-6 bg-white min-h-screen font-sans">
      <h2 className="text-xl font-semibold mb-4">Admin Task List</h2>

      <div className="flex justify-between items-center mb-4 bg-white p-3 rounded-lg shadow-sm">
        <div className="flex border rounded-md overflow-hidden">
          <button
            onClick={() => navigate("/leadsdeatils")}
            className="p-2 border-r hover:bg-gray-200"
          >
            <BarChart2 size={18} className="text-gray-600" />
          </button>
          <button
            onClick={() => navigate("/listingpage")}
            className="p-2 border-r hover:bg-gray-200"
          >
            <List size={18} className="text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-200">
            <Clock size={18} className="text-gray-600" />
          </button>
        </div>

        <div className="flex items-center gap-4">
          {/* <div className="font-semibold text-gray-800">
                  {totalAmount} · {dealCount} properties
                </div> */}

          <div className="flex border rounded-md overflow-hidden">
            <button className="p-2 border-r hover:bg-gray-200">
              <Filter size={18} className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-200">
              <Edit size={18} className="text-gray-600" />
            </button>
          </div>

          {/* <button
                  onClick={handleAddDeal}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors"
                >
                  <Plus size={18} /> Deals
                </button> */}
        </div>
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-60 pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="All">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="IN PROGRESS">In Progress</option>
          <option value="NEGOTIATION">Negotiation</option>
          <option value="COMPLETED">Completed</option>
        </select>

        {/* Property Type Filter */}
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="All">All Property Types</option>
          <option value="Apartment">Apartment</option>
          <option value="Villa">Villa</option>
          <option value="Office">Office</option>
          <option value="Land">Land</option>
        </select>
      </div>

      {/* Table */}
      <table className="w-full border-separate border-spacing-y-2">
        <thead>
          <tr className="text-left text-sm text-gray-600">
            <th></th>
            <th>Summary</th>
            <th>Status</th>
            <th>Assignee</th>
            <th>Due date</th>
            <th>Priority</th>
            <th>Property</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr
              key={index}
              className="bg-white hover:bg-gray-50 shadow-sm rounded-md"
            >
              <td className="p-2">
                <CheckSquare className="text-gray-400 w-5 h-5" />
              </td>
              <td className="p-2 text-sm text-gray-800 font-medium">
                {item.summary}
              </td>
              <td className="p-2">
                <span
                  className={`px-2 py-1 rounded-md text-xs font-semibold ${getStatusClass(
                    item.status
                  )}`}
                >
                  {item.status}
                </span>
              </td>
              <td className="p-2 text-sm flex items-center gap-2">
                <img
                  src={item.avatar}
                  alt={item.assignee}
                  className="w-6 h-6 rounded-full"
                />
                {item.assignee}
              </td>
              <td className="p-2 text-sm text-gray-700">{item.dueDate}</td>
              <td className="p-2 relative">
                <div
                  onClick={() =>
                    setDropdownOpen(dropdownOpen === index ? null : index)
                  }
                  className="cursor-pointer inline-flex items-center gap-1"
                >
                  {getPriorityIcon(priorities[index])}
                </div>

                {dropdownOpen === index && (
                  <div className="absolute z-10 mt-1 bg-white border border-gray-200 shadow-lg rounded-md py-1 w-32">
                    {["Low", "Medium", "High"].map((priority) => (
                      <div
                        key={priority}
                        className="px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handlePriorityChange(index, priority)}
                      >
                        {getPriorityIcon(priority)}
                      </div>
                    ))}
                  </div>
                )}
              </td>
              <td className="p-2 text-sm flex items-center gap-1">
                {propertyTypeIcons[item.propertyType]} {item.propertyType}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StyledListView;
