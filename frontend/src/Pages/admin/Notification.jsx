import React, { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate, Navigate } from "react-router-dom";
import Layout from "../../layout/Layout";

const Notification = () => {
  const { user, token, activeMenu } = useStateContext();
  const navigate = useNavigate();

  const [notifData, setNotifData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [error, setError] = useState(null);
  const lastSeenKey = "agentLastSeenTicketTimestamp";

  useEffect(() => {
    const fetchNotif = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:8000/api/allNotifications`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch ticket details.");
        const data = await res.json();
        setNotifData(data);

        // Set unread count based on last seen timestamp
        const lastSeen =
          localStorage.getItem(lastSeenKey) || "1970-01-01T00:00:00Z";
        const unread = data.filter(
          (notif) => new Date(notif.created_at) > new Date(lastSeen)
        ).length;
        setUnreadCount(unread);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNotif();
  }, [token, user?.id]);

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/api/admin-unread-count`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        setUnreadCount(data.unread_count);
      } catch (err) {
        console.error("Error fetching unread count:", err);
      }
    };
    fetchUnreadCount();
  });

  const markNotificationAsRead = async (notifId) => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/adminUpdateNotif/${notifId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ is_read: true }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to mark notification as read");
      }

      const updatedNotif = await res.json();
      console.log("Notification marked as read:", updatedNotif);

      // Optional: update UI immediately
      setNotifData((prevData) =>
        prevData.map((n) => (n.id === notifId ? { ...n, is_read: true } : n))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const markAllAsRead = async () => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/admin-notifications/mark-all-read`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
        console.log(data.message); // Optional: log success message

        // Reset unread count locally
        setUnreadCount(0);

        // Optional: refetch notifications list here if needed
      } else {
        console.error("Failed to mark all as read");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleNotifClick = (notif) => {
    if (notif.ticket_id) {
      navigate(`/admin/notif/${notif.id}`);
      markNotificationAsRead(notif.id);
    }
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000); // seconds

    if (diff < 60) return `${diff} seconds ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return `${Math.floor(diff / 86400)} days ago`;
  };

  if (!token || !user?.id) {
    return <Navigate to="/" />;
  }

  return (
    <Layout>
      <div
        className={` transition-all ${activeMenu ? "lg:pl-72" : "lg:pl-23"}`}
      >
        <div className="container mx-auto px-8 py-6">
          <div className="text-3xl font-bold text-[#1D4ED8] ">
            Notifications
          </div>

          <div className="gap-3  mt-7 min-h-[400px] bg-white shadow-sm rounded-xl p-8">
            <div className="mb-3 flex justify-end">
              <button
                onClick={markAllAsRead}
                className="px-3 py-1.5 bg-gray-200 text-sm rounded-lg hover:bg-gray-300 transition cursor-pointer mb-5"
              >
                Mark All as Read ({unreadCount})
              </button>
            </div>
            {loading ? (
              <div className="col-span-full p-6 text-center text-gray-500 flex flex-row items-center justify-center gap-3">
                <svg
                  aria-hidden="true"
                  className="animate-spin h-10 w-10 text-gray-200 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5C100 78.3 77.6 100.5 50 
      100.5C22.4 100.5 0 78.3 0 50.5C0 22.7 
      22.4 0.5 50 0.5C77.6 0.5 100 22.7 100 
      50.5ZM9.1 50.5C9.1 73.5 27 91.4 50 
      91.4C73 91.4 90.9 73.5 90.9 50.5C90.9 
      27.5 73 9.6 50 9.6C27 9.6 9.1 27.5 9.1 
      50.5Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9 39.0C96.8 38.3 98.5 35.2 
      97.4 32.4C95.5 27.7 92.9 23.3 
      89.5 19.4C85.5 14.9 80.6 11.3 
      75.1 8.8C69.6 6.3 63.6 5 57.5 
      5C54.4 5 52 7.4 52 10.5C52 13.6 
      54.4 16 57.5 16C61.8 16 66 16.9 
      69.8 18.7C73.6 20.5 77 23.1 79.7 
      26.4C81.8 28.9 83.5 31.8 84.7 
      35C85.7 37.8 91.1 39.7 93.9 39Z"
                    fill="currentFill"
                  />
                </svg>
                <span>Loading Notifications...</span>
              </div>
            ) : error ? (
              <div className="p-6 text-center text-red-500">{error}</div>
            ) : notifData.length > 0 ? (
              notifData.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => handleNotifClick(notif)}
                  className={`bg-[#FAFAFA] mt-1 rounded-lg text-sm text-gray-700 py-3 px-4 cursor-pointer hover:bg-[#f5f5f5] transition
          grid md:grid-cols-[repeat(3,_1fr)] items-center gap-2
          ${!notif.is_read ? " text-red-500 font-semibold" : ""}`}
                >
                  {/* Desktop */}
                  <div className="hidden md:block truncate text-center ">
                    {notif.title}
                  </div>
                  <div className="hidden md:block truncate text-center">
                    {notif.message}
                  </div>
                  <div className="hidden md:block truncate text-center text-xs">
                    {formatTimeAgo(notif.created_at)}
                  </div>

                  {/* Mobile */}
                  <div className="md:hidden space-y-1">
                    <div>
                      <span className="font-semibold"></span> {notif.name}
                    </div>
                    <div>
                      <span className="font-semibold"></span> {notif.message}
                    </div>
                    <div className="text-xs text-gray-500">
                      <span className="font-semibold"></span>{" "}
                      {formatTimeAgo(notif.created_at)}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-gray-500 italic">
                No notifications available.
              </div>
            )}
            <div className="flex justify-end mt-15 pr-4 items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                <span className="text-sm text-gray-700">Unread</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                <span className="text-sm text-gray-700">Read</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Notification;
