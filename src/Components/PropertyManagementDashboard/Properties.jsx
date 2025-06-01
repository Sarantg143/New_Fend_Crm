import React from "react";
import PropertyCard from "./PropertyCard";
import TotalIncome from "./TotalIncome";
import Expenses from "./Expenses";
import PropertStatus from "./PropertStatus";
import RecentTransaction from "./RecentTransaction";


const Properties = () => {
  return (
    <>
      <PropertyCard />
      <div className="flex flex-col md:flex-col gap-2 lg:flex-row">
        <TotalIncome />
        <Expenses />
        <PropertStatus />
      </div>
      <RecentTransaction />
    </>
  );
};

export default Properties;
