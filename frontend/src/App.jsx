import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
import { Sidebar } from "./components/Sidebar";
import { Navbar } from "./components/Navbar";
import { Dashboard } from "./pages/admin/Dashboard";
import { Agent } from "./pages/admin/Agent";
import { Tickets } from "./pages/admin/Tickets";
import { Notification } from "./pages/admin/Notification";
import { Profile } from "./pages/admin/Profile";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import AgentDashboard from "./pages/agent/AgentDashboard";
import CustomerDashboard from "./pages/customers/CustomerDasboard";
import Createticket from "./pages/customers/Createticket";
import TicketDetails from "./pages/admin/TicketDetails";

const Layout = ({ children }) => {
  // comment this
  if (import.meta.env.DEV && !localStorage.getItem("user")) {
    localStorage.setItem(
      "user",
      JSON.stringify({ role: "admin", name: "Dev Admin" })
    );
  }
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
      {/* Auth Routes */}
      <Route path="/" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />

      {/* Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <Layout>
            <Dashboard />
          </Layout>
        }
      />
      <Route
        path="/agent"
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
        path="/admin/tickets"
        element={
          <Layout>
            <Tickets />
          </Layout>
        }
      />

      <Route
        path="/admin/tickets/ticketDetails/:id"
        element={
          <Layout>
            <TicketDetails />
          </Layout>
        }
      />
      <Route
        path="/admin/profile"
        element={
          <Layout>
            <Profile />
          </Layout>
        }
      />

      {/* Agent Routes */}
      <Route
        path="/agent/dashboard"
        element={
          <Layout>
            <AgentDashboard />
          </Layout>
        }
      />

      {/* Customer Routes */}
      <Route
        path="/customer/dashboard"
        element={
          <Layout>
            <CustomerDashboard />
          </Layout>
        }
      />
      <Route
        path="/customer/create-ticket"
        element={
          <Layout>
            <Createticket />
          </Layout>
        }
      />
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
