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
import { Dashboard } from "./Pages/Dashboard";
import { Agent } from "./pages/Agent";
import { Tickets } from "./pages/Tickets";
import { Notification } from "./pages/Notification";
import { Profile } from "./pages/Profile";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

// Layout wrapper for pages that need Navbar + Sidebar
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
      <Route path="/" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />

      {/* Routes with layout */}
      <Route
        path="/dashboard"
        element={
          <Layout>
            <Dashboard />
          </Layout>
        }
      />
      <Route
        path="/tickets"
        element={
          <Layout>
            <Tickets />
          </Layout>
        }
      />
      <Route
        path="/notification"
        element={
          <Layout>
            <Notification />
          </Layout>
        }
      />
      <Route
        path="/profile"
        element={
          <Layout>
            <Profile />
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
