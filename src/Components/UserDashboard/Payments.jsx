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

const paymentData = [
  {
    paymentId: "PAY-1001",
    status: "FAILED",
    builderName: "Greenfield Constructions",
    dueDate: "17 Aug, 2024",
    propertyType: "Land",
    amount: "$45,000",
    paymentMethod: "Bank Transfer",
  },
  {
    paymentId: "PAY-1002",
    status: "COMPLETED",
    builderName: "Urban Heights Developers",
    dueDate: "29 Sep, 2024",
    propertyType: "Apartment",
    amount: "$82,500",
    paymentMethod: "Credit Card",
  },
  {
    paymentId: "PAY-1003",
    status: "COMPLETED",
    builderName: "Elite Properties",
    dueDate: "01 Oct, 2024",
    propertyType: "Villa",
    amount: "$120,000",
    paymentMethod: "Wire Transfer",
  },
  {
    paymentId: "PAY-1004",
    status: "COMPLETED",
    builderName: "Lotus Residency",
    dueDate: "10 Jul, 2024",
    propertyType: "Apartment",
    amount: "$67,800",
    paymentMethod: "Check",
  },
  {
    paymentId: "PAY-1005",
    status: "FAILED",
    builderName: "Skyline Builders",
    dueDate: "22 Aug, 2024",
    propertyType: "Office",
    amount: "$95,200",
    paymentMethod: "Bank Transfer",
  },
  {
    paymentId: "PAY-1006",
    status: "COMPLETED",
    builderName: "Hilltop Estates",
    dueDate: "30 Jun, 2024",
    propertyType: "Villa",
    amount: "$150,000",
    paymentMethod: "Credit Card",
  },
  {
    paymentId: "PAY-1007",
    status: "COMPLETED",
    builderName: "Maple Avenue Developers",
    dueDate: "12 Sep, 2024",
    propertyType: "Land",
    amount: "$38,500",
    paymentMethod: "Wire Transfer",
  },
  {
    paymentId: "PAY-1008",
    status: "FAILED",
    builderName: "Sunset Properties",
    dueDate: "18 Jul, 2024",
    propertyType: "Apartment",
    amount: "$72,300",
    paymentMethod: "Bank Transfer",
  },
  {
    paymentId: "PAY-1009",
    status: "COMPLETED",
    builderName: "Midtown Towers",
    dueDate: "03 Jun, 2024",
    propertyType: "Office",
    amount: "$110,000",
    paymentMethod: "Check",
  },
  {
    paymentId: "PAY-1010",
    status: "COMPLETED",
    builderName: "Pine Grove Estates",
    dueDate: "15 Aug, 2024",
    propertyType: "Land",
    amount: "$52,700",
    paymentMethod: "Credit Card",
  },
];

const getStatusClass = (status) => {
  switch (status) {
    case "FAILED":
      return "text-red-700 bg-blue-100";
    case "COMPLETED":
      return "text-green-700 bg-green-100";
    default:
      return "text-gray-600 bg-gray-200";
  }
};

const PaymentListView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const navigate = useNavigate();

  const filteredData = paymentData.filter((item) => {
    const matchesSearch =
      item.paymentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.builderName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || item.status === statusFilter;
    const matchesType =
      typeFilter === "All" || item.propertyType === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="p-6 bg-white min-h-screen font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Payments</h1>
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search payments..."
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
          <option value="COMPLETED">Completed</option>
          <option value="FAILED">Partial</option>
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
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="text-left text-sm text-gray-600">
              <th className="px-4 py-2"></th>
              <th className="px-4 py-2">Payment ID</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Builder Name</th>
              <th className="px-4 py-2">Due Date</th>
              <th className="px-4 py-2">Property</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Payment Method</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr
                key={index}
                className="bg-white hover:bg-gray-50 shadow-sm rounded-md"
              >
                <td className="px-4 py-3">
                  <CheckSquare className="text-gray-400 w-5 h-5" />
                </td>
                <td className="px-4 py-3 text-sm text-blue-600 font-medium hover:underline cursor-pointer">
                  {item.paymentId}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-md text-xs font-semibold ${getStatusClass(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-800">
                  {item.builderName}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {item.dueDate}
                </td>
                <td className="px-4 py-3 text-sm flex items-center gap-1">
                  {propertyTypeIcons[item.propertyType]} {item.propertyType}
                </td>
                <td className="px-4 py-3 text-sm font-medium text-gray-800">
                  {item.amount}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {item.paymentMethod}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {filteredData.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <Search className="w-12 h-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-1">
            No payments found
          </h3>
          <p className="text-sm text-gray-500">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentListView;
