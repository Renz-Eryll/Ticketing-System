import React from "react";
import { MdOutlineSearch } from "react-icons/md";
import { useStateContext } from "../contexts/ContextProvider";

export const Navbar = () => {
  const { activeMenu } = useStateContext();

  return (
    <div
      className={`
    fixed top-0 z-30 bg-white shadow-md w-full flex justify-between items-center 
    px-4 sm:px-6 py-8 md:py-7
    transition-all duration-300 
    ${activeMenu ? "lg:pl-72" : "lg:pl-20"}
  `}
    >
      <h1 className="text-xl font-semibold"></h1>
      <div className="hidden md:flex mx-2 lg:mx-2 md:mx-0 px-2 md:px-4 items-center gap-3">
        <form action="" className="w-full max-w-md">
          <div className="relative flex item-center text-gray-400 focus-within:text-gray-400">
            <MdOutlineSearch className="w-5 h-5 absolute mt-1.5 ml-3 pointer-events-none" />
            <input
              name="search"
              type="search"
              placeholder="Search keyword..."
              aria-label="Search"
              className="pl-10 w-full py-2 placeholder-gray-400 text-xs outline-1 outline-gray-400 rounded-md"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
