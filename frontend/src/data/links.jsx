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
    links: [
      {
        title: "Main",
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
        name: "Notification",
        icon: <MdNotificationsNone />,
        path: "/notification",
      },
      {
        name: "Profile",
        icon: <FiUser />,
        path: "/profile",
      },
      {
        name: "Agents",
        icon: <MdOutlineSupportAgent />,
        path: "/agent",
      },
    ],
    linkk: [
      {
        name: "Settings",
        icon: <MdSettings />,
        path: "/settings",
      },
      {
        name: "Logout",
        icon: <MdOutlineLogout />,
        path: "/logout",
      },
    ],
    user: [
      {
        name: "renzeryll09@gmail.com",
        icon: <FiUser />,
        path: "/user",
      },
    ],
  },
];
