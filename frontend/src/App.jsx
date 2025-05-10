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
import StatusPage from './Pages/agent/Agentstatus'; // Renamed for clarity
import AgentDashboard from "./Pages/agent/AgentDashboard";
import AgentTicketdetails from "./Pages/agent/AgentTicketdetails";
import AgentNotification from "./Pages/agent/AgentNotification";
import AgentNotifTicketDetails from "./Pages/agent/AgentNotifTicketDetails";
import { AgentTickets } from "./Pages/agent/Tickets";
import CustomerDashboard from "./Pages/customers/CustomerDasboard";
import CustomerTicket from "./Pages/customers/CustomerTicket";
import CustomerNotification from "./Pages/customers/CustomerNotification";
import CustomerNotifTicketDetails from "./Pages/customers/CustomerNotifTicketDetails";
import Createticket from "./Pages/customers/Createticket";
import GuestLayout from "./layout/GuestLayout";
import AdminLayout from "./layout/AdminLayout";
import AgentLayout from "./layout/AgentLayout";
import UserLayout from "./layout/UserLayout";

import { Toaster } from "react-hot-toast";

function AppRoutes() {
    const location = useLocation();
    const noLayoutRoutes = ["/", "/signup"];
    const isNoLayout = noLayoutRoutes.includes(location.pathname);

    return (
        <Routes>
            <Route path="/" element={<GuestLayout />}>
                <Route index element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
            </Route>
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/Otp" element={<Otp/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/status" element={<StatusPage />} /> {/* Removed duplicate */}

            <Route path="/customer" element={<UserLayout />}> {/* Assuming UserLayout is the correct layout */}
                <Route path="dashboard" element={<CustomerDashboard />} />
                <Route path="tickets" element={<CustomerTicket />} />
                <Route path="notification" element={<CustomerNotification />} />
                <Route path="tickets/notificationDetails/:id" element={<CustomerNotifTicketDetails />} />
                <Route path="create-ticket" element={<Createticket />} />
            </Route>

            <Route path="/admin" element={<AdminLayout />}> {/* Assuming AdminLayout is the correct layout */}
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="agent" element={<><Toaster position="top-right" reverseOrder={false} /><Agent /></>} />
                <Route path="notification" element={<Notification />} />
                <Route path="notification/:id" element={<NotificationDetails />} />
                <Route path="ticketCategories" element={<TicketCategories />} />
                <Route path="tickets" element={<Tickets />} />
                <Route path="details/:id" element={<TicketDetails />} />
                <Route path="profile" element={<Profile />} />
            </Route>

            <Route path="/agent" element={<AgentLayout />}> {/* Assuming AgentLayout is the correct layout */}
                <Route path="dashboard" element={<AgentDashboard />} />
                <Route path="notification" element={<AgentNotification />} />
                <Route path="notification/:id" element={<AgentNotifTicketDetails />} />
                <Route path="tickets" element={<AgentTickets />} />
                <Route path="tickets/:id" element={<AgentTicketdetails />} />
                <Route path="status" element={<StatusPage />} /> {/* Corrected path */}
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