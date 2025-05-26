import React, { useState, useEffect } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import {
  MdOutlineInventory,
  MdBarChart,
  MdOutlinePointOfSale,
  MdAdd,
} from "react-icons/md";
import { RiBillLine } from "react-icons/ri";
import { BsCashCoin } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa";
import Layout from "../../layout/Layout";

const categories = [
  {
    title: "POS for Retail and F&B",
    icon: <MdOutlinePointOfSale />,
    category: "POS Retail",
    description: "Log POS errors, outages, and inquiries.",
    bgColor: "bg-yellow-100",
    textColor: "text-yellow-600",
  },

  {
    title: " Inventory Support System",
    icon: <MdOutlineInventory />,
    category: "Inventory Support",
    description: "Track stock-related issues and requests.",
    bgColor: "bg-indigo-100",
    textColor: "text-indigo-600",
  },

  {
    title: "Qtech Utility Billing System",
    icon: <RiBillLine />,
    category: "Utility Billing",
    description: "Report billing disputes and system issues.",
    bgColor: "bg-sky-100",
    textColor: "text-sky-600",
  },
  {
    title: "QSA (Quick and Simple Accounting)",
    icon: <MdBarChart />,
    category: "Accounting System",
    description: "Raise tickets for accounting system concerns.",
    bgColor: "bg-emerald-100",
    textColor: "text-emerald-600",
  },

  {
    title: "Philippine HR, Payroll and Time Keeping System",
    icon: <BsCashCoin />,
    category: "HR Payroll System",
    description: "Submit HR, payroll, and attendance issues.",
    bgColor: "bg-rose-100",
    textColor: "text-rose-600",
  },
];

export const TicketCategories = () => {
  const { activeMenu, user, login } = useStateContext();
  const navigate = useNavigate();
  const [categoriesList, setCategoriesList] = useState(categories);

  useEffect(() => {
    if (!login || !user) {
      navigate("/");
    }
  }, [login, user, navigate]);

  const handleCategoryClick = (category) => {
    navigate("/admin/tickets", { state: { category } });
  };

  return (
    <Layout>
      <div className={`transition-all ${activeMenu ? "lg:pl-72" : "lg:pl-23"}`}>
        <div className="container px-8 py-6">
          <div className="text-3xl font-bold text-[#1D4ED8] mb-1">
            Ticket Categories
          </div>
          <div className="text-sm font-semibold text-gray-500">
            Manage tickets by category
          </div>
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoriesList.map((item, index) => (
              <div
                key={index}
                className="bg-white px-8 py-7 rounded-lg shadow-sm"
              >
                <div className="flex flex-col items-start">
                  <div
                    className={`flex items-center justify-center w-20 h-20 mb-4 rounded-full ${item.bgColor} ${item.textColor} text-4xl`}
                  >
                    {item.icon}
                  </div>

                  <h3 className="text-2xl text-gray-800 font-bold mb-3">
                    {item.title}
                  </h3>
                  <h3 className="text-sm text-gray-600 font-medium mb-2">
                    {item.description}
                  </h3>
                </div>

                <div className="mt-5 flex justify-end">
                  <div
                    className="text-blue-600 font-semibold hover:underline text-md lg:text-md flex items-center cursor-pointer group transition-all duration-400"
                    onClick={() => handleCategoryClick(item.category)}
                  >
                    <span>View Tickets</span>
                    <FaArrowRight className="ml-2 transform -rotate-45 transition duration-400 group-hover:rotate-0" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};
