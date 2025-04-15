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

/*ADMIN */
import { Dashboard } from "./pages/admin/Dashboard";
import Agent from "./pages/admin/Agent";
import Notification from "./Pages/admin/Notification";
import NotificationDetails from "./Pages/admin/NotificationDetails";
import TicketDetails from "./pages/admin/TicketDetails";
import { Profile } from "./pages/admin/Profile";

import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

/*AGENT */
import AgentDashboard from "./Pages/agent/AgentdashDoard";
import AgentNotification from "./pages/agent/AgentNotification";
import AgentNotifTicketDetails from "./Pages/agent/AgentNotifTicketDetails";
import { Tickets } from "./pages/agent/Tickets";




/*CUSTOMER */
import CustomerDashboard from "./pages/customers/CustomerDasboard";
import CustomerNotification from "./pages/customers/CustomerNotification";
import CustomerNotifTicketDetails from "./Pages/customers/CustomerNotifTicketDetails";
import Createticket from "./pages/customers/Createticket";


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
        path="/admin/NotificationDetails/:id"
        element={
          <Layout>
            <NotificationDetails />
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
      <Route
        path="/agent/notification"
        element={
          <Layout>
            <AgentNotification />
          </Layout>
        }
      />

      <Route
        path="/agent/tickets/notificationDetails/:id"
        element={
          <Layout>
            <AgentNotifTicketDetails/>
          </Layout>
        }
      />
      
      {/* <Route
    path="/agent/create-ticket"
    element={
      <Layout>
        <Createticket /> 
      </Layout>
        }
        />
        
        <Route
    path="/agent/TicketDetails/:id"
  element={
    <Layout>
      <TicketDetails/>
    </Layout>
  }
/> */}

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
        path="/customer/notification"
        element={
          <Layout>
            <CustomerNotification />
          </Layout>
        }
      />
      <Route
        path="/customer/tickets/notificationDetails/:id"
        element={
          <Layout>
            <CustomerNotifTicketDetails />
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
