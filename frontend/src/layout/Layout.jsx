import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ScrollToTopButton from "../components/ScrollToTopButton";
import Footer from "../components/Footer";
import DateTime from "../components/DateTime";

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen bg-gray-100">
        <Navbar />

        <div className="mt-23 p-1.5 lg:p-4">{children}</div>
        <Footer />
        <ScrollToTopButton />
      </div>
    </div>
  );
};

export default Layout;
