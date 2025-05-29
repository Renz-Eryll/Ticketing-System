import {
  MdNotificationsNone,
  MdOutlineLogout,
  MdInfoOutline,
} from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { FaFileContract } from "react-icons/fa6";
import { FaInfoCircle } from "react-icons/fa";
import { GoFile } from "react-icons/go";

export const getNavbarLinks = (userRole) => {
  if (!userRole) return null;

  switch (userRole) {
    case "admin":
      return {
        notifications: {
          icon: <MdNotificationsNone />,
          path: "/admin/notification",
          count: 2,
        },
        profileMenu: [
          {
            name: "Profile",
            icon: <FiUser />,
            path: "/admin/profile",
          },

          /* DI PA TO WORKING*/
          {
            name: "Terms and Conditions",
            icon: <GoFile />,
            path: "/terms-and-conditions",
          },

          {
            name: "Logout",
            icon: <MdOutlineLogout />,
            path: null,
          },
        ],
      };

    case "agent":
      return {
        notifications: {
          icon: <MdNotificationsNone />,
          path: "/agent/notification",
          count: 4,
        },
        profileMenu: [
          {
            name: "Terms and Conditions",
            icon: <GoFile />,
            path: "/terms-and-conditions",
          },
          {
            name: "Logout",
            icon: <MdOutlineLogout />,
            path: null,
          },
        ],
      };

    case "customer":
      return {
        navLinks: [
          {
            name: "Home",
            path: "/customer/home",
          },
          {
            name: "Tickes",
            path: "/customer/tickes",
          },
          {
            name: "FAQs",
            path: "/",
          },
          {
            name: "Contact Us",
            path: "/customer/contact-us",
          },
        ],
        notifications: {
          icon: <MdNotificationsNone />,
          path: "/customer/notification",
          count: 2,
        },
        profileMenu: [
          {
            name: "About Us",
            icon: <MdInfoOutline />,
            path: "/About",
          },
          {
            name: "Terms and Conditions",
            icon: <GoFile />,
            path: "/terms-and-conditions",
          },
          {
            name: "Logout",
            icon: <MdOutlineLogout />,
            path: null,
          },
        ],
      };

    default:
      return null;
  }
};
