import React from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

export const TicketCategories = () => {
  const { activeMenu } = useStateContext();
  const navigate = useNavigate();

  return (
    <div
      className={`
      mx-5 md:mx-5 lg:mx-5
      transition-all duration-300 
      ${activeMenu ? "lg:pl-75" : "lg:pl-25"}
    `}
    >
      <div className="flex gap-2">
        <div className="text-3xl font-bold text-[#1D4ED8]">Categories</div>
        <div>
          <IoMdArrowBack
            className="text-4xl cursor-pointer rotate-180"
            onClick={() => navigate("/admin/tickets")}
          />
        </div>
      </div>

      <div className="mt-15 px-20">
        <div className="flex flex-col md:flex-row gap-10 w-full justify-between">
          <div className="w-full md:w-1/2 max-w-md flex flex-col gap-7">
            <div className="bg-[#08032B] text-white p-6 shadow w-full hover:bg-[#08032B]/90 cursor-pointer transition-all duration-300">
              Qtech Inventory Support System
            </div>
            <div className="bg-[#08032B] text-white p-6  shadow w-full hover:bg-[#08032B]/90 cursor-pointer transition-all duration-300">
              Qtech Utility Billing System
            </div>
            <div className="bg-[#08032B] text-white p-6  shadow w-full hover:bg-[#08032B]/90 cursor-pointer transition-all duration-300">
              Philippine HR, Payroll and Time Keeping System
            </div>
          </div>

          <div className="-full md:w-1/2 max-w-md flex flex-col gap-7 justify-center">
            <div className="bg-[#08032B] text-white p-6  shadow w-full text-center hover:bg-[#08032B]/90 cursor-pointer transition-all duration-300">
              POS for Retail and F&B
            </div>
            <div className="bg-[#08032B] text-white p-6  shadow w-full text-center hover:bg-[#08032B]/90 cursor-pointer transition-all duration-300">
              qSA (Quick and Simple Accounting)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
