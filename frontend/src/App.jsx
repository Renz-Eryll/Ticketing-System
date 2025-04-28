import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Dashboard } from "./Pages/admin/Dashboard";
import Agent from "./Pages/admin/Agent";
import Notification from "./Pages/admin/Notification";
import NotificationDetails from "./Pages/admin/NotificationDetails";
import { TicketDetails } from "./Pages/admin/TicketDetails";
import { Tickets } from "./Pages/admin/Tickets";
import { Profile } from "./Pages/admin/Profile";
import { TicketCategories } from "./Pages/admin/TicketCategories";

import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import About from "./Pages/About";
import TermsAndConditions from "./pages/TermsAndConditions";

import AgentDashboard from "./Pages/agent/AgentDashboard";
import AgentTicketdetails from "./Pages/agent/AgentTicketdetails";
import AgentNotification from "./Pages/agent/AgentNotification";
import AgentNotifTicketDetails from "./Pages/agent/AgentNotifTicketDetails";
import { AgentTickets } from "./Pages/agent/Tickets";
import CustomerDashboard from "./Pages/customers/CustomerDasboard";
import CustomerNotification from "./Pages/customers/CustomerNotification";
import CustomerNotifTicketDetails from "./Pages/customers/CustomerNotifTicketDetails";
import Createticket from "./Pages/customers/Createticket";
import GuetsLayout from "./layout/GuestLayout";
import DefaultLayout from "./layout/DefaultLayou";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen bg-gray-100">
        <Navbar />
        <div className="mt-20 md:mt-28 p-4">{children}</div>
      </div>
    </div>
  );
};

function AppRoutes() {
  const location = useLocation();
  const noLayoutRoutes = ["/", "/signup"];
  const isNoLayout = noLayoutRoutes.includes(location.pathname);

  return (
    <Routes>
      <Route path="/" element={<GuetsLayout />}>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      <Route path="/" element={<DefaultLayout />}>
        <Route
          path="/admin/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/admin/agent"
          element={
            <Layout>
              <Agent />
            </Layout>
          }
        />
        <Route
          path="/admin/notification"
          element={
            <Layout>
              <Notification />
            </Layout>
          }
        />
        <Route
          path="/admin/notification/:id"
          element={
            <Layout>
              <NotificationDetails />
            </Layout>
          }
        />
        <Route
          path="/admin/ticketCategories"
          element={
            <Layout>
              {" "}
              <TicketCategories />{" "}
            </Layout>
          }
        />
        <Route
          path="/admin/tickets"
          element={
            <Layout>
              {" "}
              <Tickets />{" "}
            </Layout>
          }
        />
        <Route
          path="/admin/tickets/:id"
          element={
            <Layout>
              {" "}
              <TicketDetails />{" "}
            </Layout>
          }
        />
        <Route
          path="/admin/profile"
          element={
            <Layout>
              {" "}
              <Profile />{" "}
            </Layout>
          }
        />

        <Route
          path="/agent/dashboard"
          element={
            <Layout>
              {" "}
              <AgentDashboard />{" "}
            </Layout>
          }
        />
        <Route
          path="/agent/notification"
          element={
            <Layout>
              {" "}
              <AgentNotification />{" "}
            </Layout>
          }
        />
        <Route
          path="/agent/notification/:id"
          element={
            <Layout>
              <AgentNotifTicketDetails />{" "}
            </Layout>
          }
        />
        <Route
          path="/agent/tickets"
          element={
            <Layout>
              {" "}
              <AgentTickets />
            </Layout>
          }
        />
        <Route
          path="/agent/tickets/:id"
          element={
            <Layout>
              <AgentTicketdetails />{" "}
            </Layout>
          }
        />

        <Route
          path="/customer"
          element={
            <Layout>
              {" "}
              <CustomerDashboard />
            </Layout>
          }
        />
        <Route
          path="/customer/dashboard"
          element={
            <Layout>
              {" "}
              <CustomerDashboard />
            </Layout>
          }
        />
        <Route
          path="/customer/notification"
          element={
            <Layout>
              <CustomerNotification />{" "}
            </Layout>
          }
        />
        <Route
          path="/customer/notification/:id"
          element={
            <Layout>
              {" "}
              <CustomerNotifTicketDetails />{" "}
            </Layout>
          }
        />
        <Route
          path="/customer/create-ticket"
          element={
            <Layout>
              <Createticket />{" "}
            </Layout>
          }
        />
      </Route>

      <Route path="/about" element={<About />} />
      <Route path="/termsAndConditions" element={<TermsAndConditions />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
