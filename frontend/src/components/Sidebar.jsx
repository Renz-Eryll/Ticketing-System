import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdMenuOpen } from "react-icons/md";
import { links, linkk, logout } from "../data/links";
import { useStateContext } from "../contexts/ContextProvider";

export const Sidebar = () => {
  const { activeMenu, setActiveMenu, screenSize, setScreenSize } =
    useStateContext();
  const location = useLocation();
  const [active, setActive] = useState("");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenSize(width);
      setActiveMenu(width >= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setActiveMenu, setScreenSize]);

  // Highlight link based on current path
  useEffect(() => {
    const currentPath = location.pathname;
    const matchedLink = links
      .flatMap((section) => section.links)
      .find((link) => link.path === currentPath);
    if (matchedLink) {
      setActive(matchedLink.name);
    }
  }, [location]);

  return (
    <>
      {screenSize < 1024 && !activeMenu && (
        <div className="fixed top-5 lg:top-8 md:top-8 left-5 z-50">
          <MdMenuOpen
            className="text-2xl text-[#08032B] mx-3 rotate-180 cursor-pointer"
            onClick={() => setActiveMenu(true)}
          />
        </div>
      )}

      <div
        className={`fixed top-0 left-0 h-screen bg-[#08032B] text-white z-40 transition-all duration-300
        ${
          screenSize < 1024
            ? activeMenu
              ? "w-64"
              : "w-0"
            : activeMenu
            ? "w-72"
            : "w-25"
        }
        overflow-y-auto`}
      >
        <span
          className={`absolute cursor-pointer top-9.5 right-9 z-50 transition-transform ${
            !activeMenu ? "rotate-180 right-9" : ""
          }`}
          onClick={() => setActiveMenu(!activeMenu)}
        >
          <MdMenuOpen className="text-2xl" />
        </span>

        <div className="p-6 pt-8">
          <h1
            className={`origin-left font-bold text-2xl transition-all duration-300 cursor-pointer ${
              !activeMenu ? "scale-0" : ""
            }`}
          >
            Logo
          </h1>
          <div className="mt-6 border-t border-gray-500" />
        </div>
        <div className="mt-10 px-3">
          {links.map((section, index) => (
            <div key={index} className="text-sm p-3 space-y-3">
              {section.title && (
                <h3 className="text-gray-400 uppercase text-xs tracking-wider px-4">
                  {section.title}
                </h3>
              )}
              {section.links.map((link) => (
                <Link
                  to={link.path}
                  key={link.name}
                  onClick={() => {
                    setActive(link.name);
                    if (screenSize < 1024) setActiveMenu(false);
                  }}
                  className={`flex items-center gap-4 px-4 py-2.5 rounded-lg cursor-pointer transition-all duration-300
            ${
              active === link.name
                ? "bg-[#1D4ED8] text-white"
                : "text-white hover:bg-[#1a1445]"
            }
          `}
                >
                  <span className="text-xl">{link.icon}</span>
                  {activeMenu && <span>{link.name}</span>}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-15 px-3">
          {linkk.map((section, index) => (
            <div key={index} className="text-sm p-3 space-y-3">
              {section.title && (
                <h3 className="text-gray-400 uppercase text-xs tracking-wider px-4">
                  {section.title}
                </h3>
              )}
              {section.linkk.map((link) => (
                <Link
                  to={link.path}
                  key={link.name}
                  onClick={() => {
                    setActive(link.name);
                    if (screenSize < 1024) setActiveMenu(false);
                  }}
                  className={`flex items-center gap-4 px-4 py-2.5 rounded-lg cursor-pointer transition-all duration-300
            ${
              active === link.name
                ? "bg-[#1D4ED8] text-white"
                : "text-white hover:bg-[#1a1445]"
            }
          `}
                >
                  <span className="text-xl">{link.icon}</span>
                  {activeMenu && <span>{link.name}</span>}
                </Link>
              ))}
            </div>
          ))}
          <div className="p-3">
            <div className="mt-5 border-t border-gray-500" />
          </div>
          <div className="">
            {logout.map((section, index) => (
              <div key={index} className="text-sm p-3 space-y-3">
                {section.logout.map((link) => (
                  <Link
                    to={link.path}
                    key={link.name}
                    onClick={() => {
                      setActive(link.name);
                      if (screenSize < 1024) setActiveMenu(false);
                    }}
                    className={`flex items-center gap-4 px-4 py-2.5 rounded-lg cursor-pointer transition-all duration-300`}
                  >
                    <span className="text-xl ">{link.icon}</span>
                    {activeMenu && <span>{link.name}</span>}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
