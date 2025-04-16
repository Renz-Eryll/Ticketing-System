import { Navigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";

const CustomerDashboard = () => {
  const { activeMenu,user,login,logout } = useStateContext();
  if(!login && !user){
    return <Navigate to ='/'/>
  }
  return (
    <div
      className={`
    mx-5 md:mx-5 lg:mx-5
    transition-all duration-300 
    ${activeMenu ? "lg:pl-75" : "lg:pl-25"}
  `}
    >
      <h1 className="text-xl font-bold">Customer Dashboard</h1>
      <p>Welcome, Customer!</p>
    </div>
  );
};

export default CustomerDashboard;
