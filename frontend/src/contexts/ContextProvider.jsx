import React, { createContext, useContext, useState, useEffect } from "react"; // 🔧 Added useEffect
// import useUser from "../hooks/use-user"; // 🧹 Optional: not used here, you can remove

// 1. Context default value
const StateContext = createContext({
  user: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
  activeMenu: true,
  setActiveMenu: () => {},
  screenSize: undefined,
  setScreenSize: () => {},
});

export const ContextProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);
  const [user, setUser] = useState({});
  const [token, setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
  // 2. Sync token to localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem('ACCESS_TOKEN', token);
    } else {
      localStorage.removeItem('ACCESS_TOKEN');
    }
  }, [token]);

  // 3. Return block was broken — fixed here 👇
  return (
    <StateContext.Provider
      value={{
        activeMenu,
        setActiveMenu,
        screenSize,
        setScreenSize,
        user,
        setUser,
        token,
        setToken,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
