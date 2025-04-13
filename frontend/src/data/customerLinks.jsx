import React from "react";
import {
  MdOutlineDashboard,
  MdSettings,
  MdOutlineLogout,
} from "react-icons/md";
import { FiUser } from "react-icons/fi";

export const customerLinks = [
  {
    title: "Menu",
    links: [
      {
        name: "Dashboard",
        icon: <MdOutlineDashboard />,
        path: "customer/dashboard",
      },
    ],
    linkk: [
      {
        name: "Settings",
        icon: <MdSettings />,
        path: "customer/settings",
      },
      {
        name: "Profile",
        icon: <FiUser />,
        path: "customer/profile",
      },
    ],
  },
];

export const customerLogout = [
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
