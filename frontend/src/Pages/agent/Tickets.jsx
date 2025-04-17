import React from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";

export const AgentTickets = () => {
  const { activeMenu } = useStateContext();
  const navigate = useNavigate();

  // kunyareng data
  const data = [
    {
      id: 112381389173,
      category: "POS for Retail and F&B",
      priority: "High",
      agent: "John Doe",
      date: "March 1, 2025",
      status: "Unresolved",
      customer: "Customer Name",
      description: "Payment terminal not processing transactions",
    },
    {
      id: 2918392821,
      date: "March 1, 2025",
      category: "POS for Retail and F&B",
      priority: "Primary",
      agent: "John Doe",
      status: "Resolved",
      customer: "Pangalan ng nag - ticket",
      description: "Payment terminal not processing transactions",
    },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "text-red-500 font-semibold";
      case "Primary":
        return "text-green-500 font-semibold";
      case "Medium":
        return "text-yellow-500 font-semibold";
      case "Low":
        return "text-gray-500 font-semibold";
      default:
        return "text-black";
    }
  };

  return (
    <div
      className={`
      mx-5 md:mx-5 lg:mx-5
      transition-all duration-300 
      ${activeMenu ? "lg:pl-75" : "lg:pl-25"}
    `}
    >
      <div className="text-3xl font-bold text-[#1D4ED8]">
        POS for Retail and F&B
      </div>
      <div className="max-w mt-10 p-6 py-10 border border-gray-100 shadow-sm rounded-xl bg-white min-h-[500px]">
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
              {data.map((item) => (
                <tr
                  key={item.id}
                  onClick={() =>
                    navigate(`/agent/AgentTicketDetails/:id${item.id}`, {
                      state: item,
                    })
                  }
                  className="cursor-pointer hover:bg-gray-100 transition"
                >
                  <td className="px-4 py-2 border border-gray-300">
                    {item.id}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {item.category}
                  </td>
                  <td
                    className={`px-4 py-2 border border-gray-300 ${getPriorityColor(
                      item.priority
                    )}`}
                  >
                    {item.priority}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {item.agent}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {item.date}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {item.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AgentTickets;
