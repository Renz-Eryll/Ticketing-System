import React, { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate, Navigate } from "react-router-dom";

const Notification = () => {
  const { activeMenu, user, token } = useStateContext();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]); // ← Added this line

  useEffect(() => {
    if (!token || !user?.id) return;

    const fetchTickets = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/allTickets", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch tickets");
        }

        const data = await response.json();
        console.log(data); // Optional: For debugging
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, [token, user]);

  // Redirect to login if not authenticated
  if (!token || !user?.id) {
    return <Navigate to="/" />;
  }

  const handleRowClick = (notif) => {
    navigate(`/admin/notification/${notif.id}`, {
      state: notif,
    });
  };

  return (
    <div
      className={`mx-5 md:mx-5 lg:mx-5 transition-all duration-300 ${
        activeMenu ? "lg:pl-72" : "lg:pl-24"
      }`}
    >
      <div className="text-3xl font-bold text-[#1D4ED8] mb-6">Notification</div>

      <div className="bg-white rounded-lg shadow-sm p-6 min-h-[500px] space-y-2">
        <div className="grid grid-cols-[repeat(4,_1fr)] text-center font-semibold text-gray-600 text-sm py-2">
          <div>Ticket ID</div>
          <div>Category</div>
          <div>Issue</div>
          <div>Status</div>
        </div>

        {notifications.map((notif, index) => (
          <div
            key={index}
            onClick={() => handleRowClick(notif)}
            className="grid grid-cols-[repeat(4,_1fr)] bg-[#EEF0FF] rounded-md text-center text-sm text-gray-700 py-3 px-4 items-center cursor-pointer hover:bg-[#dfe3ff] transition"
          >
            <div className="truncate">{notif.id}</div>
            <div className="truncate">{notif.category}</div>
            <div className="truncate">{notif.ticket_body}</div>
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

export default Notification;
