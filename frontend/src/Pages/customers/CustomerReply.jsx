
import{ useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { useStateContext } from "../../contexts/ContextProvider";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar"; 

export const CustomerReply = () => {
  const { activeMenu, user, login, token } = useStateContext();
  const { id } = useParams();
  const [ticketData, setTicketData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("");
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");


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
          setImageUrl(data.image_url);
        } catch (err) {
          console.error(err);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchTicket();
    }, [id, token]);


     const handleStatusUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/tickets/${id}/status`,
        {
          method: "POST",
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

  if (!login && !user) {
    navigate("/");
    return null;
  }

const fetchMessages = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/messages/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json(); // ✅ Fix: parse JSON
      setMessages(data);
    } catch (err) {
      console.error("Error fetching messages", err);
    }
  };


 const sendMessage = async () => {
  if (!ticketData?.id) return alert("Receiver not defined");

  try {
    const res = await fetch(`http://localhost:8000/api/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        receiver_id: ticketData.id,
        customer_ticket_id: ticketData.id,
        content: content,
      }),
    });

    const contentType = res.headers.get("content-type");

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Server error:", errorText);
      alert("Failed to send message");
      return;
    }

    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Expected JSON response");
    }

    const data = await res.json();
    setMessages([...messages, data]);
    setContent("");
  } catch (err) {
    console.error("Sending failed", err);
    alert("Something went wrong while sending the message.");
  }
};

 useEffect(() => {
    if (id) {
      fetchMessages();
    }
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="text-center mt-20 text-lg font-medium text-gray-500">
          Loading ticket details...
        </div>
      </Layout>
    );
  }

  if (error || !ticketData) {
    return (
      <Layout>
        <div
          className={`mx-5 md:mx-5 lg:mx-5 transition-all duration-300 ${
            activeMenu ? "lg:pl-75" : "lg:pl-25"
          }`}
        >
          <div className="text-red-500">Error: {error || "Data not available."}</div>
        </div>
      </Layout>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          activeMenu ? "lg:ml-72" : "lg:ml-24"
        }`}
      >
      
        <div className="p-8 mt-6">
          {/* Breadcrumb */}
          <div className="mb-4 text-gray-500 text-sm">
            <span className="font-semibold text-black">Ticket #{ticketData.id}</span> - {ticketData.category}
          </div>

          {/* Ticket Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              <div className="bg-white rounded-xl shadow p-6">
                <div className="font-semibold mb-2">Description</div>
                <div className="text-gray-700">
                  {ticketData.ticket_body}
                </div>
              </div>

              {/* Communication */}
              <div className="bg-white rounded-xl shadow p-6">
                <div className="font-semibold mb-2">Communication</div>
                <div className="space-y-4 max-h-64 overflow-y-auto">
                   

                {(messages || []).map((msg, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                     
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-lg">👩‍💻</span>
                    </div>
                    <div>
                      <div className="font-semibold">{user.name}</div>
                      <div className="text-gray-600 text-sm">{msg.created_at ? new Date(msg.created_at).toLocaleString() : ""}</div>
                      <div className="text-gray-800 mt-1">
                        {msg.content}
                      </div>
                    </div>
                  </div>
                  
                ))}
                </div>
            
                {/* Message Input */}
                <div className="mt-4 flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button 
                  onClick={sendMessage}
                  className="px-4 py-2 bg-[#1D4ED8] text-white rounded-lg hover:bg-[#1E40AF]">
                    Send Message
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar Section */}
            <div className="space-y-6">
              {/* Status Button - now at the top */}
              <div className="flex justify-end">
                <select 
                value={status}
                onChange={(e) => setStatus(e.target.value)} 
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg mr-2 cursor-default">
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Closed">Closed</option>
                    <option value="Open">Open</option>
                </select>
                <button onClick={handleStatusUpdate} className="px-4 py-2 bg-[#1D4ED8] text-white rounded-lg hover:bg-[#1E40AF]">
                  Update Status
                </button>
              </div>
              {/* Timeline */}
              <div className="bg-white rounded-xl shadow p-6">
                <div className="font-semibold mb-2">Timeline</div>
                <ul className="text-gray-700 text-sm space-y-2">
                  <li>
                    <span className="font-semibold">Ticket Created</span>
                    <br />
                    {ticketData.created_at}
                  </li>
                  <li>
                    <span className="font-semibold">First Response</span>
                    <br />
                    Jan 15, 2025 - 11:15 AM
                  </li>
                  <li>
                    <span className="font-semibold">Status Updated</span>
                    <br />
                    Jan 15, 2025 - 2:45 PM
                  </li>
                </ul>
              </div>
              {/* Attachments */}
              <div className="bg-white rounded-xl shadow p-6">
                <div className="font-semibold mb-2">Attachments</div>
                <ul className="text-blue-700 text-sm space-y-2">
                  <li>
                    <a href="#" className="flex items-center gap-2 hover:underline">
                      <span>📄</span> Q4_Balance_Sheet.pdf
                    </a>
                  </li>
                  <li>
                      <div>
                    {imageUrl && (
                      <div className="mt-4">
                        <img src={imageUrl} alt="Ticket attachment" className="rounded-lg shadow" />
                      </div>
                    )}
                  </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
