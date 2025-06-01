// components/ExpenseDonutChart.jsx
import React from "react";
import { PieChart, Pie, Cell } from "recharts";

const data = [
  { name: "Property Maintenance", value: 18 },
  { name: "Management Fees", value: 7 },
  { name: "Utility Bill", value: 5 },
];

const COLORS = ["#3B82F6", "#EF4444", "#F59E0B"]; // blue, red, orange

export default function ExpenseDonutChart() {
  return (
    <div className="w-[300px] p-2 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-base font-semibold">Expenses</h2>
        <select className="text-sm bg-gray-100 px-2 py-1 rounded">
          <option value="yearly">yearly</option>
          <option value="monthly">monthly</option>
        </select>
      </div>

      <div className="relative flex justify-center items-center">
        <PieChart width={160} height={160}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={65}
            fill="#8884d8"
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
        <div className="absolute text-center">
          <div className="text-lg font-bold">30%</div>
          <div className="text-[10px] text-gray-500">From yearly revenue</div>
        </div>
      </div>

      <div className="mt-2 flex flex-col items-center space-y-1">
        <LegendItem color={COLORS[0]} label="Property Maintenance" />
        <LegendItem color={COLORS[1]} label="Management Fees" />
        <LegendItem color={COLORS[2]} label="Utility Bill" />
      </div>
    </div>
  );
}

function LegendItem({ color, label }) {
  return (
    <div className="flex items-center space-x-2 text-sm text-gray-600">
      <span
        className="inline-block w-3 h-3 rounded"
        style={{ backgroundColor: color }}
      />
      <span>{label}</span>
    </div>
  );
}
