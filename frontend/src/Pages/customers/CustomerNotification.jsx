import React from "react";
import { useStateContext } from "../../contexts/ContextProvider";

const CustomerNotification = () => {
  const { activeMenu } = useStateContext();

  const notifications = [
    {
      ticketId: "ASD123456789",
      category: "POS for Retail and F&B",
      issue: "Payment terminal not processing ...",
      status: "Unresolved",
    },
    {
      ticketId: "ASD987654321",
      category: "POS for Retail and F&B",
      issue: "Payment terminal not processing ...",
      status: "Resolved",
    },
    {
      ticketId: "ASD654123987",
      category: "qSA (Quick and Simple Accounting)",
      issue: "Payment terminal not processing ...",
      status: "Resolved",
    },
  ];

  return (
    <div
      className={`mx-5 md:mx-5 lg:mx-5 transition-all duration-300 ${
        activeMenu ? "lg:pl-72" : "lg:pl-24"
      }`}
    >
      <div className="text-3xl font-bold text-[#1D4ED8] mb-6">Notification</div>

      <div className="bg-white rounded-lg shadow-sm p-6 min-h-[500px] space-y-2">
        {/* Header */}
        <div className="grid grid-cols-[repeat(4,_1fr)] text-center font-semibold text-gray-600 text-sm py-2">
          <div>Ticket ID</div>
          <div>Category</div>
          <div>Issue</div>
          <div>Status</div>
        </div>

        {/* Rows */}
        {notifications.map((notif, index) => (
          <div
            key={index}
            className="grid grid-cols-[repeat(4,_1fr)] bg-[#EEF0FF] rounded-md text-center text-sm text-gray-700 py-3 px-4 items-center"
          >
            <div className="truncate">{notif.ticketId}</div>
            <div className="truncate">{notif.category}</div>
            <div className="truncate">{notif.issue}</div>
            <div className="font-medium">
              <span
                className={`${
                  notif.status === "Resolved"
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {notif.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerNotification;
