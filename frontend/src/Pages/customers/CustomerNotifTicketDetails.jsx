import React, { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import {
  BellRing,
  Paperclip,
  Calendar,
  FileText,
  AlertCircle,
} from "lucide-react";

const CustomerNotifTicketDetails = () => {
  const navigate = useNavigate();
  const { activeMenu, user, login, token } = useStateContext();
  const { id } = useParams();
  const [notifData, setNotifData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  if (!login && !user) return <Navigate to="/" />;

  useEffect(() => {
    const fetchNotif = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:8000/api/customer-notifications/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch ticket details.");
        const data = await res.json();
        setNotifData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNotif();
  }, [id, token]);

  return (
    <div className="max-w-7xl mx-auto mt-35 lg:mt-35 px-10 lg:px-5 mb-5">
      <div className="flex items-center gap-3 mt-6">
        <IoMdArrowBack
          className="text-3xl text-gray-700 hover:text-blue-600 cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h1 className="text-2xl md:text-3xl font-bold text-blue-700">
          Notification Details
        </h1>
      </div>

      <div className="bg-white shadow-sm rounded-xl mt-8 py-15 px-15  min-h-[440px]">
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
          <div className="text-center text-red-500 flex items-center justify-center gap-2 text-sm">
            <AlertCircle className="w-5 h-5" />
            Error: {error}
          </div>
        ) : notifData ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            {/* Ticket ID */}
            <div>
              <div className="flex items-center gap-2 text-gray-500 font-medium mb-1">
                <FileText className="h-4 w-4" />
                Ticket ID
              </div>
              <div className="text-gray-800 font-bold">
                {notifData.ticket_id || "N/A"}
              </div>
            </div>

            {/* Attachment */}
            <div>
              <div className="flex items-center gap-2 text-gray-500 font-medium mb-1">
                <Calendar className="h-4 w-4" />
                Date Created
              </div>
              <div className="text-gray-800 font-bold">
                {notifData.created_at
                  ? new Date(notifData.created_at).toLocaleString([], {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "N/A"}
              </div>
            </div>

            {/* Title */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 text-gray-500 font-medium mb-1">
                <BellRing className="h-4 w-4" />
                Title
              </div>
              <div className="text-gray-800 font-bold">
                {notifData.title || "N/A"}
              </div>
            </div>

            {/* Message */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 text-gray-500 font-medium mb-1">
                <FileText className="h-4 w-4" />
                Message
              </div>
              <div className="text-gray-800 font-bold">
                {notifData.message || "N/A"}
              </div>
            </div>

            {/* Date Created */}
            <div className="md:col-span-2"></div>
          </div>
        ) : (
          <div className="text-center text-gray-400 text-sm">
            No notification data found.
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerNotifTicketDetails;
