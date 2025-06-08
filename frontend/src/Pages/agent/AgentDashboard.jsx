import React, { useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { Navigate, useNavigate } from "react-router-dom";

import {
  MdOutlinePendingActions,
  MdOutlineCheckCircle,
  MdOutlineCancel,
  MdOutlineOpenInNew,
} from "react-icons/md";

import Layout from "../../layout/Layout";
import { useEffect } from "react";

const AgentDashboard = () => {
  const { activeMenu, user, login, token, contextReady } = useStateContext();
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [closedCount, setCloseCount] = useState(0);
  const [resolvedCount, setResolvedCount] = useState(0);
  const [inProgressCount, setInProgressCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!login) {
      navigate("/signin");
    }
    if (!localStorage.getItem("pageReloaded")) {
      localStorage.setItem("pageReloaded", "true");
      window.location.reload();
    }
  }, [login, user, token, navigate]);

  useEffect(() => {
    const fetchTickets = async () => {
      if (user && user.id) {
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
          if (!res.ok)
            throw new Error(data.message || "Failed to fetch tickets");
          setTickets(data.tickets || []);
          setLoading(false);
        } catch (err) {
          setError(err.message || "Failed to fetch tickets");
          setLoading(false);
        }
      }
    };
    fetchTickets();
  }, [contextReady, login, user, token]);

  useEffect(() => {
    const fetchCount = async () => {
      if (!contextReady || !login || !user?.id || !token) return;
      try {
        const [res, res1, res2] = await Promise.all([
          fetch(
            `http://localhost:8000/api/agent/${user.id}/countInProgressTicketsByAgent`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          ),
          fetch(
            `http://localhost:8000/api/agent/${user.id}/resolve-ticket-count`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          ),
          fetch(
            `http://localhost:8000/api/agent/${user.id}/close-ticket-count`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          ),
        ]);

        const [data, data1, data2] = await Promise.all([
          res.json(),
          res1.json(),
          res2.json(),
        ]);

        if (!res.ok)
          throw new Error(data.message || "Failed to fetch open tickets");
        if (!res1.ok)
          throw new Error(data1.message || "Failed to fetch pending tickets");
        if (!res2.ok)
          throw new Error(data2.message || "Failed to fetch resolved tickets");

        setInProgressCount(data);
        setResolvedCount(data1);
        setCloseCount(data2);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch ticket counts");
        setLoading(false);
      }
    };

    fetchCount();
  }, [contextReady, login, user, token]);

  return (
    <Layout>
      <div
        className={`max-h-screen mx-5 lg:mx-0 transition-all ${
          activeMenu ? "lg:pl-72" : "lg:pl-23"
        }`}
      >
        <div className="container mx-auto px-8 py-6">
          <div className="text-3xl font-bold text-[#1D4ED8]">Dashboard</div>
          <div className="text-sm font-semibold text-gray-500">
            Your Control Center
          </div>

          {/* Status Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5 mb-4">
            <div className="bg-white shadow-md rounded-xl p-6 hover:bg-yellow-50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold text-gray-700">
                  In Progress
                </h2>
                <MdOutlinePendingActions className="text-2xl text-yellow-600" />
              </div>
              <p className="text-3xl font-bold text-yellow-600">
                {inProgressCount?.in_progress_ticket_count ?? 0}
              </p>
            </div>
            <div className="bg-white shadow-md rounded-xl p-6 hover:bg-green-50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold text-gray-700">
                  Resolved
                </h2>
                <MdOutlineCheckCircle className="text-2xl text-green-600" />
              </div>
              <p className="text-3xl font-bold text-green-600">
                {resolvedCount?.resolved_ticket_count ?? 0}
              </p>
            </div>
            <div className="bg-white shadow-md rounded-xl p-6 hover:bg-gray-100 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold text-gray-700">Closed</h2>
                <MdOutlineCancel className="text-2xl text-gray-600" />
              </div>
              <p className="text-3xl font-bold text-gray-600">
                {closedCount?.closed_ticket_count ?? 0}
              </p>
            </div>
          </div>

          <div className="text-md font-semibold text-gray-500 mb-2">
            Overview
          </div>
          {/* Ticket List */}
          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Tickets</h2>
            <div className="space-y-4">
              {loading && (
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
              )}
              {error && (
                <p className="text-center text-sm text-red-500">{error}</p>
              )}
              {!loading && tickets.length === 0 && (
                <p className="text-center text-sm text-gray-500">
                  No tickets found.
                </p>
              )}

              {/* Ticket Item */}
              {tickets
                .filter((item) => item && item.id)
                .map((item) => (
                  <div
                    key={item.id}
                    className="border-b border-gray-200 pb-4 last:border-b-0"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {`# ${item.id} ${item.ticket_body}`}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {`Requestor: ${item.customer_name}`}
                        </p>
                        <p className="text-sm text-gray-600">{`Priority: ${item.priority}`}</p>
                      </div>
                      <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2 transition-colors">
                        {item.status}
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AgentDashboard;
