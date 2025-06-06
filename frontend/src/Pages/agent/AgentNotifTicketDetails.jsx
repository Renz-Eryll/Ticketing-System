import React, { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import Layout from "../../layout/Layout";

const AgentNotifTicketDetails = () => {
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
        const res = await fetch(`http://localhost:8000/api/agent-notifications/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
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
    <Layout>
      <div
        className={`transition-all duration-300 px-4 md:px-6 lg:px-8 ${
          activeMenu ? "lg:pl-72" : "lg:pl-24"
        }`}
      >
        <div className="flex items-center gap-3 mt-6">
          <IoMdArrowBack
            className="text-3xl text-gray-700 hover:text-blue-600 cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h1 className="text-2xl md:text-3xl font-bold text-blue-700">
            Notification Details
          </h1>
        </div>

        <div className="bg-white rounded-xl shadow-md mt-6 p-6 min-h-[300px]">
          {loading ? (
            <div className="text-center text-gray-500">Loading ticket details...</div>
          ) : error ? (
            <div className="text-center text-red-500">Error: {error}</div>
          ) : notifData ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm md:text-base">
              <div>
                <p className="text-gray-500 font-medium mb-1">Ticket ID</p>
                <p className="font-bold text-gray-800">{notifData.ticket_id || 'N/A'}</p>
              </div>
              <div>
                <p className="text-gray-500 font-medium mb-1">Title</p>
                <p className="font-bold text-gray-800">{notifData.title || 'N/A'}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-gray-500 font-medium mb-1">Message</p>
                <p className="font-bold text-gray-800">{notifData.message || 'N/A'}</p>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500">No data found.</div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AgentNotifTicketDetails;
