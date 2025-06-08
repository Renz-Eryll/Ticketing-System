import React, { useState, useEffect, useMemo } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import Layout from "../../layout/Layout";
import toast from "react-hot-toast";
import {
  BadgeCheck,
  User,
  Calendar,
  FileText,
  Paperclip,
  UserCheck,
  CircleAlert,
} from "lucide-react";
const TicketDetails = () => {
  const { activeMenu, user, login, token } = useStateContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const [ticketData, setTicketData] = useState(null);
  const [agents, setAgents] = useState([]);
  const [assignedAgent, setAssignedAgent] = useState("");
  const [priority, setPriority] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingPriority, setLoadingPriority] = React.useState(false);
  const [loadingAgent, setLoadingAgent] = React.useState(false);
  const [error, setError] = useState(null);

  // Redirect if not logged in
  if (!login && !user?.id) {
    return <Navigate to="/" />;
  }

  const selectedAgentName = useMemo(() => {
    if (assignedAgent) {
      const agent = agents.find((a) => String(a.id) === String(assignedAgent));
      return agent?.name || "Unassigned";
    }
    return ticketData?.agent_name || "Unassigned";
  }, [assignedAgent, agents, ticketData]);

  // Fetch Ticket Details
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
        setAssignedAgent(data.agent_id || "");
        setPriority(data.priority || "Low");
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id, token]);

  // Fetch Agents by Category
  useEffect(() => {
    const fetchAgents = async () => {
      if (!ticketData?.category) return;
      try {
        const encodedCategory = encodeURIComponent(ticketData.category);
        const res = await fetch(
          `http://localhost:8000/api/agentsByCategory/${encodedCategory}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch agents");
        if (Array.isArray(data.agents)) setAgents(data.agents);
        else throw new Error("Invalid agents format");
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    fetchAgents();
  }, [ticketData?.category, token]);

  // Assign Agent to Ticket
  const handleAssign = async () => {
    setLoadingAgent(true);
    if (!assignedAgent) {
      toast.error("Please select an agent");
      return;
    }

    try {
      const res = await fetch(`http://localhost:8000/api/assignAgent/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ agent_id: assignedAgent }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Assignment failed");

      await fetch("http://localhost:8000/api/agentnotification", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ticket_id: id,
          user_ID: data.agent_id,
          name: "Admin",
          title: "New Assign Ticket",
          message: "A new ticket has been submitted.",
        }),
        credentials: "include",
      });

      const res1 = await fetch(
        "http://localhost:8000/api/customernotification",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ticket_id: id,
            customer_id: ticketData.user_id,
            title: "Ticket Update",
            message: "A ticket has an agent.",
          }),
          credentials: "include",
        }
      );
      setTicketData((prev) => ({
        ...prev,
        agent_id: assignedAgent,
        agent_name: data.agent_name,
      }));

      toast.success("Agent assigned successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to assign agent");
    } finally {
      setLoadingAgent(false);
    }
  };

  // Update Ticket Status
  const handlePriorityUpdate = async () => {
    setLoadingPriority(true);
    try {
      const res = await fetch(
        `http://localhost:8000/api/tickets/${id}/priority`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ priority }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "priority update failed");

      setTicketData((prev) => ({ ...prev, priority }));

      toast.success("Priority updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update priority");
    } finally {
      setLoadingPriority(false);
    }
  };

  return (
    <Layout>
      <div
        className={` transition-all ${activeMenu ? "lg:pl-72" : "lg:pl-23"}`}
      >
        <div className="container mx-auto px-8 py-6">
          <div className="flex gap-4">
            <IoMdArrowBack
              className="text-4xl cursor-pointer"
              onClick={() => navigate(-1)}
            />
            <div className="text-3xl font-bold text-[#1D4ED8]">
              Ticket Details
            </div>
          </div>

          <div className="mt-12 border min-h-[400px] border-gray-200 bg-white shadow-sm rounded-xl p-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Loading State */}
            {loading ? (
              <div className="col-span-full flex flex-col items-center justify-center text-gray-500 gap-4 ">
                <svg
                  aria-hidden="true"
                  className="animate-spin h-12 w-12 text-gray-200 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5C100 78.3 77.6 100.5 50 100.5C22.4 100.5 0 78.3 0 50.5C0 22.7 22.4 0.5 50 0.5C77.6 0.5 100 22.7 100 50.5ZM9.1 50.5C9.1 73.5 27 91.4 50 91.4C73 91.4 90.9 73.5 90.9 50.5C90.9 27.5 73 9.6 50 9.6C27 9.6 9.1 27.5 9.1 50.5Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9 39.0C96.8 38.3 98.5 35.2 97.4 32.4C95.5 27.7 92.9 23.3 89.5 19.4C85.5 14.9 80.6 11.3 75.1 8.8C69.6 6.3 63.6 5 57.5 5C54.4 5 52 7.4 52 10.5C52 13.6 54.4 16 57.5 16C61.8 16 66 16.9 69.8 18.7C73.6 20.5 77 23.1 79.7 26.4C81.8 28.9 83.5 31.8 84.7 35C85.7 37.8 91.1 39.7 93.9 39Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="text-base">Loading Ticket Details...</span>
              </div>
            ) : (
              <>
                {/* Ticket Info */}
                <div className="space-y-6 col-span-1">
                  {/* Ticket ID */}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <BadgeCheck className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-semibold text-gray-500">
                        Ticket ID
                      </span>
                    </div>
                    <p className="text-lg font-bold text-gray-800">
                      {ticketData.id}
                    </p>
                  </div>

                  {/* Customer Name */}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <User className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-semibold text-gray-500">
                        Customer Name
                      </span>
                    </div>
                    <p className="text-lg font-bold text-gray-800">
                      {ticketData.customer_name}
                    </p>
                  </div>

                  {/* Created At */}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-semibold text-gray-500">
                        Created
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">
                      {ticketData.created_at
                        ? new Date(ticketData.created_at).toLocaleString()
                        : "N/A"}
                    </p>
                  </div>

                  {/* Description */}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-semibold text-gray-500">
                        Description
                      </span>
                    </div>
                    <p className="text-sm text-gray-800">
                      {ticketData.ticket_body}
                    </p>
                  </div>

                  {/* Attachment */}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Paperclip className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-semibold text-gray-500">
                        Attachment
                      </span>
                    </div>
                    {ticketData.image_path ? (
                      <a
                        href={ticketData.image_path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1.5 border border-blue-600 text-blue-600 rounded-lg text-xs hover:bg-blue-50 transition"
                      >
                        <Paperclip className="w-4 h-4 mr-1" />
                        View Attachment
                      </a>
                    ) : (
                      <p className="text-sm text-gray-500">No attachment</p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="col-span-1 md:col-span-2 space-y-8">
                  {/* Status */}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <CircleAlert className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-semibold text-gray-500">
                        Status
                      </span>
                    </div>
                    <span
                      className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium ${
                        ticketData.status === "Open"
                          ? "bg-green-100 text-green-800"
                          : ticketData.status === "Closed"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {ticketData.status}
                    </span>
                  </div>

                  {/* Priority */}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <CircleAlert className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-semibold text-gray-500">
                        Priority
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="w-44 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Urgent">Urgent</option>
                      </select>
                      <button
                        onClick={handlePriorityUpdate}
                        disabled={loadingPriority}
                        className={`px-4 py-2 text-white text-sm rounded-lg ${
                          loadingPriority
                            ? "bg-green-400 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700"
                        }`}
                      >
                        {loadingPriority ? "Updating..." : "Update"}
                      </button>
                    </div>
                  </div>

                  {/* Assigned Agent */}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <UserCheck className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-semibold text-gray-500">
                        Assigned Agent
                      </span>
                    </div>
                    <p className="text-gray-800 font-semibold mt-1">
                      {selectedAgentName}
                    </p>
                    <div className="flex items-center gap-3 mt-3">
                      <select
                        value={assignedAgent}
                        onChange={(e) => setAssignedAgent(e.target.value)}
                        className="w-48 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      >
                        <option value="" disabled>
                          Choose agent
                        </option>
                        {agents.map((a) => (
                          <option key={a.id} value={a.id}>
                            {a.name}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={handleAssign}
                        disabled={loadingAgent}
                        className={`px-4 py-2 text-white text-sm rounded-lg ${
                          loadingAgent
                            ? "bg-blue-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                        }`}
                      >
                        {loadingAgent ? "Assigning..." : "Assign Agent"}
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TicketDetails;
