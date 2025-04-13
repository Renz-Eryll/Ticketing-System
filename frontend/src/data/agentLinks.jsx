import React from "react";
import {
  MdOutlineDashboard,
  MdNotificationsNone,
  MdSettings,
  MdOutlineLogout,
} from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { TbTicket } from "react-icons/tb";

export const agentLinks = [
  {
    title: "Menu",
    links: [
      {
        name: "Dashboard",
        icon: <MdOutlineDashboard />,
        path: "/agent/dashboard",
      },
    ],
    linkk: [
      {
        name: "Settings",
        icon: <MdSettings />,
        path: "agent/settings",
      },
      {
        name: "Profile",
        icon: <FiUser />,
        path: "agent/profile",
      },
    ],
  },
];

export const agentLogout = [
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
