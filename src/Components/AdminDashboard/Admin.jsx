import React from 'react'


import Card from "./Card";
import Chart from "./Chart";
import NewProperties from "./NewProperties";
import VendorStatus from "./VendorStatus";
import NewEnquiries from "./NewEnquiries";

const Admin = () => {
  return (
    <>
      <div className="flex flex-col gap-2 lg:flex-row">
        <Card />
      </div>

      <div className="flex flex-col gap-2 mt-4 lg:flex-row">
        <Chart />
        <NewProperties />
      </div>

      <div className="flex flex-col gap-2 mt-4 lg:flex-row">
        <VendorStatus />
        <NewEnquiries />
      </div>
    </>
  );
}

export default Admin