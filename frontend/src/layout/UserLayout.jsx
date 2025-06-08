import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import ScrollToTopButton from "../components/ScrollToTopButton";
import Footer from "../components/Footer";

const UserLayout = () => {
  const location = useLocation();
  const hideFooterPaths = ["/customer/home", "/contact-us"];
  const hideFooter = hideFooterPaths.includes(location.pathname);

  return (
    <div className="flex">
      <div className="flex-1 min-h-screen bg-gray-100">
        <Navbar />
        <div className="mt-0 md:mt-25 p-2 lg:p-0 ">
          <Outlet />
        </div>
        {!hideFooter && <Footer />}
        <ScrollToTopButton />
      </div>
    </div>
  );
};

export default UserLayout;
