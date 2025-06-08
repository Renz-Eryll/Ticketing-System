import React, { useState, useEffect } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate, Navigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import Layout from "../../layout/Layout";
import POS from "../../assets/pos.jpg";
import Inventory from "../../assets/inventory.jpg";
import Utility from "../../assets/utility.png";
import QSA from "../../assets/accounting.jpg";
import HR from "../../assets/payroll.jpg";

const categories = [
  {
    title: "POS for Retail and F&B",
    iconSrc: POS,
    iconAlt: "POS IMG",
    category: "POSRetail",
    description:
      "Log POS errors, outages, and inquiries as support tickets to monitor, prioritize, and resolve operational concerns.",
  },

  {
    title: " Inventory Support System",
    iconSrc: Inventory,
    iconAlt: "Inventory IMG",
    category: "InventorySupport",
    description:
      "Track tickets for stock-related issues, adjustments, and inventory requests to for smooth operations.",
  },

  {
    title: "Utility Billing System",
    iconSrc: Utility,
    iconAlt: "Utility IMG",
    category: "UtilityBilling",
    description:
      "Handle tickets for customer billing inquiries, disputes, and system malfunctions.",
  },
  {
    title: "QSA (Quick and Simple Accounting)",
    iconSrc: QSA,
    iconAlt: "QSA IMG",
    category: "AccountingSystem",
    description:
      "Handle tickets for accounting discrepancies, errors, and system concerns.",
  },

  {
    title: "Philippine HR, Payroll and Time Keeping System",
    iconSrc: HR,
    iconAlt: "HR IMG",
    category: "HRPayrollSystem",
    description:
      "Resolve tickets for HR management, payroll disputes, and attendance records.",
  },
];

export const TicketCategories = () => {
  const { activeMenu, user, login } = useStateContext();
  const navigate = useNavigate();

  if (!login && !user) {
    return <Navigate to="/" />;
  }

  const handleCategoryClick = (category) => {
    navigate(`/admin/ticketCategories/${category}`);
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
            {categories.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-200 shadow-lg cursor-pointer "
                onClick={() => handleCategoryClick(item.category)}
              >
                <div>
                  <div className="w-auto h-50 rounded-t-xl overflow-hidden relative group">
                    <img
                      src={item.iconSrc}
                      alt={item.iconAlt}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-blue-300 opacity-40 mix-blend-multiply"></div>
                  </div>
                </div>
                <div className="px-9 py-8">
                  <h3 className="text-2xl text-gray-800 font-bold mb-3">
                    {item.title}
                  </h3>
                  <h3 className="text-sm text-gray-500 font-medium mb-2">
                    {item.description}
                  </h3>
                  <div className="mt-5 flex justify-start">
                    <div
                      className="text-white bg-blue-500 hover:bg-blue-600 py-2 px-3 lg:py-2.5 lg:px-3 font-semibold rounded-lg text-sm lg:text-md flex items-center cursor-pointer group transition-all duration-400"
                      onClick={() => handleCategoryClick(item.category)}
                    >
                      <span>View Tickets</span>
                      <FaArrowRight className="ml-2 transform -rotate-45 transition duration-400 group-hover:rotate-0" />
                    </div>
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
