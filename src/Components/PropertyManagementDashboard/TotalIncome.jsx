import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// Register Chart.js components (assuming this is already done)
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
);

function IncomeChart() {
  // Assuming 'data' and 'options' are defined as in the previous examples
  const data = {
    labels: ["2020", "2021", "2022", "2023", "2024", "2025"],
    datasets: [
      {
        label: "Sale",
        data: [100, 450, 300, 480, 280, 900],
        borderColor: "rgb(59, 130, 246)",
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
      },
      {
        label: "Rent",
        data: [300, 650, 320, 720, 550, 800],
        borderColor: "rgb(34, 197, 94)",
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      x: {
        ticks: { color: "rgb(107, 114, 128)" },
        grid: { display: false },
        border: { display: false },
      },
      y: {
        min: 0,
        max: 900,
        ticks: {
          stepSize: 300,
          color: "rgb(107, 114, 128)",
          callback: function (value) {
            return value + "k";
          },
          padding: 10,
        },
        grid: {
          color: "rgb(229, 231, 235)",
          drawBorder: false,
          drawTicks: false,
        },
      },
    },
    interaction: { mode: "index", intersect: false },
  };

  return (
    // --- MODIFIED PADDING HERE ---
    <div className="w-[600px] p-3 sm:p-4 rounded-lg shadow-sm  mx-auto my-8">
      {" "}
      {/* Reduced padding: p-4 sm:p-6 -> p-3 sm:p-4 */}
      {/* Header Section */}
      {/* --- MODIFIED MARGIN HERE --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2 sm:gap-0">
        {" "}
        {/* Reduced bottom margin: mb-4 -> mb-3 and gap */}
        <h2 className="text-lg font-semibold text-gray-800">
          Total income
        </h2>{" "}
        {/* Optionally reduce font size: text-lg -> text-base */}
        <div className="flex items-center space-x-3">
          {" "}
          {/* Optionally reduce space: space-x-4 -> space-x-3 */}
          {/* Custom Legend */}
          <div className="flex items-center space-x-1.5">
            {" "}
            {/* Optionally reduce space */}
            <span className="w-2.5 h-2.5 bg-blue-500 rounded-sm flex-shrink-0"></span>{" "}
            {/* Optionally slightly smaller legend square */}
            <span className="text-xs text-gray-600">Sale</span>{" "}
            {/* Optionally reduce font size */}
          </div>
          <div className="flex items-center space-x-1.5">
            {" "}
            {/* Optionally reduce space */}
            <span className="w-2.5 h-2.5 bg-green-500 rounded-sm flex-shrink-0"></span>{" "}
            {/* Optionally slightly smaller legend square */}
            <span className="text-xs text-gray-600">Rent</span>{" "}
            {/* Optionally reduce font size */}
          </div>
          {/* Dropdown */}
          <div className="relative">
            {/* Optionally adjust dropdown size/padding if needed */}
            <select className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 text-xs rounded py-0.5 pl-2 pr-6 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 cursor-pointer">
              {" "}
              {/* Reduced padding/text size */}
              <option>yearly</option>
              <option>monthly</option>
              <option>quarterly</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1.5 text-gray-500">
              {" "}
              {/* Adjusted arrow padding */}
              <svg
                className="fill-current h-3 w-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M5.516 7.548a.75.75 0 011.06 0L10 10.97l3.424-3.423a.75.75 0 111.06 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 010-1.06z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      {/* Chart Container (using previously reduced height) */}
      <div className="h-56">
        {" "}
        {/* You can make this even smaller (e.g., h-48) if needed */}
        <Line options={options} data={data} />
      </div>
    </div>
  );
}

export default IncomeChart;
