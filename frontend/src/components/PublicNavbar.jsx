import { publicNavbarLinks } from "../data/publicNavbarLinks";
import React, { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { getNavbarLinks } from "../data/navbarLinks";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { MdMenuOpen } from "react-icons/md";
import useUser from "../hooks/use-user";
import { FiUser } from "react-icons/fi";
import { FaEdit } from "react-icons/fa";

import qtechLogo from "../assets/qtechlogo.png";

export const PublicNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { activeMenu } = useStateContext();
  const [navbarLinks, setNavbarLinks] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 z-30 w-full flex justify-end items-center px-4 sm:px-6 py-4 transition-all duration-400
        ${activeMenu ? "lg:pl-35" : "xl:pl-35"}
        ${scrolled ? "bg-white shadow-lg " : "text-white"}
      `}
    >
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="text-2xl mx-5 lg:hidden flex-2 cursor-pointer"
      >
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-[#08032B] text-white max-w-3/4 z-50 overflow-hidden flex flex-col items-center justify-center gap-6 p-6 transition-all duration-300">
            {publicNavbarLinks.navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-lg transition ${
                    isActive
                      ? "text-blue-500 font-semibold"
                      : "text-white hover:text-blue-500 font-semibold"
                  }`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="relative">
              <Link to="/about" className="">
                About
              </Link>
            </div>

            <div className="relative">
              <Link to="/">Sign in</Link>
            </div>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-8 right-8 text-4xl cursor-pointer hover:text-blue-500"
            >
              &times;
            </button>
          </div>
        )}
        <MdMenuOpen className="rotate-180" />
      </button>

      <div className="flex-3 items-center mx-3.5 xl:mx-0 hidden lg:flex">
        <Link to="/customer/home">
          <img
            src={qtechLogo}
            alt="Qtech Logo"
            className="h-14 cursor-pointer"
          />
        </Link>
      </div>

      <div className="items-center justify-center flex-3 hidden xl:flex gap-10">
        {publicNavbarLinks.navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`hover:text-blue-400 font-medium transition-all duration-300  ${
              scrolled ? "text-gray-700" : ""
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div className="mr-8 lg:mr-0 lg:flex-1 items-center gap-4 relative">
        <div className="relative">
          <Link to="/signin">
            <button className="bg-blue-500 hover:bg-blue-600 text-white text-md p-2 px-5 rounded-sm flex items-center justify-center cursor-pointer">
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
