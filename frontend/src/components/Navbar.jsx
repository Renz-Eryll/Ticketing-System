import React, { useEffect, useRef, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { getNavbarLinks } from "../data/navbarLinks";
import { Link, useNavigate, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import useUser from "../hooks/use-user";
import { FiUser } from "react-icons/fi";
import { FaEdit } from "react-icons/fa";

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
            url = `http://localhost:8000/api/Customernotifications/${user.id}`;
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
          throw new Error(`Failed to fetch notifications: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();

        if (isMounted) {
          if (Array.isArray(data)) {
            setNotifications(data);
          } else {
            throw new Error("Unexpected response format: notifications data is not an array");
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
      navigate(`/ticket/${notif.ticket_id}`);
      setNotifDropdown(false);
    }
  };

  return (
    <div
      className={`fixed top-0 z-30 w-full flex justify-end items-center
        px-4 sm:px-6 py-4 transition-all duration-300
        ${
          activeMenu
            ? user?.role === "admin" || user?.role === "agent"
              ? "lg:pl-72"
              : "xl:pl-35"
            : "lg:pl-25"
        }
        ${
          user?.role === "customer"
            ? "bg-white text-black shadow-xs"
            : "bg-white text-black shadow-md"
        }`}
    >
      {navbarLinks && (
        <div
          className={`flex items-center py-3.5 gap-4 relative ${
            user?.role === "admin" || user?.role === "agent"
              ? "right-4"
              : "right-4 lg:right-28"
          }`}
        >
          {/* Notifications */}
          <div className="relative">
            <button
              id="notif-button"
              className="text-xl text-gray-800 border border-gray-500 rounded-full p-2 hover:bg-gray-100 relative"
              onClick={() => {
                setNotifDropdown((prev) => !prev);
                setProfileDropdown(false);
              }}
              aria-haspopup="true"
              aria-expanded={notifDropdown}
              aria-controls="notif-dropdown"
            >
              {navbarLinks.notifications.icon}
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {notifications.length}
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
                <p className="text-lg font-semibold mb-3 text-blue-600">Notifications</p>
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
                        className="p-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
                        onClick={() => handleNotifClick(notif)}
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            handleNotifClick(notif);
                          }
                        }}
                        role="menuitem"
                        aria-label={notif.name ? `${notif.name} posted a ticket` : notif.title}
                      >
                        <div className="font-semibold">
                          {notif.name ? `${notif.name} posted a ticket` : notif.title}
                        </div>
                        <div className="text-xs text-gray-500">
                          {formatTimeAgo(notif.created_at)}
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

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              id="profile-button"
              className="text-xl text-gray-800 border border-gray-500 rounded-full p-2 hover:bg-gray-100"
              onClick={() => {
                setProfileDropdown((prev) => !prev);
                setNotifDropdown(false);
              }}
              aria-haspopup="true"
              aria-expanded={profileDropdown}
              aria-controls="profile-dropdown"
            >
              <FiUser />
            </button>
            {profileDropdown && (
              <div
                id="profile-dropdown"
                className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-50 p-4"
                role="menu"
                aria-label="Profile Menu"
              >
                <p className="text-sm font-medium text-gray-800 mb-2">
                  {user?.name}
                </p>
                <Link
                  to="/profile/edit"
                  className="flex items-center gap-1 text-gray-700 hover:text-blue-600 mb-2"
                  onClick={() => setProfileDropdown(false)}
                >
                  <FaEdit /> Edit Profile
                </Link>
                <button
                  className="w-full text-left text-red-600 hover:text-red-800"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
