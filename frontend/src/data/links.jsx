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

export const sidebarlinks = [
  {
    title: "Menu",
    links: [
      {
        name: "Dashboard",
        icon: <MdOutlineDashboard />,
        path: "/admin/dashboard",
      },
      {
        name: "Tickets",
        icon: <TbTicket />,
        path: "/admin/tickets",
      },
      {
        name: "Agents",
        icon: <MdOutlineSupportAgent />,
        path: "/agent",
      },
      {
        name: "Notification",
        icon: <MdNotificationsNone />,
        path: "/admin/notification",
      },
    ],
  },
];

export const settingLink = [
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
        path: "/admin/profile",
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
