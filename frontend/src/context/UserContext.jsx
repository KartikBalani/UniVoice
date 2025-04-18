import React, { createContext, useState, useContext, useEffect, useRef } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userType, setUserType] = useState("Guest");
  const [userRoll, setUserRoll] = useState(null);
  const hasLoaded = useRef(false); // 🔐 Ref to persist across renders

  // Load once from localStorage
  useEffect(() => {
    const storedType = localStorage.getItem("userType");
    const storedRoll = localStorage.getItem("userRoll");

    if (storedType) setUserType(storedType);
    if (storedRoll) setUserRoll(storedRoll);

    hasLoaded.current = true; // ✅ Set ref flag
  }, []);

  // Only save to localStorage after the first load
  useEffect(() => {
    if (hasLoaded.current) {
      console.log("🔐 Saving to localStorage:", { userType, userRoll });
      localStorage.setItem("userType", userType);
      localStorage.setItem("userRoll", userRoll);
    }
  }, [userType, userRoll]);

  const updateUser = (newType, newRoll) => {
    console.log("🆕 updateUser called with:", newType, newRoll);
    setUserType(newType);
    setUserRoll(newRoll);
  };

  return (
    <UserContext.Provider value={{ userType, userRoll, updateUser, setUserType, setUserRoll }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
