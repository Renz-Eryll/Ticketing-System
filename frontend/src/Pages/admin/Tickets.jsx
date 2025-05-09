import { useStateContext } from "../../contexts/ContextProvider";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { useEffect } from "react";
import { useState } from "react";

export const Tickets = () => {
  const { activeMenu, user, token } = useStateContext();
  const [ticketData, setTicketData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const location = useLocation();
  const { category } = location.state || {};
  const { id } = useParams();
  const navigate = useNavigate();

  const { currentCategory, setCurrentCategory } = useStateContext();
  useEffect(() => {
    if (category) {
      setCurrentCategory(category);
    }
  }, [category]);

  // Redirect if not logged in
  if (!token && !user?.id) {
    return <Navigate to="/" />;
  }

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        let url = "";

        // Determine the URL based on the category
        switch (category) {
          case "POS Retail":
            url = "http://localhost:8000/api/pos";
            break;
          case "Inventory Support":
            url = "http://localhost:8000/api/iss";
            break;
          case "Utility Billing":
            url = "http://localhost:8000/api/ubs";
            break;
          case "Accounting System":
            url = "http://localhost:8000/api/qsa";
            break;
          case "HR Payroll System":
            url = "http://localhost:8000/api/payroll";
            break;
          default:
            return; // Exit if category is not supported
        }

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch tickets");
        }

        const data = await response.json();
        setTicketData(data);
        setFilteredData(data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    if ((category || currentCategory) && token) {
      fetchTickets();
    }
  }, [category, token]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "text-red-500 font-semibold";
      case "Primary":
        return "text-green-500 font-semibold";
      case "Medium":
        return "text-yellow-500 font-semibold";
      case "Low":
        return "text-gray-500 font-semibold";
      default:
        return "text-black";
    }
  };

  const statusColor = (status) => {
    switch (status) {
      case "Unresolved":
        return "text-red-500 font-semibold";
      case "pending":
        return "text-orange-500 font-semibold";
      case "Resolved":
        return "text-green-500 font-semibold";
      default:
        return "text-black";
    }
  };

  return (
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
            onClick={() => navigate("/admin/ticketCategories")}
          />
        </div>
        <div className="text-3xl font-bold text-[#1D4ED8]">{category}</div>
      </div>
      <div className="max-w mt-10 p-6 py-10 border border-gray-100 shadow-sm rounded-lg bg-white min-h-[500px]">
        <div className="hidden md:grid grid-cols-[repeat(6,_1fr)] items-center text-center font-semibold text-gray-600 text-sm py-2 mb-5">
          <div>Ticket ID</div>
          <div>Category</div>
          <div>Priority</div>
          <div>Agent</div>
          <div>Date Created</div>
          <div>Status</div>
        </div>
        <div className="space-y-2">
          {loading ? (
            <div className="p-6 text-center text-gray-500 flex items-center justify-center gap-2">
              <div className="spinner-overlay">
                <div className="loading-line"></div>
              </div>
            </div>
          ) : filteredData.length > 0 ? (
            filteredData.map((ticket) => (
              <div
                key={ticket.id}
                onClick={() =>
                  navigate(`/admin/details/${ticket.id}`, {
                    state: ticket,
                  })
                }
                className="bg-[#EEF0FF] rounded-md text-sm text-gray-700 py-3 px-4 cursor-pointer hover:bg-[#dfe3ff] 
                transition grid md:grid-cols-[repeat(6,_1fr)] items-center gap-2"
              >
                <div className="hidden md:block truncate text-center">
                  {ticket.id}
                </div>
                <div className="hidden md:block truncate text-center">
                  {ticket.category}
                </div>
                <div
                  className={`hidden md:block truncate text-center ${getPriorityColor(
                    ticket.priority
                  )}`}
                >
                  {ticket.priority}
                </div>
                <div className="hidden md:block truncate text-center">
                  {ticket.agent_name}
                </div>
                <div className="hidden md:block truncate text-center">
                  {ticket.updated_at}
                </div>
                <div className="hidden md:block truncate text-center">
                  <span className={`truncate ${statusColor(ticket.status)}`}>
                    {ticket.status}
                  </span>
                </div>

                {/* Mobile View */}
                <div className="md:hidden space-y-1">
                  <div>
                    <span className="font-semibold">Ticket ID:</span>{" "}
                    {ticket.id}
                  </div>
                  <div>
                    <span className="font-semibold">Category:</span>{" "}
                    {ticket.category}
                  </div>
                  <div>
                    <span className="font-semibold">Priority:</span>{" "}
                    <span className={getPriorityColor(ticket.priority)}>
                      {ticket.priority}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold">Agent:</span>{" "}
                    {ticket.agent_name}
                  </div>
                  <div>
                    <span className="font-semibold">Date:</span>{" "}
                    {ticket.updated_at}
                  </div>
                  <div>
                    <span className="font-semibold">Status:</span>{" "}
                    <span className={statusColor(ticket.status)}>
                      {ticket.status}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-gray-500">
              No tickets found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
