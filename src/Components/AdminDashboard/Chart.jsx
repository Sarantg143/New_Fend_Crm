import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", sales: 50 },
  { name: "Feb", sales: 55 },
  { name: "Mar", sales: 65 },
  { name: "Apr", sales: 75 },
  { name: "May", sales: 85 },
  { name: "Jun", sales: 90 },
  { name: "Jul", sales: 70 },
  { name: "Aug", sales: 85 },
  { name: "Sep", sales: 95 },
  { name: "Oct", sales: 130 },
  { name: "Nov", sales: 105 },
  { name: "Dec", sales: 75 },
];

export default function PropertiesSalesChart() {
  return (
    <div className="p-4 ml-3 bg-white shadow-lg rounded-lg w-[1100px]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Properties Sales</h2>
        <select className="border rounded px-2 py-1 text-sm">
          <option value="yearly">Yearly</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} barSize={30}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="sales" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}



