import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { useStateContext } from "../../contexts/ContextProvider";
import Layout from "../../layout/Layout";
import toast from "react-hot-toast";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  BadgeCheck,
  User,
  Calendar,
  FileText,
  Paperclip,
  CircleAlert,
  UserCheck,
  Clock4,
  UploadCloud,
} from "lucide-react";
import { IoMdArrowBack } from "react-icons/io";
import Navbar from "../../components/Navbar";

const AgentReply = () => {
  const { activeMenu, user, login, token } = useStateContext();
  const { id } = useParams();
  const [ticketData, setTicketData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [loadingStatus, setLoadingStatus] = React.useState(false);

  if (!login && !user?.id) {
    return <Navigate to="/" />;
  }

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000); // seconds

    if (diff < 60) return `${diff} seconds ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return `${Math.floor(diff / 86400)} days ago`;
  };

  useEffect(() => {
    const fetchTicket = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:8000/api/ticket/${id}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch ticket");
        setTicketData(data);
        setStatus(data.status || "Open");
        setImageUrl(data.image_path);
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
    setLoadingStatus(true);
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
            message: `Your tickets is ${data.status}`,
          }),
          credentials: "include",
        }
      );

      setTicketData((prev) => ({ ...prev, status }));
      toast.success("Status updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    } finally {
      setLoadingStatus(false);
    }
  };

  if (!login && !user) {
    navigate("/");
    return null;
  }

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
          receiver_id: ticketData.user_id,
          customer_ticket_id: ticketData.id,
          sender_id: ticketData.agent_id,
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
            title: "New message",
            message: data.content,
          }),
          credentials: "include",
        }
      );

      setMessages([...messages, data]);
      setContent("");
    } catch (err) {
      console.error("Sending failed", err);
      alert("Something went wrong while sending the message.");
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true); // Optional: you can set a separate loading state for messages
      try {
        const res = await fetch(`http://localhost:8000/api/messages/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (!res.ok)
          throw new Error(data.message || "Failed to fetch messages");

        setMessages(data);
      } catch (err) {
        console.error("Error fetching messages", err);
        setError("Failed to fetch messages.");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [id, token]);

  if (loading) {
    return (
      <Layout>
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
          <div className="text-red-500">
            Error: {error || "Data not available."}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={`transition-all ${activeMenu ? "lg:pl-72" : "lg:pl-23"}`}>
        <div className="container px-8 py-6">
          <div className="flex gap-4">
            <IoMdArrowBack
              className="text-4xl cursor-pointer"
              onClick={() => navigate(-1)}
            />
            <div className="text-3xl font-bold text-[#1D4ED8]">
              Ticket Details
            </div>
          </div>

          <div className="max-w mt-8 p-8 border border-gray-100 shadow-sm rounded-xl bg-white min-h-[430px]">
            <div className="p-6 text-gray-500 text-lg">
              <span className="font-semibold text-gray-800">
                Ticket #{ticketData.id}
              </span>{" "}
              - {ticketData.category}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Description */}
                <div className="shadow-sm rounded-lg p-8 space-y-2">
                  <div className="flex items-center gap-2 text-gray-500 text-md font-semibold mb-2">
                    <FileText className="h-4 w-4" />
                    Description
                  </div>
                  <div className="text-gray-800">{ticketData.ticket_body}</div>
                </div>

                {/* Communication */}
                <div className="shadow-sm rounded-lg p-8">
                  <div className="flex items-center gap-2 text-gray-500 text-md font-semibold mb-2">
                    <BadgeCheck className="h-4 w-4" />
                    Communication
                  </div>

                  <div className="space-y-4 max-h-64 overflow-y-auto">
                    {(messages || []).map((msg, idx) => {
                      const isOwnMessage = msg.sender_id === user.id;
                      const senderName = isOwnMessage
                        ? "You"
                        : msg.sender_name || "Agent";
                      const avatarIcon = isOwnMessage
                        ? "👩‍💻"
                        : msg.sender_name?.charAt(0).toUpperCase() || "👤";
                      const formattedTime = msg.created_at
                        ? formatTimeAgo(msg.created_at).toLocaleString()
                        : "";

                      return (
                        <div
                          key={idx}
                          className={`flex items-start gap-3 mb-4 ${
                            isOwnMessage ? "justify-end" : "justify-start"
                          }`}
                        >
                          {!isOwnMessage && (
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold">
                              <span>{avatarIcon}</span>
                            </div>
                          )}
                          <div
                            className={`max-w-xs p-3 rounded-lg ${
                              isOwnMessage
                                ? "bg-blue-100 text-right"
                                : "bg-gray-100"
                            }`}
                          >
                            <div className="font-semibold text-sm">
                              {senderName}
                            </div>
                            <div className="text-gray-500 text-xs">
                              {formattedTime}
                            </div>
                            <div className="text-gray-800 mt-1 break-words">
                              {msg.content}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Message Input */}
                  <div className="mt-4 flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="w-full border text-sm rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                      onClick={sendMessage}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>

              {/* Sidebar Section */}
              <div className="space-y-6">
                {/* Status */}
                <div className="p-3 flex gap-2">
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-48 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  >
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Closed">Closed</option>
                    <option value="Open">Open</option>
                  </select>
                  <button
                    onClick={handleStatusUpdate}
                    disabled={loadingStatus}
                    className={`px-4 py-2 text-white text-sm rounded-lg ${
                      loadingStatus
                        ? "bg-green-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {loadingStatus ? "Updating..." : "Update"}
                  </button>
                </div>

                {/* Timeline */}
                <div className="shadow-sm rounded-lg p-6">
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
                </div>

                {/* Attachments */}
                <div className="shadow-sm rounded-lg p-6">
                  <div className="flex items-center gap-2 text-gray-500 text-sm font-semibold mb-2">
                    <UploadCloud className="h-4 w-4" />
                    Attachments
                  </div>
                  <ul className="text-blue-700 text-sm space-y-2">
                    <li>
                      <a
                        href="#"
                        className="flex items-center gap-2 hover:underline"
                      >
                        <Paperclip className="h-4 w-4" /> Q4_Balance_Sheet.pdf
                      </a>
                    </li>
                    {imageUrl && (
                      <li>
                        <div className="mt-4">
                          <img
                            src={imageUrl}
                            alt="Ticket attachment"
                            className="rounded-lg shadow"
                          />
                        </div>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AgentReply;
