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
      className={`fixed top-0 z-30 w-full bg-transparent transition-all duration-400 ${
        scrolled ? "bg-white shadow-lg" : "text-white"
      }`}
    >
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto px-8 sm:px-13 lg:px-8 py-5">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-2xl lg:hidden cursor-pointer"
        >
          <MdMenuOpen className="rotate-180" />
        </button>

        {/* Logo */}
        <div className="hidden lg:flex items-center">
          <Link to="/customer/home">
            <img
              src={qtechLogo}
              alt="Qtech Logo"
              className="h-12 cursor-pointer"
            />
          </Link>
        </div>
        <div className="hidden xl:flex items-center gap-10"></div>
        <div className="hidden xl:flex items-center gap-10"></div>

        {/* Nav Links */}
        <div className="hidden xl:flex items-center gap-10">
          {publicNavbarLinks.navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`hover:text-blue-400 font-medium transition-all duration-300 ${
                scrolled ? "text-gray-700" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Sign In Button */}
        <div className="flex items-center gap-4">
          <Link to="/signin">
            <button className="bg-blue-500 hover:bg-blue-600 text-white text-md p-2 px-5 rounded-lg flex items-center justify-center cursor-pointer">
              Sign In
            </button>
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
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
            <Link to="/about">About</Link>
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
    </div>
  );
};
