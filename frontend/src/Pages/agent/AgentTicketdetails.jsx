import React from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { useState } from "react";
import { useEffect } from "react";
import Layout from "../../layout/Layout";
const AgentTicketdetails = () => {
  const { activeMenu, user, login,token } = useStateContext();
  const { id } = useParams();
  const [ticketData, setTicketData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const location = useLocation();


  // Redirect if not logged in
  if (!login && !user) {
    return <navigate to="/" />;
  }

 useEffect(() => {
    const fetchTicket = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:8000/api/ticket/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch ticket");
        setTicketData(data);
        setStatus(data.status || "Open");
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id, token]);
  
  // Update Ticket Status
  const handleStatusUpdate = async () => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/tickets/${id}/status`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Status update failed");

      setTicketData((prev) => ({ ...prev, status }));
      alert("Status updated successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };


  if (!ticketData) {
    return (
      <div
        className={`
        mx-5 md:mx-5 lg:mx-5
        transition-all duration-300 
        ${activeMenu ? "lg:pl-75" : "lg:pl-25"}
      `}
      >
        <div className="text-red-500">Error: Ticket data not available.</div>
      </div>
    );
  }

  return (
    <Layout>
    <div
      className={`
        mx-5 md:mx-5 lg:mx-5
        transition-all duration-300 
        ${activeMenu ? "lg:pl-75" : "lg:pl-25"}
      `}
    >
      <div className="flex gap-4">
        <div>
          <IoMdArrowBack
            className="text-4xl cursor-pointer"
            onClick={() => navigate("/agent/tickets")}
          />
        </div>
        <div className="text-3xl font-bold text-[#1D4ED8]">Tickets Details</div>
      </div>
      <div className="max-w mt-10 border border-gray-100 shadow-sm rounded-xl bg-white">
        <div className="px-4 grid grid-cols-12 ">
          <div className="col-span-12 md:col-span-5 p-8 text-sm">
            <div className="block">
              <div className="text-gray-600 font-semibold mt-2">Ticket ID</div>
              <div className="mt-2 text-black font-bold">{ticketData.id}</div>

              <div className="text-gray-600 font-semibold mt-6">
                Customer Name
              </div>
              <div className="mt-2 text-black font-bold">
                {ticketData.customer_name}
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-7 p-8 text-sm">
            <div className="block">
              <div className="text-gray-600 font-semibold mt-2">
                Created Date
              </div>
              <div className="mt-2 text-black font-bold">{ticketData.created_at}</div>

                <div className="font-semibold text-gray-600 mt-6">Status</div>
                  <div className="flex items-center gap-2 mt-1">
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="p-2 border-2 border-black rounded-md"
                    >
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                      <option value="Closed">Closed</option>
                    </select>
                    <button
                      onClick={handleStatusUpdate}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md"
                    >
                      Update
                    </button>
                  </div>
                </div>

                <div className="font-semibold text-gray-600 mt-6">Priority</div>
                <div className="font-bold text-black mt-1">
                                {ticketData.priority}
                              </div>
          </div>
          <div className="col-span-12 md:col-span-5 mt-5 px-8 text-sm">
            <div className="block">
              <div className="text-gray-600 font-semibold ">Description</div>
              <div className="mt-2 text-black font-bold">
                {ticketData.ticket_body}
              </div>

              <div className="text-gray-600 font-semibold mt-5 md:mt-8">
                Timeline
              </div>
              <div className="mt-2 text-black font-bold">Initial Response</div>
              <div className="mt-2 text-black font-bold">
                March 2, 2025 | 9:02 AM
              </div>
              <div className="mt-4 text-black font-bold ">
                Technicial Assigned
              </div>
              <div className="mt-2 text-black font-bold">
                March 2, 2025 | 9:15 AM
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-7 px-8 text-sm">
            <div className="block">
              <div className="text-gray-600 font-semibold mt-5 md:mt-25">
                Assigned Agent
              </div>
              <div className="mt-2 text-black font-bold">
                {ticketData.agent_name}
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-7 px-8 mt-5 text-sm">
            <div className="block">
              <div className="text-gray-600 font-semibold mt-5 md:mt-15">
                Attachments
              </div>
              <div className="mt-2 text-black font-bold mb-10"> {ticketData.image_path}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default AgentTicketdetails;
