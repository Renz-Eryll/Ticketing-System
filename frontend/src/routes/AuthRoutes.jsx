import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import Forgotpass from "../Pages/Forgotpass";
import { Routes, Route } from "react-router-dom";
const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<Forgotpass />} />
    </Routes>
  );
};

export default AuthRoutes;
