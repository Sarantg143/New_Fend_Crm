import React from "react";

function VendorStatusTable() {
  const vendors = [
    // {
    //   name: "Dyan Bruce",
    //   property: "Al masa block 01",
    //   saleType: "Rent",
    //   status: "Active",
    // },
    // {
    //   name: "Dyan Bruce",
    //   property: "Al masa block 01",
    //   saleType: "Sale",
    //   status: "Active",
    // },
    // {
    //   name: "Dyan Bruce",
    //   property: "Al masa block 01",
    //   saleType: "Rent",
    //   status: "Active",
    // },
    // {
    //   name: "Dyan Bruce",
    //   property: "Al masa block 01",
    //   saleType: "Rent",
    //   status: "Active",
    // },
    // { name: 'Dyan Bruce', property: 'Al masa block 01', saleType: 'Sale', status: 'Active' },
  ];

  return (
    <div className="bg-white rounded-lg p-6 w-[1100px] m-3 h-full">
      {/* <h2 className="text-xl font-semibold mb-4">Vendors Status</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vendor name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vendor property
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sale type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {vendors.map((vendor, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{vendor.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {vendor.property}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {vendor.saleType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    <span className="w-2 h-2 rounded-full bg-red-500 mr-1"></span>
                    {vendor.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
    </div>
  );
}

export default VendorStatusTable;

