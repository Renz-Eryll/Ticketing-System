import React from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import {
  MdOutlineInventory,
  MdBarChart,
  MdOutlinePointOfSale,
} from "react-icons/md";
import { RiBillLine } from "react-icons/ri";
import { BsCashCoin } from "react-icons/bs";

const categories = [
  {
    title: "Qtech Inventory Support System",
    icon: <MdOutlineInventory className="text-3xl" />,
    category: "Inventory Support",
  },
  {
    title: "POS for Retail and F&B",
    icon: <MdOutlinePointOfSale className="text-3xl" />,
    category: "POS Retail",
  },
  {
    title: "Qtech Utility Billing System",
    icon: <RiBillLine className="text-3xl" />,
    category: "Utility Billing",
  },
  {
    title: "QSA (Quick and Simple Accounting)",
    icon: <MdBarChart className="text-3xl" />,
    category: "Accounting System",
  },
  {
    title: "Philippine HR, Payroll and Time Keeping System",
    icon: <BsCashCoin className="text-3xl" />,
    category: "HR Payroll System",
  },
];

export const TicketCategories = () => {
  const { activeMenu, user, login } = useStateContext();
  const navigate = useNavigate();

  if (!login && !user) {
    return <navigate to="/" />;
  }

  const handleCategoryClick = (category) => {
    navigate("/admin/tickets", { state: { category } });
  };

  return (
    <div
      className={`mx-5 md:mx-5 lg:mx-5 mt-10 md:mt-3 transition-all duration-300 ${
        activeMenu ? "lg:pl-75" : "lg:pl-25"
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        <div className="text-3xl font-bold text-[#1D4ED8]">Categories</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {categories.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 flex items-center gap-4 min-w-[250px]"
            onClick={() => handleCategoryClick(item.category)}
          >
            <div className="rounded-xl bg-blue-100 p-3">
              {item.icon}
            </div>
            <div>
              <div className="text-black font-semibold">{item.title}</div>
              <div className="text-2xl font-extrabold text-black">1000</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
