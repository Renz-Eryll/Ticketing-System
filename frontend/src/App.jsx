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
import TicketDetails from "./Pages/admin/TicketDetails";  // Import as default
import { Tickets } from "./Pages/admin/Tickets";
import { Profile } from "./Pages/admin/Profile";
import { TicketCategories } from "./Pages/admin/TicketCategories";

import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import ForgotPassword from "./Pages/Forgotpass";
import Otp from "./Pages/Otp";
import About from "./Pages/About";
import Communication from './Pages/agent/AgentCommunication';
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
import AdminLayout from "./layout/AdminLayout";
import AgentLayout from "./layout/AgentLayout";
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
        <Route index element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/Otp" element={<Otp/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/Communication" element={<Communication />} />
      <Route path="/agent/Communication" element={<Communication />} />
      <Route path="/customer" element={<DefaultLayout />}>
        <Route path="dashboard" element={<Layout><CustomerDashboard /></Layout>} />
        <Route path="notification" element={<Layout><CustomerNotification /></Layout>} />
        <Route path="tickets/notificationDetails/:id" element={<Layout><CustomerNotifTicketDetails /></Layout>} />
        <Route path="create-ticket" element={<Layout><Createticket /></Layout>} />
      </Route>

      <Route path="/admin" element = {<AdminLayout/>}>
        <Route path="dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="agent" element={<Layout><Agent /></Layout>} />
        <Route path="notification" element={<Layout><Notification /></Layout>} />
        <Route path="notification/:id" element={<Layout><NotificationDetails /></Layout>} />
        <Route path="ticketCategories" element={<Layout><TicketCategories /></Layout>} />
        <Route path="tickets" element={<Layout><Tickets /></Layout>} />
        <Route path="details/:id" element={<Layout><TicketDetails /></Layout>} />
        <Route path="profile" element={<Layout><Profile /></Layout>} />
      </Route>

      <Route path="/agent" element={<AgentLayout />}>
        <Route path="dashboard" element={<Layout><AgentDashboard /></Layout>} />
        <Route path="notification" element={<Layout><AgentNotification /></Layout>} />
        <Route path="notification/:id" element={<Layout><AgentNotifTicketDetails /></Layout>} />
        <Route path="tickets" element={<Layout><AgentTickets /></Layout>} />
        <Route path="tickets/:id" element={<Layout><AgentTicketdetails /></Layout>} />
      </Route>

      

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
