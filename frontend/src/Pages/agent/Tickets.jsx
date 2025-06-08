import React, { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { Navigate, useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import Layout from "../../layout/Layout";
export const AgentTickets = () => {
  const { activeMenu, user, login, token, contextReady } = useStateContext();
  const navigate = useNavigate();

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem("dashboardCurrentPage");
    return savedPage ? parseInt(savedPage) : 1;
  });
  const itemsPerPage = 7;

  useEffect(() => {
    localStorage.setItem("dashboardCurrentPage", currentPage);
  }, [currentPage]);
  useEffect(() => {
    return () => {
      localStorage.removeItem("dashboardCurrentPage");
    };
  }, []);

  useEffect(() => {
    if (!contextReady || !login || !user?.id || !token) return;
    // fetch data...
  }, [contextReady, login, user, token]);

  useEffect(() => {
    const fetchTickets = async () => {
      if (!contextReady || !login || !user?.id || !token) return;
      try {
        const res = await fetch(
          `http://localhost:8000/api/tickets/agent/${user.id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch tickets");
        setTickets(data.tickets || []);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch tickets");
        setLoading(false);
      }
    };

    fetchTickets();
  }, [contextReady, login, user, token]);

  if (!login && !user?.id && !token) {
    return <Navigate to="/" />;
  }
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
      case "Resolved":
        return "text-green-500 font-semibold";
      default:
        return "text-black";
    }
  };

  const indexOfLastRow = currentPage * itemsPerPage;
  const indexOfFirstRow = indexOfLastRow - itemsPerPage;
  const currentRows = tickets.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(tickets.length / itemsPerPage);

  const maxVisiblePages = 3;
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
      <div className={`transition-all ${activeMenu ? "lg:pl-72" : "lg:pl-23"}`}>
        <div className="container px-8 py-6">
          <div className="flex gap-4">
            <div>
              <IoMdArrowBack
                className="text-4xl cursor-pointer"
                onClick={() => navigate("/agent/dashboard")}
              />
            </div>
            <div className="text-3xl font-bold text-[#1D4ED8]">Tickets</div>
          </div>

          <div className="max-w mt-10 p-8 py-10 border border-gray-100 shadow-sm rounded-xl bg-white min-h-[400px]">
            <div className="hidden md:grid grid-cols-[repeat(6,_1fr)] text-center font-semibold text-gray-600 text-sm py-2 mb-4">
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
              ) : tickets.length > 0 ? (
                tickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    onClick={() =>
                      navigate(`/agent/tickets/${ticket.id}`, {
                        state: ticket,
                      })
                    }
                    className="bg-[#FAFAFA] rounded-lg text-sm text-gray-700 py-3 cursor-pointer hover:bg-[#f5f5f5] 
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
                      {ticket.created_at
                        ? new Date(ticket.created_at).toLocaleString()
                        : "N/A"}
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
                <div className="p-6 text-center text-gray-500">
                  No tickets found
                </div>
              )}
            </div>
            {tickets.length >= 3 && (
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
                    onClick={() => {
                      setLoading(true);
                      setTimeout(() => {
                        setCurrentPage(page);
                        setLoading(false);
                      }, 500);
                    }}
                    className={`px-3 py-1 rounded-sm text-sm cursor-pointer ${
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
      </div>
    </Layout>
  );
};

export default AgentTickets;
