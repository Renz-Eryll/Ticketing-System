import React, { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import {
  useLocation,
  useNavigate,
  useParams,
  Navigate,
} from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

export const TicketDetails = () => {
  const { activeMenu, user, login, token } = useStateContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticketData, setTicketData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  if (!login && !user) {
    return <Navigate to="/" />;
  }

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/ticket/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch ticket");
        }

        setTicketData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id, token]);

  if (loading) {
    return (
      <div className="text-center flex justify-center">
        <div className="spinner-overlay">
          <div className="loading-line"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">Error: {error}</div>;
  }

  if (!ticketData) {
    return (
      <div className="text-center text-red-500 mt-10">
        Error: Ticket data not available.
      </div>
    );
  }

  return (
    <div
      className={`mx-5 md:mx-5 lg:mx-5 transition-all duration-300 ${
        activeMenu ? "lg:pl-75" : "lg:pl-25"
      }`}
    >
      <div className="flex gap-4">
        <IoMdArrowBack
          className="text-4xl cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <div className="text-3xl font-bold text-[#1D4ED8]">Tickets Details</div>
      </div>

      <div className="max-w mt-10 border border-gray-100 shadow-sm rounded-xl bg-white">
        <div className="px-4 grid grid-cols-12 ">
          <div className="col-span-12 md:col-span-5 p-8 text-sm">
            <div className="text-gray-600 font-semibold mt-2">Ticket ID</div>
            <div className="mt-2 text-black font-bold">{ticketData.id}</div>

            <div className="text-gray-600 font-semibold mt-6">
              Customer Name
            </div>
            <div className="mt-2 text-black font-bold">
              {ticketData.customer_name}
            </div>
          </div>

          <div className="col-span-12 md:col-span-7 p-8 text-sm">
            <div className="text-gray-600 font-semibold mt-2">Created Date</div>
            <div className="mt-2 text-black font-bold">
              {ticketData.created_at}
            </div>

            <div className="text-gray-600 font-semibold mt-6">Status</div>
            <div className="mt-2 text-black font-bold">{ticketData.status}</div>
          </div>

          <div className="col-span-12 md:col-span-5 mt-5 px-8 text-sm">
            <div className="text-gray-600 font-semibold">Description</div>
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
            <div className="mt-4 text-black font-bold">Technical Assigned</div>
            <div className="mt-2 text-black font-bold">
              March 2, 2025 | 9:15 AM
            </div>
          </div>

          <div className="col-span-12 md:col-span-7 px-8 text-sm">
            <div className="text-gray-600 font-semibold mt-5 md:mt-25">
              Assigned Agent
            </div>
            <div className="mt-2 text-black font-bold">
              {ticketData.agent_name}
            </div>
          </div>

          <div className="col-span-12 md:col-span-7 px-8 mt-5 text-sm">
            <div className="text-gray-600 font-semibold mt-5 md:mt-15">
              Attachments
            </div>
            <div className="mt-2 text-black font-bold mb-10">
              {ticketData.image_path}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
