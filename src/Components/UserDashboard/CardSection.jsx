import React from "react";
import cardimg1 from "../UserDashboard/Assests/cardimg1.png";
import cardimg2 from "../UserDashboard/Assests/cardimg2.png";

// Default data for right-side cards
const defaultCards = [
  {
    id: 1,
    count: 10,
    label: "Saved property",
    icon: cardimg1,
  },
  {
    id: 2,
    count: 5,
    label: "Recently viewed",
    icon: cardimg2,
  },
  // {
  //   id: 2,
  //   count: 5,
  //   label: "Recently viewed",
  //   icon: cardimg2,
  // },
];

const CardSection = ({
  leftSectionText = "Find Your Dream Home Today",
  leftSectionImage = "https://via.placeholder.com/150",
  rightCards = defaultCards,
}) => {
  return (
    <div className="flex items-center space-x-6 p-6 rounded-lg h-48">
      {/* Left Section */}
      <div className="flex items-center bg-gradient-to-r from-blue-600 to-blue-400 p-6 rounded-lg w-2/3 h-full">
        <div className="text-white w-1/2">
          <h2 className="text-2xl font-bold">{leftSectionText}</h2>
        </div>
        <div className="w-1/2 flex justify-end">
          <img
            src={leftSectionImage}
            alt="House"
            className="w-32 h-32 object-contain"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex space-x-4 h-full">
        {rightCards.map((card) => (
          <div
            key={card.id}
            className="flex flex-col border border-gray-300 items-start p-4 rounded-lg  shadow h-full w-32"
          >
            <div className="bg-blue-100 p-2 rounded-lg">
              <img src={card.icon} alt={card.label} className="w-6 h-6" />
            </div>
            <p className="text-xl font-semibold">{card.count}</p>
            <p className="text-gray-500">{card.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardSection;
