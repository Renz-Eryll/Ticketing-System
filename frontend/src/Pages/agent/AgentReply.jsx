import React from "react";
import Sidebar from "../../components/Sidebar";
import { useStateContext } from "../../contexts/ContextProvider";
import Layout from "../../layout/Layout";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar"; 

const AgentReply = () => {
  const { activeMenu, setActiveMenu } = useStateContext();

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
            <span className="font-semibold text-black">Ticket #1234</span> - Balance Sheet Miscalculation
          </div>

          {/* Ticket Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              <div className="bg-white rounded-xl shadow p-6">
                <div className="font-semibold mb-2">Description</div>
                <div className="text-gray-700">
                  The balance sheet calculation shows discrepancies in the Q4 2024 report. Numbers don't match with the actual bank statements and need immediate attention.
                </div>
              </div>

              {/* Communication */}
              <div className="bg-white rounded-xl shadow p-6">
                <div className="font-semibold mb-2">Communication</div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-lg">👤</span>
                    </div>
                    <div>
                      <div className="font-semibold">John Smith</div>
                      <div className="text-gray-600 text-sm">2 hours ago</div>
                      <div className="text-gray-800 mt-1">
                        I've reviewed the calculations and found that the discrepancy might be due to...
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-lg">👩‍💻</span>
                    </div>
                    <div>
                      <div className="font-semibold">Support Team</div>
                      <div className="text-gray-600 text-sm">1 hour ago</div>
                      <div className="text-gray-800 mt-1">
                        Thank you for the detailed explanation. We'll investigate this right away...
                      </div>
                    </div>
                  </div>
                </div>
                {/* Message Input */}
                <div className="mt-4 flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="px-4 py-2 bg-[#1D4ED8] text-white rounded-lg hover:bg-[#1E40AF]">
                    Send Message
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar Section */}
            <div className="space-y-6">
              {/* Status Button - now at the top */}
              <div className="flex justify-end">
                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg mr-2 cursor-default">
                  In Progress
                </button>
                <button className="px-4 py-2 bg-[#1D4ED8] text-white rounded-lg hover:bg-[#1E40AF]">
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
                    Jan 15, 2025 - 10:30 AM
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
                    <a href="#" className="flex items-center gap-2 hover:underline">
                      <span>🖼️</span> Screenshot_Error.png
                    </a>
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

export default AgentReply;
