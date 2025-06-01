



import React from "react";
import card1 from "../AdminDashboard/Assets/card1.png";
import card2 from "../AdminDashboard/Assets/card2.png";
import card3 from "../AdminDashboard/Assets/card3.png";
import card4 from "../AdminDashboard/Assets/card4.png";

const cards = [
  {
    id: 1,
    image: <img src={card1} alt="" />,
    title: "Total properties",
    value: 100,
    percentage: "+30%",
    trend: "up",
    description: "Higher than last month",
  },
  {
    id: 2,
    image: <img src={card2} alt="" />,

    title: "Properties for sale",
    value: 70,
    percentage: "-15%",
    trend: "down",
    description: "Lesser than last month",
  },
  {
    id: 3,
    image: <img src={card3} alt="" />,

    title: "Properties for rent",
    value: 30,
    percentage: "+30%",
    trend: "up",
    description: "Higher than last month",
  },
  {
    id: 4,
    image: <img src={card4} alt="" />,

    title: "New leads",
    value: 300,
    percentage: "+30%",
    trend: "up",
    description: "Higher than last month",
  },
 
];

const Card = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 p-4">
      {cards.map(
        ({ id, image, title, value, percentage, trend, description }) => (
          <div
            key={id}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col items-start border border-gray-200 w-full"
          >
            {/* Image */}
            <div className="bg-sky-100 rounded-full flex items-center justify-center w-8 h-8">
              <div className="text-2xl">{image}</div>
            </div>

            {/* Title */}
            <h2 className="text-lg font-semibold mt-2">{title}</h2>

            {/* Value */}
            <h3 className="text-2xl font-bold mt-1">{value}</h3>

            {/* Percentage Change */}
            <p
              className={`text-sm font-medium mt-1 flex items-center ${
                trend === "up" ? "text-green-500" : "text-red-500"
              }`}
            >
              {percentage}{" "}
              <span className="text-gray-600 ml-1">{description}</span>
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default Card;

