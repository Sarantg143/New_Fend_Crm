import { FaBuilding, FaRupeeSign, FaTasks, FaExpand } from "react-icons/fa";

const stats = [
  {
    id: 1,
    title: "Total properties",
    value: "50",
    icon: <FaBuilding className="text-blue-500 text-3xl" />,
    change: "+30%",
    changeText: "Higher than last month",
    changeColor: "text-green-500",
  },
  {
    id: 2,
    title: "Total Revenue",
    value: "₹20,00,000",
    icon: <FaRupeeSign className="text-blue-500 text-3xl" />,
    change: "-15%",
    changeText: "Lesser than last month",
    changeColor: "text-red-500",
  },
  {
    id: 3,
    title: "Ongoing Projects",
    value: "17",
    icon: <FaTasks className="text-blue-500 text-3xl" />,
    change: "+30%",
    changeText: "Higher than last month",
    changeColor: "text-green-500",
  },
  {
    id: 4,
    title: "Total units",
    value: "10,000",
    icon: <FaExpand className="text-blue-500 text-3xl" />,
    change: "+30%",
    changeText: "Higher than last month",
    changeColor: "text-green-500",
  },
];

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {stats.map((stat) => (
        <div key={stat.id} className="bg-white shadow-md p-6 rounded-lg">
          <div className="flex justify-between items-center">
            <h3 className="text-gray-600 text-sm">{stat.title}</h3>
            <h3 className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center">
              {stat.icon}
            </h3>
          </div>

          <p className="text-2xl font-bold mt-2">{stat.value}</p>
          <div className="border mt-2"></div>
          <div className="mt-2 text-sm flex items-center">
            <span className={`${stat.changeColor} font-semibold`}>
              {stat.change}
            </span>
            <span className="text-gray-500 ml-2">{stat.changeText}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
