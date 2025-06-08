import React, { useEffect, useRef, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { getNavbarLinks } from "../data/navbarLinks";
import { Link, useNavigate, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import useUser from "../hooks/use-user";
import { FiUser } from "react-icons/fi";
import { FaEdit, FaArrowRight } from "react-icons/fa";
import { MdMenuOpen } from "react-icons/md";
import qtechLogo from "../assets/qtechlogo.png";
const formatTimeAgo = (timestamp) => {
  const now = new Date();
  const time = new Date(timestamp);
  const diffSeconds = Math.floor((now - time) / 1000);

  if (diffSeconds < 60) return `${diffSeconds}s ago`;
  if (diffSeconds < 3600) return `${Math.floor(diffSeconds / 60)}m ago`;
  if (diffSeconds < 86400) return `${Math.floor(diffSeconds / 3600)}h ago`;
  return `${Math.floor(diffSeconds / 86400)}d ago`;
};

const Navbar = () => {
  const { activeMenu, logout, token, user } = useStateContext();
  const userData = useUser();
  const navigate = useNavigate();
  const [navbarLinks, setNavbarLinks] = useState(null);
  const [notifDropdown, setNotifDropdown] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notifLoading, setNotifLoading] = useState(false);
  const [notifError, setNotifError] = useState(null);
  const mobileMenuCloseBtnRef = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifData, setNotifData] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  useEffect(() => {
    if (user) {
      setNavbarLinks(getNavbarLinks(user.role));
    }
  }, [user]);

  useEffect(() => {
    if (!notifDropdown || !token || !user?.id) {
      // Clear notifications & errors when dropdown closes or user/token invalid
      setNotifications([]);
      setNotifError(null);
      setNotifLoading(false);
      return;
    }

    let isMounted = true;

    const fetchNotifications = async () => {
      setNotifLoading(true);
      setNotifError(null);

      try {
        let url = "";
        switch (user.role) {
          case "customer":
            url = `http://localhost:8000/api/customernotif/${user.id}`;
            break;
          case "admin":
            url = "http://localhost:8000/api/allNotifications";
            break;
          case "agent":
            url = `http://localhost:8000/api/agentnotifications/${user.id}`;
            break;
          default:
            throw new Error("Invalid user role");
        }

        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(
            `Failed to fetch notifications: ${res.status} ${res.statusText}`
          );
        }

        const data = await res.json();

        if (isMounted) {
          if (Array.isArray(data)) {
            setNotifications(data);
          } else {
            throw new Error(
              "Unexpected response format: notifications data is not an array"
            );
          }
        }
      } catch (error) {
        if (isMounted) {
          setNotifError(error.message || "Failed to load notifications");
          setNotifications([]);
        }
      } finally {
        if (isMounted) {
          setNotifLoading(false);
        }
      }
    };

    fetchNotifications();

    return () => {
      isMounted = false;
    };
  }, [notifDropdown, token, user]);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure to Logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0D0630",
      cancelButtonColor: "#d33",
      confirmButtonText: "Logout",
    });

    if (result.isConfirmed) {
      await Swal.fire("Logged Out", "See you next time!", "success");
      logout();
      navigate("/signin");
    }
  };

  useEffect(() => {
    const fetchUnreadCount = async () => {
      if (!user || !user.role || !token) return; // ✅ Safe check

      try {
        let countUrl = "";
        switch (user.role) {
          case "customer":
            countUrl = `http://localhost:8000/api/customer-unread-count/${user.id}`;
            break;
          case "admin":
            countUrl = "http://localhost:8000/api/admin-unread-count";
            break;
          case "agent":
            countUrl = `http://localhost:8000/api/unread-count/${user.id}`;
            break;
          default:
            throw new Error("Invalid user role");
        }

        const res = await fetch(countUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        setUnreadCount(data.unread_count);
      } catch (err) {
        console.error("Error fetching unread count:", err);
      }
    };

    fetchUnreadCount();
  }, [token, user]);

  const markNotificationAsRead = async (notifId) => {
    if (!user || !user.role || !token) {
      console.error("Missing user or token");
      return;
    }

    try {
      let countUrl = "";
      switch (user.role) {
        case "customer":
          countUrl = `http://localhost:8000/api/customer-updateNotif/${notifId}`;
          break;
        case "admin":
          countUrl = `http://localhost:8000/api/adminUpdateNotif/${notifId}`;
          break;
        case "agent":
          countUrl = `http://localhost:8000/api/updateNotif/${notifId}`;
          break;
        default:
          throw new Error("Invalid user role");
      }

      const res = await fetch(countUrl, {
        method: "PUT", // <== Important
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ is_read: true }),
      });

      if (!res.ok) {
        const message = await res.text();
        throw new Error(`API error: ${res.status} - ${message}`);
      }

      const updatedNotif = await res.json();
      console.log("Notification marked as read:", updatedNotif);

      setNotifData((prevData) =>
        prevData.map((n) => (n.id === notifId ? { ...n, is_read: true } : n))
      );
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const notifDropdownEl = document.getElementById("notif-dropdown");
      const profileDropdownEl = document.getElementById("profile-dropdown");
      const notifButtonEl = document.getElementById("notif-button");
      const profileButtonEl = document.getElementById("profile-button");

      if (
        notifDropdown &&
        notifDropdownEl &&
        !notifDropdownEl.contains(event.target) &&
        notifButtonEl &&
        !notifButtonEl.contains(event.target)
      ) {
        setNotifDropdown(false);
      }

      if (
        profileDropdown &&
        profileDropdownEl &&
        !profileDropdownEl.contains(event.target) &&
        profileButtonEl &&
        !profileButtonEl.contains(event.target)
      ) {
        setProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [notifDropdown, profileDropdown]);

  const handleNotifClick = (notif) => {
    if (notif.ticket_id) {
      switch (user.role) {
        case "customer":
          navigate(`/customer/notif/${notif.id}`);
          markNotificationAsRead(notif.id);
          break;
        case "admin":
          navigate(`/admin/notif/${notif.id}`);
          markNotificationAsRead(notif.id);
          break;
        case "agent":
          navigate(`/agent/notif/${notif.id}`);
          markNotificationAsRead(notif.id);
          break;
        default:
          setNotifDropdown(false);
      }
    }
  };

  return (
    <div
      className={`fixed top-0 z-30 w-full flex justify-end items-center
    px-4 sm:px-6 py-4
    transition-all duration-300
    ${
      activeMenu
        ? user?.role === "admin" || user?.role === "agent"
          ? "lg:pl-72"
          : "xl:pl-25"
        : "lg:pl-25"
    }
    ${
      user?.role === "customer"
        ? "bg-white text-black shadow-xs"
        : "bg-white text-black shadow-md"
    }
  `}
    >
      <div
        className={`w-full ${
          user?.role === "customer" ? "max-w-7xl mx-auto" : ""
        } flex items-center`}
      >
        {/* Mobile Menu Button */}
        {user?.role === "customer" && (
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-2xl mx-5 lg:hidden flex-2 cursor-pointer"
          >
            <MdMenuOpen className="rotate-180" />
          </button>
        )}

        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-[#08032B] text-white max-w-3/4 z-50 overflow-hidden flex flex-col items-center justify-center gap-6 p-6 transition-all duration-300">
            {navbarLinks?.navLinks &&
              navbarLinks.navLinks.map((link) => (
                <NavLink
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
                </NavLink>
              ))}

            {user?.role === "customer" && (
              <Link
                to="/customer/create-ticket"
                onClick={() => setMobileMenuOpen(false)}
              >
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-md flex items-center justify-center cursor-pointer">
                  <FaEdit className="mr-2" /> Create Ticket
                </button>
              </Link>
            )}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-8 right-8 text-4xl cursor-pointer hover:text-blue-500"
            >
              &times;
            </button>
          </div>
        )}

        {user?.role === "customer" && (
          <div className="flex-2 items-center mx-3.5 xl:mx-0 hidden lg:flex">
            <Link to="/customer/home">
              <img
                src={qtechLogo}
                alt="Qtech Logo"
                className="h-12 cursor-pointer"
              />
            </Link>
          </div>
        )}

        <div className="items-center justify-center flex-3 hidden xl:flex">
          {navbarLinks?.navLinks && (
            <div className="flex items-center gap-10">
              {navbarLinks.navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-md transition ${
                      isActive
                        ? "text-blue-600 font-semibold"
                        : "text-gray-800 hover:text-blue-600"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              {user?.role === "customer" && (
                <div>
                  <Link to="/customer/create-ticket">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2.5 px-4 rounded-lg flex items-center 
                    justify-center cursor-pointer group transition-all duration-400"
                    >
                      Create Ticket
                      <FaArrowRight className="ml-2 transform -rotate-45 transition duration-400 group-hover:rotate-0" />
                    </button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        {navbarLinks && (
          <div
            className={`flex items-center py-3.5 gap-4  ${
              user?.role === "admin" || user?.role === "agent"
                ? "justify-end w-full pr-4"
                : "justify-end lg:justify-start pr-4 lg:pr-20"
            }`}
          >
            {/* Notifications */}
            <div className="relative">
              <button
                className="text-xl text-gray-800 border border-gray-500 rounded-t-full rounded-b-full p-2 hover:bg-gray-100 relative cursor-pointer"
                onClick={() => {
                  setNotifDropdown(!notifDropdown);
                  setProfileDropdown(false);
                }}
              >
                {navbarLinks.notifications.icon}
                {navbarLinks.notifications.count > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                    {unreadCount}
                  </span>
                )}
              </button>
              {notifDropdown && (
                <div
                  id="notif-dropdown"
                  className="absolute right-0 mt-2 w-[26rem] bg-white shadow-lg rounded-lg z-50 p-4"
                  role="menu"
                  aria-label="Notifications"
                >
                  <p className="text-lg font-semibold mb-3 text-blue-600">
                    Notifications
                  </p>
                  {notifLoading ? (
                    <p className="text-gray-500">Loading notifications...</p>
                  ) : notifError ? (
                    <p className="text-red-500">Error: {notifError}</p>
                  ) : notifications.length === 0 ? (
                    <p className="text-gray-500">No notifications available.</p>
                  ) : (
                    <ul className="space-y-3 max-h-80 overflow-y-auto">
                      {notifications.map((notif) => (
                        <li
                          key={notif.id}
                          className="p-3 hover:bg-gray-100 rounded-sm cursor-pointer  relative"
                          onClick={() => handleNotifClick(notif)}
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              handleNotifClick(notif);
                            }
                          }}
                          role="menuitem"
                          aria-label={
                            notif.name
                              ? `${notif.name} posted a ticket`
                              : notif.title
                          }
                        >
                          {!notif.is_read && (
                            <span className="absolute top-0.5 right-1 w-2.5 h-2.5 bg-red-600 rounded-full" />
                          )}

                          <div className=" flex justify-between ">
                            <div className="font-semibold">
                              {notif.name
                                ? `${notif.name} posted a ticket`
                                : notif.title}
                            </div>
                            <div className="text-xs text-gray-500">
                              {formatTimeAgo(notif.created_at)}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                  <Link
                    to={navbarLinks.notifications.path}
                    className="block text-blue-600 mt-3 text-center hover:underline"
                    onClick={() => setNotifDropdown(false)}
                  >
                    See All
                  </Link>
                </div>
              )}
            </div>

            {/* Profile */}
            {user && (
              <div className="relative">
                <button
                  className="text-xl text-gray-800 border border-gray-500 rounded-t-full rounded-b-full p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setProfileDropdown(!profileDropdown);
                    setNotifDropdown(false);
                  }}
                >
                  {user?.username || <FiUser />}
                </button>
                {profileDropdown && (
                  <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg z-50 p-2 cursor-pointer">
                    {navbarLinks.profileMenu.map((item) => {
                      if (item.name === "Logout") {
                        return (
                          <button
                            key={item.name}
                            onClick={handleLogout}
                            className="flex items-center gap-2 w-full px-3 py-2 text-left text-md hover:bg-gray-100 cursor-pointer text-gray-800 mt-4 pt-4 border-t border-gray-200"
                          >
                            <span className="text-lg">{item.icon}</span>
                            <span className="text-md">{item.name}</span>
                          </button>
                        );
                      }

                      return (
                        <Link
                          key={item.name}
                          to={item.path}
                          className="flex items-center gap-2 px-3 py-2 text-md hover:bg-gray-100"
                          onClick={() => setProfileDropdown(false)}
                        >
                          <span className="text-lg">{item.icon}</span>
                          <span className="text-md">{item.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
