import { Route, Routes } from "react-router-dom";
import TicketDetails from "../pages/admin/TicketDetails";
import { Tickets as AgentTickets } from "../pages/agent/Tickets";
import AgentDashboard from "../Pages/agent/AgentdashDoard";
import AgentNotification from "../pages/agent/AgentNotification";
import AgentNotifTicketDetails from "../Pages/agent/AgentNotifTicketDetails";
import AgentTicketdetails from "../Pages/agent/AgentTicketdetails";
import Layout from "../components/Layout";
const AgentRoutes = () => {
  return (
    <Routes>
      <Route
        path="/agent/dashboard"
        element={
          <Layout>
            <AgentDashboard />
          </Layout>
        }
      />
      <Route
        path="/agent/notification"
        element={
          <Layout>
            <AgentNotification />
          </Layout>
        }
      />

      <Route
        path="/agent/Tickets"
        element={
          <Layout>
            <AgentTickets />
          </Layout>
        }
      />

      <Route
        path="/agent/tickets/notificationDetails/:id"
        element={
          <Layout>
            <AgentNotifTicketDetails />
          </Layout>
        }
      />

      <Route
        path="agent/AgentTicketdetails"
        element={
          <Layout>
            <AgentTicketdetails />
          </Layout>
        }
      />

      <Route
        path="agent/AgentTicketdetails/:id"
        element={
          <Layout>
            <TicketDetails />
          </Layout>
        }
      />
    </Routes>
  );
};

export default AgentRoutes;
