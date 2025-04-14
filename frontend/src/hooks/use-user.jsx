import { useState, useEffect } from "react";

const useUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (typeof localStorage === "undefined") return;

    const data = localStorage.getItem("user");
    if (data) {
      try {
        setUser(JSON.parse(data));
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
        setUser(null);
      }
    }
  }, []);

  // comment  this
  if (!user) {
    return { role: "admin", name: "Dev Admin" };
  }

  return user;
};

export default useUser;
