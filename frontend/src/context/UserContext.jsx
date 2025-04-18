import React, { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userType, setUserType] = useState("Guest");
  const [userRoll, setUserRoll] = useState(null);

  useEffect(() => {
    const storedType = localStorage.getItem("userType");
    const storedRoll = localStorage.getItem("userRoll");

    if (storedType) setUserType(storedType);
    if (storedRoll) setUserRoll(storedRoll);
  }, []);

  useEffect(() => {
    localStorage.setItem("userType", userType);
    localStorage.setItem("userRoll", userRoll);
  }, [userType, userRoll]);

  const updateUser = (newType, newRoll) => {
    setUserRoll(newRoll);
    setUserType(newType);
  };

  return (
    <UserContext.Provider value={{ userType, userRoll, updateUser, setUserType, setUserRoll }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

