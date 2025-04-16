import React, { createContext, useContext, useState, useEffect } from "react"; // 🔧 Added useEffect
// import useUser from "../hooks/use-user"; // 🧹 Optional: not used here, you can remove

// 1. Context default value
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
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;

  });
  
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };
  
  return (
    <StateContext.Provider
      value={{
        activeMenu,
        setActiveMenu,
        screenSize,
        setScreenSize,
        user,
        login,
        logout
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
