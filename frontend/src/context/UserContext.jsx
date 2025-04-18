import React, { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userType, setUserType] = useState("Guest");
  const [userRoll, setUserRoll] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false); // ✅ Guard to prevent early overwrite

  // Load from localStorage once on mount
  useEffect(() => {
    const storedType = localStorage.getItem("userType");
    const storedRoll = localStorage.getItem("userRoll");

    if (storedType) setUserType(storedType);
    if (storedRoll) setUserRoll(storedRoll);
    setHasLoaded(true); // ✅ Allow sync after loading
  }, []);

  // Write to localStorage only after initial load
  useEffect(() => {
    if (hasLoaded) {
      console.log('🔐 Saving to localStorage:', { userType, userRoll });
      localStorage.setItem("userType", userType);
      localStorage.setItem("userRoll", userRoll);
    }
  }, [userType, userRoll, hasLoaded]);

  const updateUser = (newType, newRoll) => {
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
