import { BrowserRouter as Router, Routes } from "react-router-dom";
import AdminRoutes from "./AdminRoutes";
import AgentRoutes from "./AgentRoutes";
import CustomerRoutes from "./CustomerRoutes";
import AuthRoutes from "./AuthRoutes";
const AppRoutes = () => {
  return (
    <Router>
      <AuthRoutes />
      <AdminRoutes />
      <AgentRoutes />
      <CustomerRoutes />
    </Router>
  );
};

export default AppRoutes;
