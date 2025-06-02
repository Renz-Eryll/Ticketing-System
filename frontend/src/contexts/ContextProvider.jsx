import React, { createContext, useContext, useState } from "react";

const StateContext = createContext({
  user: null,
  token: null,
  activeMenu: true,
  setActiveMenu: () => {},
  screenSize: undefined,
  setScreenSize: () => {},
});

export const ContextProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [contextReady, setContextReady] = useState(false);

  // Load user and token from localStorage when context initializes
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser || storedUser === "undefined" || storedUser === "null") {
        return null;
      }
      return JSON.parse(storedUser);
    } catch (error) {
      console.error("Failed to parse stored user:", error);
      localStorage.removeItem("user"); // Clean up bad data
      return null;
    }
  });

  const [currentCategory, setCurrentCategory] = useState(null);
  const [token, setToken] = useState(() => {
    try {
      const storedToken = localStorage.getItem("token");
      if (
        storedToken === "undefined" ||
        storedToken === "null" ||
        !storedToken
      ) {
        return null;
      }
      return storedToken;
    } catch (error) {
      console.error("Error loading context from localStorage:", error);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    } finally {
      setContextReady(true); // Mark as ready after trying
    }
  }, []);

  const login = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("readTicketIds");
    localStorage.removeItem("readNotificationIds");
  };

  // Tickets state
  const [tickets, setTickets] = useState([]);
  const [readTicketIds, setReadTicketIds] = useState(() => {
    return JSON.parse(localStorage.getItem("readTicketIds") || "[]");
  });

  // Notifications state
  const [notifications, setNotifications] = useState([]);
  const [readNotificationIds, setReadNotificationIds] = useState(() => {
    return JSON.parse(localStorage.getItem("readNotificationIds") || "[]");
  });

  // Keep previous tickets for diffing on fetch
  const prevTicketsRef = useRef([]);

  // Utility: generate unique notification IDs
  const generateNotificationId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  // Detect changes to tickets and create notifications
  const detectTicketChangesAndNotify = (oldTickets, newTickets) => {
    const newNotifs = [];

    const oldTicketsMap = new Map(oldTickets.map(t => [t.id, t]));

    newTickets.forEach((newTicket) => {
      const oldTicket = oldTicketsMap.get(newTicket.id);

      if (!oldTicket) {
        // New ticket - optionally notify here if you want
        return;
      }

      // Check if agent assigned changed
      if (oldTicket.assigned_agent !== newTicket.assigned_agent && newTicket.assigned_agent) {
        newNotifs.push({
          id: generateNotificationId(),
          ticketId: newTicket.id,
          type: "agent_assigned",
          message: `Agent "${newTicket.assigned_agent}" assigned to ticket #${newTicket.id}`,
          timestamp: new Date().toISOString(),
        });
      }

      // Check if status changed
      if (oldTicket.status !== newTicket.status) {
        newNotifs.push({
          id: generateNotificationId(),
          ticketId: newTicket.id,
          type: "status_changed",
          message: `Ticket #${newTicket.id} status changed to "${newTicket.status}"`,
          timestamp: new Date().toISOString(),
        });
      }
    });

    return newNotifs;
  };

  const fetchTickets = async () => {
    if (!token) return;

    try {
      const response = await fetch("http://localhost:8000/api/allTickets", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch tickets");

      const data = await response.json();

      // Detect changes and create notifications
      const newNotifs = detectTicketChangesAndNotify(prevTicketsRef.current, data);

      // Update notifications state with new ones appended
      setNotifications((prev) => [...newNotifs, ...prev]);

      // Update tickets and previous tickets reference
      setTickets(data);
      prevTicketsRef.current = data;
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  useEffect(() => {
    if (token) fetchTickets();
    else {
      setTickets([]);
      setNotifications([]);
      prevTicketsRef.current = [];
    }
  }, [token]);

  // Mark tickets as read
  const markTicketAsRead = (id) => {
    if (!readTicketIds.includes(id)) {
      const updated = [...readTicketIds, id];
      setReadTicketIds(updated);
      localStorage.setItem("readTicketIds", JSON.stringify(updated));
    }
  };

  const markAllTicketsAsRead = () => {
    const allIds = tickets.map((ticket) => ticket.id);
    setReadTicketIds(allIds);
    localStorage.setItem("readTicketIds", JSON.stringify(allIds));
  };

  // Mark notifications as read (dismiss)
  const markNotificationAsRead = (id) => {
    if (!readNotificationIds.includes(id)) {
      const updated = [...readNotificationIds, id];
      setReadNotificationIds(updated);
      localStorage.setItem("readNotificationIds", JSON.stringify(updated));
    }
  };

  const markAllNotificationsAsRead = () => {
    const allIds = notifications.map((notif) => notif.id);
    setReadNotificationIds(allIds);
    localStorage.setItem("readNotificationIds", JSON.stringify(allIds));
  };

  // Counts
  const unreadTicketsCount = tickets.filter(
    (ticket) => !readTicketIds.includes(ticket.id)
  ).length;

  const unreadNotificationsCount = notifications.filter(
    (notif) => !readNotificationIds.includes(notif.id)
  ).length;

  return (
    <StateContext.Provider
      value={{
        activeMenu,
        setActiveMenu,
        screenSize,
        setScreenSize,
        user,
        token,
        login,
        logout,
<<<<<<< HEAD
        tickets,
        fetchTickets,
        readTicketIds,
        markTicketAsRead,
        markAllTicketsAsRead,
        unreadTicketsCount,
        notifications,
        readNotificationIds,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        unreadNotificationsCount,
=======
        currentCategory,
        setCurrentCategory,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
