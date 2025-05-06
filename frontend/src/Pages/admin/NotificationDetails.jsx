import React, { useState, useEffect, useMemo } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { Navigate, useNavigate, useParams, useLocation } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

const NotificationDetails = () => {
  const { activeMenu, user, login, token } = useStateContext();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [ticketData, setTicketData] = useState(location.state || {}); // Initialize ticket data from location
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [agents, setAgents] = useState([]);  // To store available agents
  const [assignedAgent, setAssignedAgent] = useState(ticketData.agent_id || "");  // To store selected agent

  // compute the name to display live
  const selectedAgentName = useMemo(() => {
    if (assignedAgent && Array.isArray(agents)) {
      const found = agents.find(a => String(a.id) === String(assignedAgent));
      if (found) return found.name;
    }
    return ticketData.agent_name || "Unassigned";
  }, [assignedAgent, agents, ticketData.agent_name]);

  if (!login && !user) {
    return <Navigate to="/" />;
  }

  // Fetch ticket and agents
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
        setAssignedAgent(data.agent_id || ""); // Set initially assigned agent if any
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchAgents = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/agents", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        // Log the fetched agents data
        console.log("Fetched agents data:", data);

        // Check if the 'agents' key exists and is an array
        if (data && Array.isArray(data.agents)) {
          setAgents(data.agents); // Correctly set agents from the 'agents' key in the response
        } else {
          console.error("Error: Agents data is not an array", data);
        }
      } catch (error) {
        console.error("Error fetching agents:", error);
      }
    };

    fetchTicket();
    fetchAgents();
  }, [id, token]);

  const handleAssignAgent = async () => {
    try {
      if (!assignedAgent) {
        alert("Please select an agent to assign.");
        return;
      }

      const response = await fetch(`http://localhost:8000/api/assignAgent/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ agent_id: assignedAgent }),
      });

      const updatedTicket = await response.json();
      if (!response.ok) {
        throw new Error(updatedTicket.message || "Failed to assign agent");
      }

      // Update ticket data with the new agent
      setTicketData((prevData) => ({
        ...prevData,
        agent_name: updatedTicket.agent_name, // Update agent name in ticket data
      }));
      alert("Agent assigned successfully!");
    } catch (error) {
      console.error("Error assigning agent:", error);
      alert("Failed to assign agent. Please try again.");
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">Error: {error}</div>;
  }

  return (
    <div className={`mx-5 md:mx-5 lg:mx-5 transition-all duration-300 ${activeMenu ? "lg:pl-75" : "lg:pl-25"}`}>
      <div className="flex gap-4">
        <div>
          <IoMdArrowBack className="text-4xl cursor-pointer" onClick={() => navigate("/admin/notification")} />
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
              <div className="mt-2 text-black font-bold">{ticketData.customer_name}</div>
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
              <div className="mt-2 text-black font-bold">{ticketData.ticket_body}</div>

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
              <div className="mt-2 text-black font-bold">{selectedAgentName}</div>

              {/* Dropdown to assign a new agent */}
              <div className="mt-5">
                <label htmlFor="agent-select" className="block text-gray-600 font-semibold">Assign New Agent</label>
                <select
                  id="agent-select"
                  value={assignedAgent}
                  onChange={(e) => setAssignedAgent(e.target.value)}
                  className="mt-2 p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select Agent</option>
                  {Array.isArray(agents) && agents.length > 0 ? (
                    agents.map((agent) => (
                      <option key={agent.id} value={agent.id}>
                        {agent.name}
                      </option>
                    ))
                  ) : (
                    <option disabled>No agents available</option>
                  )}
                </select>
                <button
                  onClick={handleAssignAgent}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md"
                >
                  Assign Agent
                </button>
              </div>
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
