  import React, { useEffect, useState } from "react";
  import { useStateContext } from "../../contexts/ContextProvider";
  import { useNavigate, Navigate } from "react-router-dom";

  const Notification = () => {
    const { activeMenu, user, token } = useStateContext();
    const navigate = useNavigate();

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
    };

    const handleRowClick = (notif) => {
      const lastSeen = localStorage.getItem(lastSeenKey) || "1970-01-01T00:00:00Z";
      const isUnread = new Date(notif.created_at) > new Date(lastSeen);

      if (isUnread && unreadCount > 0) {
        setUnreadCount((prev) => prev - 1);

        // Update lastSeen to this notification if it's newer
        const currentLastSeen = new Date(lastSeen);
        const notifDate = new Date(notif.created_at);
        if (notifDate > currentLastSeen) {
          localStorage.setItem(lastSeenKey, notifDate.toISOString());
        }
      }

      navigate(`/admin/notification/${notif.id}`, { state: notif });
    };

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleString(undefined, {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    };

    if (!token || !user?.id) {
      return <Navigate to="/" />;
    }

    return (
      <div
        className={`mx-5 md:mx-5 lg:mx-5 transition-all duration-300 ${
          activeMenu ? "lg:pl-72" : "lg:pl-24"
        }`}
      >
        <div className="flex items-center justify-between text-3xl font-bold text-[#1D4ED8] mb-6">
          <span>Notification</span>

          <div className="flex items-center gap-3">
            {unreadCount > 0 && (
              <span className="relative inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-600 rounded-full">
                {unreadCount}
              </span>
            )}

            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="px-3 py-1 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 transition"
                aria-label="Mark all notifications as read"
              >
                Mark All as Read
              </button>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 min-h-[500px] space-y-3">
          {loading ? (
            <p className="text-center text-gray-500">Loading tickets...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : notifications.length === 0 ? (
            <p className="text-center text-gray-500">No notifications found.</p>
          ) : (
            notifications.map((notif) => {
              const lastSeen = localStorage.getItem(lastSeenKey) || "1970-01-01T00:00:00Z";
              const isUnread = new Date(notif.created_at) > new Date(lastSeen);

              return (
                <div
                  key={notif.id}
                  onClick={() => handleRowClick(notif)}
                  className={`flex items-center justify-between p-4 rounded-md cursor-pointer transition ${
                    isUnread ? "bg-blue-50" : "bg-[#EEF0FF]"
                  } hover:bg-blue-100`}
                >
                  <div className="flex-1 text-sm text-gray-800 truncate">
                    <strong>{notif.category} ticket submitted</strong>:&nbsp;
                    {notif.ticket_body.length > 80
                      ? notif.ticket_body.substring(0, 77) + "..."
                      : notif.ticket_body}
                  </div>

                  <div className="flex items-center space-x-4 ml-4">
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {formatDate(notif.created_at)}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        notif.status === "Resolved"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {notif.status}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  };

  export default Notification;
