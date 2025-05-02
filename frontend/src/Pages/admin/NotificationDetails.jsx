import React from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { useEffect } from "react";
import { useState } from "react";

const NotificationDetails = () => {
  const { activeMenu,user,login,token} = useStateContext();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const ticketData = location.state;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notifications, setNotifications] = useState([]);


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
  return (
    <div
      className={`mx-5 md:mx-5 lg:mx-5 transition-all duration-300 ${
        activeMenu ? "lg:pl-75" : "lg:pl-25"
      }`}
    >
      <div className="flex gap-4">
        <div>
          <IoMdArrowBack
            className="text-4xl cursor-pointer"
            onClick={() => navigate("/admin/notification")}
          />
        </div>
        <div className="text-3xl font-bold text-[#1D4ED8]">Notification Details</div>
      </div>

      {/* Aligned container */}
      <div className="bg-white rounded-lg shadow-sm p-6 min-h-[500px] space-y-2 mt-6">
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-5 p-4 text-sm">
            <div className="block">
              <div className="text-gray-600 font-semibold mt-2">Ticket ID</div>
              <div className="mt-2 text-black font-bold">{ticketData.id}</div>

              <div className="text-gray-600 font-semibold mt-6">Customer Name</div>
              <div className="mt-2 text-black font-bold">{ticketData.customer_name  }</div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-7 p-4 text-sm">
            <div className="block">
              <div className="text-gray-600 font-semibold mt-2">Created Date</div>
              <div className="mt-2 text-black font-bold">{ticketData.created_at}</div>

              <div className="text-gray-600 font-semibold mt-6">Status</div>
              <div className="mt-2 text-black font-bold">{ticketData.status}</div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-5 mt-5 px-4 text-sm">
            <div className="block">
              <div className="text-gray-600 font-semibold">Description</div>
              <div className="mt-2 text-black font-bold">{ticketData.ticket_body }</div>

              <div className="text-gray-600 font-semibold mt-5 md:mt-8">Timeline</div>
              <div className="mt-2 text-black font-bold">Initial Response</div>
              <div className="mt-2 text-black font-bold">March 2, 2025 | 9:02 AM</div>
              <div className="mt-4 text-black font-bold">Technician Assigned</div>
              <div className="mt-2 text-black font-bold">March 2, 2025 | 9:15 AM</div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-7 px-4 text-sm">
            <div className="block">
              <div className="text-gray-600 font-semibold mt-5 md:mt-25">Assigned Agent</div>
              <div className="mt-2 text-black font-bold">{ticketData.agent_name}</div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-7 px-4 mt-5 text-sm">
            <div className="block">
              <div className="text-gray-600 font-semibold mt-5 md:mt-15">Attachments</div>
              <div className="mt-2 text-black font-bold mb-10">{ticketData.image_path}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationDetails;
