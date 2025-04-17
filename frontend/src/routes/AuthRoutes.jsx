import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import { Routes, Route } from "react-router-dom";
const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default AuthRoutes;
