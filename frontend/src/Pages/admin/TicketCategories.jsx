import React, { useState, useEffect } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate, Navigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import Layout from "../../layout/Layout";
import POS from "../../assets/point-of-sale.png";
import Inventory from "../../assets/inventory.png";
import Utility from "../../assets/utility.png";
import QSA from "../../assets/accounting.png";
import HR from "../../assets/hr.png";

const categories = [
  {
    title: "POS for Retail and F&B",
    icon: (
      <img
        src={POS}
        alt="POS Icon"
        className="max-w-full w-35 h-auto object-contain hover:scale-110 transition-all duration-300"
      />
    ),
    category: "POSRetail",
    description: "Log POS errors, outages, and inquiries.",
    bgColor: "	bg-sky-300",
    textColor: "text-yellow-600",
  },

  {
    title: " Inventory Support System",
    icon: (
      <img
        src={Inventory}
        alt="POS Icon"
        className="max-w-full w-35 h-auto object-contain hover:scale-110 transition-all duration-300"
      />
    ),
    category: "InventorySupport",
    description: "Track stock-related issues and requests.",
    bgColor: "bg-green-300",
    textColor: "text-indigo-600",
  },

  {
    title: "Utility Billing System",
    icon: (
      <img
        src={Utility}
        alt="POS Icon"
        className="max-w-full w-35 h-auto object-contain hover:scale-110 transition-all duration-300"
      />
    ),
    category: "UtilityBilling",
    description: "Billing disputes and system issues.",
    bgColor: "bg-orange-200",
    textColor: "text-sky-600",
  },
  {
    title: "QSA (Quick and Simple Accounting)",
    icon: (
      <img
        src={QSA}
        alt="POS Icon"
        className="max-w-full w-35 h-auto object-contain hover:scale-110 transition-all duration-300"
      />
    ),
    category: "AccountingSystem",
    description: "Tickets for accounting system concerns.",
    bgColor: "bg-red-200",
    textColor: "text-emerald-600",
  },

  {
    title: "Philippine HR, Payroll and Time Keeping System",
    icon: (
      <img
        src={HR}
        alt="POS Icon"
        className="max-w-full w-35 h-auto object-contain hover:scale-110 transition-all duration-300"
      />
    ),
    category: "HRPayrollSystem",
    description: "HR, payroll, and attendance issues.",
    bgColor: "bg-yellow-200",
    textColor: "text-rose-600",
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
    <div
      className={`mx-5 mt-10 md:mt-3 transition-all duration-300 ${
        activeMenu ? "lg:pl-75" : "lg:pl-25"
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-[#1D4ED8]">Categories</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {categories.map((item, index) => (
          <div
            key={index}
            role="button"
            tabIndex={0}
            onClick={() => handleCategoryClick(item.category)}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleCategoryClick(item.category);
            }}
            className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 flex items-center gap-4 min-w-[250px] cursor-pointer hover:shadow-lg transition duration-200"
          >
            <div className="rounded-xl bg-blue-100 p-3">{item.icon}</div>
            <div>
              <div className="text-black font-semibold">{item.title}</div>
              <div className="text-2xl font-extrabold text-black">1000</div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </Layout>
  );
};
