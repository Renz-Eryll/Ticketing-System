import React from "react";
import { useStateContext } from "../../contexts/ContextProvider";

export const Dashboard = () => {
  const { activeMenu } = useStateContext();
  return (
    <div
      className={`
    mx-5 md:mx-5 lg:mx-5
    transition-all duration-300 
    ${activeMenu ? "lg:pl-75" : "lg:pl-25"}
  `}
    >
      <div className="text-3xl font-bold text-[#1D4ED8]">Dashboard </div>
      <div className="max-w mt-7 p-7 border border-gray-100 shadow-sm rounded-xl bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Unresolved Tickets */}
          <div className="p-6 py-7 border text-white rounded-xl bg-[#007AFF]">
            <h3 className="text-md font-semibold mb-2">Unresolved Tickets</h3>
            <h1 className="text-3xl font-extrabold">100</h1>
          </div>

          {/* Resolved Tickets */}
          <div className="p-6 py-7 border text-white rounded-xl  bg-[#08032B]">
            <h3 className="text-md font-semibold mb-2">Resolved Tickets</h3>
            <h1 className="text-3xl font-extrabold">13, 490</h1>
          </div>
          {/* Urgent Tickets */}
          <div className="p-6 py-7 border text-white rounded-xl bg-black">
            <h3 className="text-md font-semibold mb-2">Urgent Tickets</h3>
            <h1 className="text-3xl font-extrabold">3, 671</h1>
          </div>
        </div>
      </div>
      <div className="max-w mt-10 p-6 py-10 border border-gray-100 shadow-sm rounded-xl bg-white">
        <div className="text-xl font-bold text-black">Recent Tickets</div>
        <div className="mt-6">
          <table className="min-w-full border shadow-sm rounded-lg overflow-hidden text-xs sm:text-xs md:text-sm">
            <thead className="bg-gray-50 text-gray-800">
              <tr>
                <th className="px-4 py-3.5 border border-gray-300">
                  Ticket ID
                </th>
                <th className="px-4 py-2 border border-gray-300">Category</th>
                <th className="px-4 py-2 border border-gray-300">Priority</th>
                <th className="px-4 py-2 border border-gray-300">Agent</th>
                <th className="px-4 py-2 border border-gray-300">
                  Date Created
                </th>
                <th className="px-4 py-2 border border-gray-300">Status</th>
              </tr>
            </thead>
            <tbody className="text-center">
              <tr>
                <td className="px-4 py-2 border border-gray-300">
                  90182390812
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  POS for Retail and F&B
                </td>
                <td className="px-4 py-2 border border-gray-300">High</td>
                <td className="px-4 py-2 border border-gray-300">John Doe</td>
                <td className="px-4 py-2 border border-gray-300">
                  April 14, 2025
                </td>
                <td className="px-4 py-2 border border-gray-300">Unresolved</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-gray-300">
                  90182390812
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  POS for Retail and F&B
                </td>
                <td className="px-4 py-2 border border-gray-300">High</td>
                <td className="px-4 py-2 border border-gray-300">John Doe</td>
                <td className="px-4 py-2 border border-gray-300">
                  April 14, 2025
                </td>
                <td className="px-4 py-2 border border-gray-300">Unresolved</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-gray-300">
                  90182390812
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  POS for Retail and F&B
                </td>
                <td className="px-4 py-2 border border-gray-300">High</td>
                <td className="px-4 py-2 border border-gray-300">John Doe</td>
                <td className="px-4 py-2 border border-gray-300">
                  April 14, 2025
                </td>
                <td className="px-4 py-2 border border-gray-300">Unresolved</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
