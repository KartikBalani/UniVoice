import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userType, setUserType] = useState("Guest");
  const [userRoll, setUserRoll] = useState(null);

  return (
    <UserContext.Provider value={{ userType, setUserType, userRoll, setUserRoll }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
