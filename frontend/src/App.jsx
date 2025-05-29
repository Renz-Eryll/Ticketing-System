import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { useState, useEffect } from "react";

import { Dashboard } from "./Pages/admin/Dashboard";
import Agent from "./Pages/admin/Agent";
import Notification from "./Pages/admin/Notification";
import NotificationDetails from "./Pages/admin/NotificationDetails";
import TicketDetails from "./Pages/admin/TicketDetails"; // Import as default
import { Tickets } from "./Pages/admin/Tickets";
import { Profile } from "./Pages/admin/Profile";
import { TicketCategories } from "./Pages/admin/TicketCategories";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import ForgotPassword from "./Pages/Forgotpass";
import Otp from "./Pages/Otp";
import About from "./Pages/About";
import Home from "./Pages/customers/Home";
import StatusPage from "./Pages/agent/Agentstatus"; // Renamed for clarity
import AgentDashboard from "./Pages/agent/AgentDashboard";
import AgentTicketdetails from "./Pages/agent/AgentTicketdetails";
import AgentNotification from "./Pages/agent/AgentNotification";
import AgentNotifTicketDetails from "./Pages/agent/AgentNotifTicketDetails";
import AgentTickets from "./Pages/agent/Tickets";
import CustomerTicket from "./Pages/customers/Tickets";
import CustomerNotification from "./Pages/customers/CustomerNotification";
import CustomerNotifTicketDetails from "./Pages/customers/CustomerNotifTicketDetails";
import Createticket from "./Pages/customers/Createticket";
import ResetPassword from "./Pages/ResetPassword";
import GuestLayout from "./layout/GuestLayout";
import DefaultLayout from "./layout/DefaultLayout";
import AdminLayout from "./layout/AdminLayout";
import AgentLayout from "./layout/AgentLayout";
import Layout from "./layout/Layout";
import UserLayout from "./layout/UserLayout";
import { NotFound } from "./Pages/NotFound";
import LandingPage from "./Pages/LandingPage";
import TermsAndConditions from "./Pages/TermsAndConditions";


import { Toaster } from "react-hot-toast";


import { HRPayrollSystem } from "./Pages/admin/HRPayrollSystem";
import { UtilityBilling } from "./Pages/admin/UtilityBilling";
import { AccountingSystem } from "./Pages/admin/AccountingSystem";
import { CustomerReply } from "./Pages/customers/CustomerReply";
import { PosRetail } from "./Pages/admin/PosRetail";
import {InventorySupport} from "./Pages/admin/InventorySupport";
import AgentReply from "./Pages/agent/AgentReply";

function AppRoutes() {
  const location = useLocation();
  const noLayoutRoutes = ["/", "/signup"];
  const isNoLayout = noLayoutRoutes.includes(location.pathname);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
    <Routes>
      {/* Guest Routes */}
        <Route path="/" element={<GuestLayout />}>
          <Route index element={<LandingPage />} />

          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/terms-and-conditions"
            element={<TermsAndConditions />}
          />
        </Route>

      {/* Standalone Public Pages */}
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/Otp" element={<Otp />} />
      <Route path="/about" element={<About />} />

      {/* Customer Routes */}
      <Route path="/customer" element={<UserLayout/>}>
          <Route path="home" element={<Home />} />
          <Route path="/customer/tickes" element={<CustomerTicket />} />
          <Route path="notification" element={<CustomerNotification />} />
          <Route path="tickets/notificationDetails/:id" element={<CustomerNotifTicketDetails />}/>
          <Route path="create-ticket" element={<Createticket />} />
          <Route path="tickets/:id" element={<CustomerReply/>} />
      </Route>

      {/* Admin Routes */}

      
      <Route path="/admin" element={<AdminLayout />}>

          <Route path="dashboard" element={<Dashboard />} />
          <Route path="agent"element={ <> <Toaster position="top-right" reverseOrder={false} /> <Agent /> </> }/>
          <Route path="notification" element={<Notification />} />
          <Route path="notification/:id" element={<NotificationDetails />} />
          <Route path="ticketCategories" element={<TicketCategories />} />
          <Route path="tickets" element={<Tickets />} />
          <Route path="details/:id" element={<TicketDetails />} />
          <Route path="profile" element={<Profile />} />
        
        <Route path="ticketCategories/PosRetail" element={<Layout><PosRetail/></Layout>} />
        <Route path="ticketCategories/InventorySupport" element={<Layout><InventorySupport/></Layout>} />
        <Route path="ticketCategories/HRPayrollSystem" element={<Layout><HRPayrollSystem/></Layout>} />
        <Route path="ticketCategories/UtilityBilling" element={<Layout><UtilityBilling/></Layout>} />
        <Route path="ticketCategories/AccountingSystem" element={<Layout><AccountingSystem/></Layout>} />
      </Route>

      {/* Agent Routes */}
      <Route path="/agent" element={<AgentLayout />}>
       <Route path="dashboard" element={<AgentDashboard />} />
          <Route path="notification" element={<AgentNotification />} />
          <Route path="notification/:id"element={<AgentNotifTicketDetails />}/>
          <Route path="tickets" element={<AgentTickets />} />
          <Route path="tickets/:id" element={<AgentReply/>} />
          <Route path="status" element={<StatusPage />} />{" "}
          {/* Corrected path */}
        </Route><Route path="*" element={<NotFound />} />
    </Routes>
    </>
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
