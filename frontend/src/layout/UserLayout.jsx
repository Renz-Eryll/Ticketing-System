import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import ScrollToTopButton from "../components/ScrollToTopButton";

const UserLayout = () => {
  return (
    <div className="flex">
      <div className="flex-1 min-h-screen">
        <Navbar />
        <div className="mt-30 md:mt-25 p-0 lg:p-0 bg-white">
          <Outlet />
        </div>
        <ScrollToTopButton />
      </div>
    </div>
  );
};

export default UserLayout;
