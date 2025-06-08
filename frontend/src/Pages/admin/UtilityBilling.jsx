import { useStateContext } from "../../contexts/ContextProvider";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { useEffect, useState, useMemo } from "react";

export const UtilityBilling = () => {
  const [loading, setLoading] = useState(true);
  const [ticketData, setTicketData] = useState([]);
  const [agents, setAgents] = useState([]);
  const [assigning, setAssigning] = useState(false);

  const {
    activeMenu,
    user,
    login,
    token,
    currentCategory,
    setCurrentCategory,
  } = useStateContext();

  const location = useLocation();
  const navigate = useNavigate();
  const { category: routeCategory } = location.state || {};

  const selectedCategory = routeCategory || currentCategory;

  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem("ticketsCurrentPage");
    return savedPage ? parseInt(savedPage) : 1;
  });
  const itemsPerPage = 5;

  useEffect(() => {
    localStorage.setItem("ticketsCurrentPage", currentPage);
  }, [currentPage]);
  useEffect(() => {
    return () => {
      localStorage.removeItem("ticketsCurrentPage");
    };
  }, []);

  // Redirect if not logged in
  if (!login && !user?.id) {
    return <Navigate to="/" />;
  }

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        // Fetch tickets
        const ticketsRes = await fetch(`http://localhost:8000/api/ubs`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!ticketsRes.ok) throw new Error("Failed to fetch tickets");

        // Fetch agents
        const agentsRes = await fetch("http://localhost:8000/api/agents", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Parse JSON
        const tickets = await ticketsRes.json();
        const agentsData = await agentsRes.json();

        // Set state
        setTicketData(tickets);
        setAgents(Array.isArray(agentsData.agents) ? agentsData.agents : []);
      } catch (err) {
        console.error(err);
        setAgents([]); // Probably you meant to clear agents here
      } finally {
        setLoading(false);
      }
    }

    fetchData(); // Corrected function call
  }, [token]);

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
      console.error("Agent assignment failed:", err);
      alert("Failed to assign agent");
    } finally {
      setAssigning(false);
    }
  };

  const filteredAgents = useMemo(() => {
    return agents.filter(
      (agent) =>
        agent.category?.trim().toLowerCase() ===
        selectedCategory?.trim().toLowerCase()
    );
  }, [agents, selectedCategory]);

  const getPriorityColor = (priority) => {
    const colors = {
      High: "text-red-500",
      Primary: "text-green-500",
      Medium: "text-yellow-500",
      Low: "text-gray-600",
    };
    return `${colors[priority] || "text-black"} font-semibold`;
  };

  const statusColor = (status) => {
    const colors = {
      Unresolved: "text-red-500",
      pending: "text-orange-500",
      Resolved: "text-green-500",
    };
    return `${colors[status] || "text-black"} font-semibold`;
  };

  const indexOfLastRow = currentPage * itemsPerPage;
  const indexOfFirstRow = indexOfLastRow - itemsPerPage;
  const currentRows = ticketData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(ticketData.length / itemsPerPage);

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
    <div className={` transition-all ${activeMenu ? "lg:pl-72" : "lg:pl-23"}`}>
      <div className="container mx-auto px-8 py-6">
        <div className="flex gap-4 items-center">
          <IoMdArrowBack
            className="text-4xl cursor-pointer"
            onClick={() => navigate("/admin/ticketCategories")}
          />
          <div className="text-3xl font-bold text-[#1D4ED8]">
            Qtech Utility Billing System
          </div>
        </div>

        <div className="mt-10 p-8 py-10 border border-gray-100 shadow-sm rounded-xl bg-white min-h-[400px]">
          <div className="hidden md:grid grid-cols-[repeat(6,_1fr)] items-center text-center font-semibold text-gray-600 text-sm py-2 mb-5">
            <div>Ticket ID</div>
            <div>Category</div>
            <div>Priority</div>
            <div>Agent</div>
            <div>Date Created</div>
            <div>Status</div>
          </div>

          <div className="space-y-0.5">
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
                <span>Loading Tickets...</span>
              </div>
            ) : ticketData.length > 0 ? (
              currentRows.map((ticket) => (
                <div
                  key={ticket.id}
                  onClick={() =>
                    navigate(`/admin/details/${ticket.id}`, {
                      state: ticket,
                    })
                  }
                  className="bg-[#FAFAFA]  text-left lg:text-center rounded-lg text-sm text-gray-700 py-3
                  cursor-pointer hover:bg-[#f5f5f5] transition grid md:grid-cols-[repeat(6,_1fr)] items-center gap-2"
                >
                  <div className="hidden md:block truncate">{ticket.id}</div>
                  <div className="hidden md:block truncate">
                    {ticket.category}
                  </div>
                  <div
                    className={`hidden md:block truncate ${getPriorityColor(
                      ticket.priority
                    )}`}
                  >
                    {ticket.priority}
                  </div>
                  <div className="hidden md:block truncate">
                    {ticket.agent_name || "Unassigned"}
                  </div>
                  <div className="hidden md:block truncate">
                    {ticket.created_at
                      ? new Date(ticket.created_at).toLocaleString()
                      : "N/A"}
                  </div>
                  <div
                    className={`hidden md:block truncate ${statusColor(
                      ticket.status
                    )}`}
                  >
                    {ticket.status}
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
                      {ticket.created_at
                        ? new Date(ticket.created_at).toLocaleString()
                        : "N/A"}
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
              <div className="text-center text-gray-400">No tickets found.</div>
            )}
          </div>
        </div>
        {ticketData.length >= 3 && (
          <div className="flex justify-end gap-2 mt-6">
            <button
              disabled={currentPage === 1}
              onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  setCurrentPage((prev) => prev - 1);
                  setLoading(false);
                }, 500); // simulate delay or wait for fetch to finish
              }}
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
              onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  setCurrentPage((prev) => prev + 1);
                  setLoading(false);
                }, 500);
              }}
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
  );
};
