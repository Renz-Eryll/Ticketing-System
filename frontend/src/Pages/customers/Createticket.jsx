import React, { useRef, useState, useEffect } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { Navigate, useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import toast from "react-hot-toast";

const Createticket = () => {
  const { activeMenu, user, login, token } = useStateContext();
  const fileRef = useRef();
  const imageRef = useRef();
  const [preview, setPreview] = useState(null);
  const [category, setCategory] = useState("");
  const [email, setEmail] = useState("");
  const [ticketBody, setTicketBody] = useState("");
  const [image_path, setImage_path] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.email) {
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setLoading(true); // start loading
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("category", category);
      formData.append("ticket_body", ticketBody);
      formData.append("user_id", user.id);
      formData.append("customer_name", user.name);

      if (fileRef.current && fileRef.current.files[0]) {
        formData.append("image_path", fileRef.current.files[0]);
      }

      const response = await fetch("http://localhost:8000/api/tickets", {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
        credentials: "include",
      });

      const result = await response.json();

      const notifRes = await fetch("http://localhost:8000/api/notification", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ticket_id: result.ticket.id,
          name: result.ticket.customer_name,
          title: "New Ticket",
          message: "A new ticket has been submitted.",
        }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(result.message || "Failed to create ticket.");
      }

      toast.success("Ticket created successfully!");

      // Clear form
      setCategory("");
      setTicketBody("");
      setPreview(null);
      fileRef.current.value = "";
    } catch (error) {
      console.error(error);
      toast.error("Error creating ticket. Please try again.");
    } finally {
      setLoading(false); // stop loading
    }
  };

  const handleUploadfile = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const handleFileChange = (ev) => {
    const file = ev.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setImage_path(file.name);
    }
  };

  // Redirect if not logged in
  if (!login && !user?.id) {
    return <Navigate to="/" />;
  }

  return (
    <div className={`mx-5 md:mx-5 lg:mx-5 transition-all duration-300 `}>
      <main className=" max-w-7xl mx-auto px-4 sm:px-10 lg:px-8 mt-35 lg:mt-35 mb-5">
        <div className="text-3xl font-bold text-[#1D4ED8] ">Create Tickets</div>
        <div className="bg-white mt-5 p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-1">Create Quick Ticket</h2>
          <p className="text-gray-400 mb-4">
            Write and address new queries and issues
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block mb-1 text-sm font-medium text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Type Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded-md focus:outline-none"
                />
              </div>
              <div className="flex-1">
                <label className="block mb-1 text-sm font-medium text-gray-600">
                  Categories
                </label>
                <select
                  className="w-full border border-gray-300 p-2 rounded-md focus:outline-none"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Choose Type</option>
                  <option>QTech Inventory Support System</option>
                  <option>QTech Utility Billing System</option>
                  <option>
                    Philippine HR, Payroll and Time Keeping System
                  </option>
                  <option>POS for Retail and F&B</option>
                  <option>QSA (Quick and Single Accounting)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block mb-1 text-sm font-semibold">
                Ticket Body
              </label>
              <textarea
                placeholder="Type ticket issue here.."
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none"
                rows={5}
                value={ticketBody}
                onChange={(e) => setTicketBody(e.target.value)}
              ></textarea>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-600">
                Upload Photo
              </label>
              <div
                onClick={handleUploadfile}
                className="border border-dashed border-gray-300 p-5 flex flex-col items-center justify-center rounded-md cursor-pointer hover:bg-gray-50 transition"
              >
                <input
                  onChange={handleFileChange}
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                />

                {/* Display Image Preview */}
                {preview ? (
                  <img
                    ref={imageRef}
                    alt="Preview"
                    src={preview}
                    className="max-w-xs max-h-60 object-contain mb-2"
                  />
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-gray-400 mb-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4-4m0 0l-4 4m4-4v12"
                      />
                    </svg>
                    <p className="text-gray-400">Upload an image</p>
                  </>
                )}
              </div>
            </div>

            <div className="text-right">
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Ticket"}
              </button>
            </div>

            {loading && <div className="loading-line"></div>}
          </form>
        </div>
      </main>
    </div>
  );
};

export default Createticket;
