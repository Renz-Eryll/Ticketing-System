import React, { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate, Navigate } from "react-router-dom";

<<<<<<< HEAD
  const Notification = () => {
    const { activeMenu, user, token } = useStateContext();
    const navigate = useNavigate();
=======
const Notification = () => {
  const { activeMenu, user, token } = useStateContext();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
>>>>>>> 543cf3588179d2ef851815785039bf25a23c4187

    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const lastSeenKey = "lastSeenTicketTimestamp";

    useEffect(() => {
      if (!token || !user?.id) return;

      const fetchTickets = async () => {
        setLoading(true);
        setError(null);

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
          setNotifications(data);

          const lastSeen = localStorage.getItem(lastSeenKey) || "1970-01-01T00:00:00Z";
          const newCount = data.filter(ticket => new Date(ticket.created_at) > new Date(lastSeen)).length;
          setUnreadCount(newCount);
        } catch (err) {
          setError(err.message || "Something went wrong");
          setNotifications([]);
          setUnreadCount(0);
        } finally {
          setLoading(false);
        }
      };

<<<<<<< HEAD
      fetchTickets();
    }, [token, user]);

    const markAllAsRead = () => {
      if (notifications.length === 0) return;

      const newestTimestamp = notifications.reduce((max, ticket) => {
        const createdAt = new Date(ticket.created_at);
        return createdAt > max ? createdAt : max;
      }, new Date("1970-01-01T00:00:00Z"));

      localStorage.setItem(lastSeenKey, newestTimestamp.toISOString());
      setUnreadCount(0);
=======
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      } finally {
        setLoading(false);
      }
>>>>>>> 543cf3588179d2ef851815785039bf25a23c4187
    };

    const handleRowClick = (notif) => {
      const lastSeen = localStorage.getItem(lastSeenKey) || "1970-01-01T00:00:00Z";
      const isUnread = new Date(notif.created_at) > new Date(lastSeen);

<<<<<<< HEAD
      if (isUnread && unreadCount > 0) {
        setUnreadCount((prev) => prev - 1);
=======
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
        {loading ? (
          <div className="p-6 text-center text-gray-500 flex items-center justify-center gap-2">
            <div className="spinner-overlay">
              <div className="loading-line"></div>
            </div>

            {loading ? (
              <div className="p-6 text-center text-gray-500 flex items-center justify-center gap-3">
                <svg
                  className="animate-spin h-8 w-8 text-blue-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                <span>Loading Notifications..</span>
              </div>
            ) : notifications.length > 0 ? (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => handleRowClick(notif)}
                  className="grid grid-cols-[repeat(5,_1fr)] bg-[#EEF0FF] rounded-md text-center text-sm text-gray-700 py-3 px-4 items-center cursor-pointer hover:bg-[#dfe3ff] transition"
                >
                  <div className="truncate">{notif.customer}</div>
                  <div className="truncate">#{notif.id}</div>
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
                  <div className="text-xs text-gray-400">
                    {formatTimeAgo(notif.created_at)}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-gray-500 italic">
                No notifications available.
              </div>
            )}
          </div>

          <div className="p-4 flex justify-center border-t border-gray-200 mt-6">
            <button
              onClick={() => alert("See More clicked!")}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              See More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

  export default Notification;
