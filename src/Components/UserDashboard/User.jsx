import React from "react";

import Bookings from "./Bookings";
import Enquiries from "./Enquiries";
import CardSection from "./CardSection";

const User = () => {
  return (
    <>
      <CardSection/>
      <div className="flex flex-col lg:flex-row gap-4 mt-4 h-full">
        <div className="w-full md:w-full lg:w-2/3 h-full">
          <Bookings />
        </div>
        {/* <div className="w-full md:w-full lg:w-1/3 h-full">
          <Enquiries />
        </div> */}
      </div>
    </>
  );
};

export default User;
