import React from "react";
import {
  MdOutlineDashboard,
  MdNotificationsNone,
  MdOutlineSupportAgent,
  MdSettings,
  MdOutlineLogout,
} from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { TbTicket } from "react-icons/tb";

export const links = [
  {
    title: "Menu",
    links: [
      {
        name: "Dashboard",
        icon: <MdOutlineDashboard />,
        path: "/dashboard",
      },

      {
        name: "Tickets",
        icon: <TbTicket />,
        path: "/tickets",
      },
      {
        name: "Agents",
        icon: <MdOutlineSupportAgent />,
        path: "/agent",
      },
      {
        name: "Notification",
        icon: <MdNotificationsNone />,
        path: "/notification",
      },
    ],
    linkk: [
      {
        name: "Settings",
        icon: <MdSettings />,
        path: "/settings",
      },
      {
        name: "Profile",
        icon: <FiUser />,
        path: "/profile",
      },
    ],
  },
];

export const linkk = [
  {
    title: "Settings",
    linkk: [
      {
        name: "Settings",
        icon: <MdSettings />,
        path: "/settings",
      },
      {
        name: "Profile",
        icon: <FiUser />,
        path: "/profile",
      },
    ],
  },
];

export const logout = [
  {
    logout: [
      {
        name: "Logout",
        icon: <MdOutlineLogout />,
        path: "/logout",
      },
    ],
  },
];
