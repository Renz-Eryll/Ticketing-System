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
import { TicketDetails } from "./pages/admin/TicketDetails";
import { Tickets } from "./pages/admin/Tickets";
import { Profile } from "./pages/admin/Profile";
import { TicketCategories } from "./pages/admin/TicketCategories";

import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

/*AGENT */
import AgentDashboard from "./Pages/agent/AgentdashDoard";
import AgentNotification from "./pages/agent/AgentNotification";
import AgentNotifTicketDetails from "./Pages/agent/AgentNotifTicketDetails";
import AgentTicket from "./Pages/agent/Tickets";
/*CUSTOMER */
import CustomerDashboard from "./pages/customers/CustomerDasboard";
import CustomerNotification from "./pages/customers/CustomerNotification";
import CustomerNotifTicketDetails from "./Pages/customers/CustomerNotifTicketDetails";
import Createticket from "./pages/customers/Createticket";
import GuetsLayout from "./layout/GuetsLayout";
import DefaultLayout from "./layout/DefaultLayout";

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

      <Route path='/' element ={<GuetsLayout/>}>

            <Route path="/" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />

      </Route>


      <Route path='/' element = {<DefaultLayout/>}>

      <Route path="/admin"element={<Layout><Dashboard /></Layout>}/>
      <Route path="/admin/agent" element={<Layout><Agent /></Layout>}/>
      <Route path="/admin/notification"element={<Layout><Notification /></Layout>}/>
      <Route path="/admin/NotificationDetails" element={<Layout><NotificationDetails /></Layout>}/>
      <Route path="/admin/ticketCategories" element={ <Layout> <TicketCategories /> </Layout> } />
      <Route path="/admin/tickets" element={ <Layout> <Tickets /> </Layout>}/>
      <Route path="/admin/tickets/ticketDetails" element={ <Layout> <TicketDetails /> </Layout> } />
      <Route path="/admin/profile" element={ <Layout> <Profile /> </Layout>  }/>

      {/* Agent Routes */}
      <Route path="/agent" element={ <Layout> <AgentDashboard /> </Layout>}/>
      <Route path="/agent/notification" element={ <Layout>  <AgentNotification /> </Layout> }/>
      <Route path="/agent/tickets/notificationDetails" element={ <Layout><AgentNotifTicketDetails /> </Layout>} />
      <Route path="/agent/tikets" element={ <Layout> <AgentTicket /></Layout> } />
      <Route path="/agent/TicketDetails"element={<Layout><TicketDetails/> </Layout>}/> 
      
      {/* Customer Routes */}
      <Route path="/customer" element={<Layout> <CustomerDashboard /></Layout> } />
      <Route path="/customer/notification" element={ <Layout><CustomerNotification /> </Layout> }/>
      <Route path="/customer/tickets/notificationDetails"element={<Layout> <CustomerNotifTicketDetails /> </Layout> }/>
      <Route path="/customer/create-ticket" element={ <Layout><Createticket /> </Layout> } /> 
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
