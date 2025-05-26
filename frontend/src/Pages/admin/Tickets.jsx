import { useStateContext } from "../../contexts/ContextProvider";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";

export const Tickets = () => {
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const { activeMenu, user, login, token } = useStateContext();
  const [ticketData, setTicketData] = useState(null);
  const [agents, setAgents] = useState([]);
  const [assigning, setAssigning] = useState(false);
  const location = useLocation();
  const { category } = location.state || {};
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem("agentsCurrentPage");
    return savedPage ? parseInt(savedPage) : 1;
  });
  const itemsPerPage = 5;

  useEffect(() => {
    localStorage.setItem("agentsCurrentPage", currentPage);
  }, [currentPage]);
  useEffect(() => {
    return () => {
      localStorage.removeItem("agentsCurrentPage");
    };
  }, []);

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
            return;
        }

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch tickets");

        const data = await response.json();
        setTicketData(data);
        setFilteredData(data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchAgents = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/agents", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (Array.isArray(data.agents)) {
          setAgents(data.agents);
        } else {
          console.error("Agents response format error:", data);
        }
      } catch (err) {
        console.error("Failed to fetch agents:", err);
      }
    };

    if ((category || currentCategory) && token) {
      fetchTickets();
      fetchAgents();
    }
  }, [category, token]);

  const handleAssignAgent = async (ticketId, agentId) => {
    if (!agentId) return;
    setAssigning(true);
    try {
      const response = await fetch(
        `http://localhost:8000/api/assignAgent/${ticketId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ agent_id: agentId }),
        }
      );

      const updated = await response.json();
      if (!response.ok) throw new Error(updated.message);

      setTicketData((prev) =>
        prev.map((ticket) =>
          ticket.id === ticketId
            ? { ...ticket, agent_name: updated.agent_name, agent_id: agentId }
            : ticket
        )
      );
    } catch (err) {
      console.error("Failed to assign agent:", err);
      alert("Agent assignment failed");
    } finally {
      setAssigning(false);
    }
  };

  // Filter agents based on the ticket's category
  const filteredAgents = agents.filter(
    (agent) =>
      agent.category?.trim().toLowerCase() === category?.trim().toLowerCase()
  );

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

  const indexOfLastRow = currentPage * itemsPerPage;
  const indexOfFirstRow = indexOfLastRow - itemsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const maxVisiblePages = 2;
  const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  // Make sure we don't have less than maxVisiblePages if possible
  const adjustedStartPage = Math.max(
    1,
    Math.min(startPage, totalPages - maxVisiblePages + 1)
  );
  const visiblePages = [];
  for (
    let i = adjustedStartPage;
    i <= Math.min(adjustedStartPage + maxVisiblePages - 1, totalPages);
    i++
  ) {
    visiblePages.push(i);
  }

  return (
    <Layout>
      <div
        className={` transition-all ${activeMenu ? "lg:pl-72" : "lg:pl-23"}`}
      >
        <div className="container mx-auto px-8 py-6">
          <div className="flex gap-4">
            <IoMdArrowBack
              className="text-4xl cursor-pointer"
              onClick={() => navigate("/admin/ticketCategories")}
            />
            <div className="text-3xl font-bold text-[#1D4ED8]">{category}</div>
          </div>

          <div className="max-w mt-10 p-6 py-10 border border-gray-100 shadow-sm rounded-md bg-white min-h-[400px]">
            <div className="mb-3 text-md font-semibold text-gray-500">
              Tickets
            </div>
            <div className="hidden md:grid grid-cols-[repeat(6,_1fr)] items-center text-center font-semibold text-gray-600 text-sm py-2 mb-2">
              <div>Ticket ID</div>
              <div>Category</div>
              <div>Priority</div>
              <div>Agent</div>
              <div>Date Created</div>
              <div>Status</div>
            </div>
            <div className="space-y-2">
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
                  <span>Loading Tickets...</span>
                </div>
              ) : filteredData.length > 0 ? (
                currentRows.map((ticket) => (
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
                      <span
                        className={`truncate ${statusColor(ticket.status)}`}
                      >
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
          {filteredData.length >= 3 && (
            <div className="flex justify-end gap-2 mt-6">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className={`px-3 py-1 rounded-sm text-sm ${
                  currentPage === 1
                    ? "bg-white border border-0.5 border-gray-200 cursor-not-allowed"
                    : "bg-white border border-0.5 border-gray-200 hover:bg-gray-50  cursor-pointer"
                }`}
              >
                Previous
              </button>

              {visiblePages.map((page) => (
                <button
                  key={page}
                  disabled={currentPage}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded-sm text-sm ${
                    page === currentPage
                      ? "bg-blue-600 text-white font-bold"
                      : "bg-white"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className={`px-3 py-1 rounded-sm text-sm ${
                  currentPage === totalPages
                    ? "bg-white border border-0.5 border-gray-200 cursor-not-allowed"
                    : "bg-white border border-0.5 border-gray-200 hover:bg-gray-50  cursor-pointer"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Tickets;
