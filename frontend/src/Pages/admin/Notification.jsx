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
           const lastSeen = localStorage.getItem(lastSeenKey) || "1970-01-01T00:00:00Z";
           const unread = data.filter((notif) => new Date(notif.created_at) > new Date(lastSeen)).length;
           setUnreadCount(unread);
         } catch (err) {
           setError(err.message);
         } finally {
           setLoading(false);
         }
       };
       fetchNotif();
     }, [token, user?.id]);
   

     
     useEffect(() =>{
       const fetchUnreadCount = async () => {
       try {
         const res = await fetch(`http://localhost:8000/api/admin-unread-count`, {
           headers: {
             Authorization: `Bearer ${token}`
           }
         });
         const data = await res.json();
         setUnreadCount(data.unread_count);
       } catch (err) {
         console.error("Error fetching unread count:", err);
       }
     };
     fetchUnreadCount();
     })
   
     
   
   const markNotificationAsRead = async (notifId) => {
     try {
       const res = await fetch(`http://localhost:8000/api/adminUpdateNotif/${notifId}`, {
         method: 'PUT',
         headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${token}`,
         },
         body: JSON.stringify({ is_read: true }),
       });
   
       if (!res.ok) {
         throw new Error('Failed to mark notification as read');
       }
   
       const updatedNotif = await res.json();
       console.log('Notification marked as read:', updatedNotif);
   
       // Optional: update UI immediately
       setNotifData((prevData) =>
         prevData.map((n) =>
           n.id === notifId ? { ...n, is_read: true } : n
         )
       );
     } catch (err) {
       console.error(err);
     }
   };
   
 const markAllAsRead = async () => {
  try {
    const res = await fetch(`http://localhost:8000/api/admin-notifications/mark-all-read`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

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
      className={`mx-5 md:mx-5 lg:mx-5 transition-all duration-300 ${
        activeMenu ? "lg:pl-72" : "lg:pl-24"
      }`}
    >
      <div className="text-3xl font-bold text-[#1D4ED8] mb-6">Agent Notifications</div>

      <div className="grid gap-4 min-h-[500px] bg-white rounded-lg shadow-sm p-6">
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
        ) : error ? (
          <div className="p-6 text-center text-red-500">{error}</div>
        ) : notifData.length > 0 ? (
          notifData.map((notif) => (
             <div
            key={notif.id}
            onClick={() => handleNotifClick(notif)}
            className={`relative border rounded-xl p-4 shadow-sm transition hover:shadow-md cursor-pointer ${
              !notif.is_read ? "border-l-4 border-blue-500 bg-blue-50" : "bg-white"
            }`}
          >
            {/* Unread red dot */}
            {!notif.is_read && (
              <span className="absolute left-2 top-2 w-2 h-2 bg-red-500 rounded-full"></span>
            )}

            <div className="pl-2">
              <p className="text-base font-semibold text-gray-800 mb-1">{notif.message}</p>
              <p className="text-sm text-gray-500">{formatTimeAgo(notif.created_at)}</p>
            </div>
          </div>
          ))
        ) : (
          <div className="p-6 text-center text-gray-500 italic">
            No notifications available.
          </div>
        )}

        <div className="p-4 flex justify-between border-t border-gray-200 mt-6">
          <button
            onClick={markAllAsRead}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
          >
            Mark All as Read ({unreadCount})
          </button>
          <button
            onClick={() => alert("See More clicked!")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            See More
          </button>
        </div>
      </div>
    </div>
      
    </Layout>
  );
};

export default Notification;
